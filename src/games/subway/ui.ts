// The DOM layer: title screen, HUD, pause, result screens, and modals. Plain elements, no framework.
import { t, getLang, setLang, LANGS, LANG_LABEL, type Key } from './i18n';
import type { PowerKind } from './sim/types';
import { POWER_TIME } from './config';
import { getLeaderboard, formatScore } from './leaderboard';
import { CHARACTERS, getSelectedCharacter, setSelectedCharacter, type CharacterDef } from './characters';

export type Screen = 'start' | 'play' | 'pause' | 'over';
export interface UIHandlers {
  play(): void;
  resume(): void;
  pause(): void;
  restart(): void;
  home(): void;
  toggleMute(): void;
  langChanged(): void;
  onCharacterSelect?(char: CharacterDef): void;
}

const ICON = {
  pause: '<svg viewBox="0 0 24 24"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>',
  home: '<svg viewBox="0 0 24 24"><path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5z"/></svg>',
  sound: '<svg viewBox="0 0 24 24"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  muted: '<svg viewBox="0 0 24 24"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16 9l5 6M21 9l-5 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  coin: '<span class="coin-ico"></span>',
};
const POWER_ICON: Record<PowerKind, string> = { magnet: '🧲', shoes: '👟', double: '×2', star: '★', jet: '🚀' };

function navigateToPortalHome() {
  if (!navigator.onLine && 'caches' in window) {
    caches.match('/hero.html', { ignoreSearch: true }).then((cached) => {
      window.location.href = cached ? '/hero.html' : '/offline.html';
    }).catch(() => {
      window.location.href = '/offline.html';
    });
    return;
  }
  window.location.href = '/hero.html';
}

export class UI {
  root: HTMLElement;
  private el: Record<string, HTMLElement> = {};
  screen: Screen = 'start';
  private hintTimer = 0;
  private toastTimer = 0;
  private lastScreenChange = 0;
  touch = matchMedia('(pointer: coarse)').matches;
  private last = { score: -1, coins: -1, stars: -1, mult: -1, power: '' };

  constructor(root: HTMLElement, h: UIHandlers, muted: boolean) {
    this.root = root;
    const curChar = getSelectedCharacter();
    root.innerHTML = `
      <div class="hud" id="hud">
        <div class="hud-left">
          <button class="icon-btn" id="btn-pause" aria-label="pause" title="Pause Game">${ICON.pause}</button>
          <button class="icon-btn" id="btn-hud-home" aria-label="home" title="Home Menu">${ICON.home}</button>
          <button class="icon-btn" id="btn-mute" aria-label="mute" title="Toggle Sound"></button>
        </div>
        <div class="hud-right">
          <div class="score" id="score">000000</div>
          <div class="hud-row">
            <span class="mult" id="mult">×1</span>
            <span class="stars"><span style="margin-right:2px">★</span><b id="stars">0</b></span>
            <span class="coins">${ICON.coin}<b id="coins">0</b></span>
          </div>
          <div class="powers" id="powers"></div>
        </div>
        <div class="hint" id="hint"></div>
        <div class="toast" id="toast"></div>
      </div>
      <div class="flash" id="flash"></div>

      <!-- Start / Title Screen -->
      <section class="screen start" id="s-start">
        <div class="panel">
          <div class="mumbai-badge">🇮🇳 MUMBAI WORLD TOUR</div>
          <h1 data-k="title">Subway Surfers: Mumbai</h1>
          <p class="tag" data-k="tagline"></p>
          <div class="stats">
            <div><small data-k="best"></small><b id="best">0</b></div>
            <div class="stat-sep"></div>
            <div><small data-k="coinsTotal"></small><b id="bank">0</b></div>
          </div>
          <button class="big" id="btn-play">
            <span class="btn-play-text" data-k="play">PLAY NOW</span>
            <span class="btn-play-sub">TAP OR PRESS SPACE</span>
          </button>
          <div class="ctrl-pills">
            <span class="ctrl-pill"><kbd>◄</kbd> <kbd>►</kbd> Dodge</span>
            <span class="ctrl-pill"><kbd>▲</kbd> <kbd>SPACE</kbd> Jump</span>
            <span class="ctrl-pill"><kbd>▼</kbd> Roll</span>
          </div>
          <p class="ctrl" id="ctrl" style="display:none"></p>
          <div class="row chip-row">
            <button class="chip" id="btn-character">🏃 Runner: <span id="char-name-label">${curChar.name}</span></button>
            <button class="chip" id="btn-leaderboard">🏆 Top Scorers</button>
            <button class="chip" id="btn-controls">🎮 Controls</button>
            <button class="chip" id="btn-lang"></button>
            <button class="chip" id="btn-mute2"></button>
            <button class="chip" id="btn-fullscreen">⛶ Fullscreen</button>
            <button class="chip" id="btn-portal-home">🏠 Exit to Portal</button>
          </div>
        </div>
      </section>

      <!-- Pause Screen -->
      <section class="screen pause" id="s-pause">
        <div class="panel">
          <h2 data-k="paused">Game Paused</h2>
          <button class="big" id="btn-resume" data-k="resume">Resume Run</button>
          <button class="ghost" id="btn-restart" data-k="restart">Restart</button>
          <button class="ghost" id="btn-home" data-k="home">Main Menu</button>
          <button class="ghost" id="btn-portal-exit">🏠 Exit to Portal</button>
        </div>
      </section>

      <!-- Game Over Screen -->
      <section class="screen over" id="s-over">
        <div class="panel">
          <h2 data-k="over">Run Ended</h2>
          <div class="badge" id="newbest" data-k="newBest">New Best Score!</div>
          <div class="result">
            <div><small data-k="score">Score</small><b id="r-score">0</b></div>
            <div><small data-k="stars">Stars</small><b id="r-stars" style="color:#f59e0b">0</b></div>
            <div><small data-k="coins">Coins</small><b id="r-coins">0</b></div>
            <div><small data-k="distance">Distance</small><b id="r-dist">0</b></div>
            <div><small data-k="best">Best</small><b id="r-best">0</b></div>
          </div>
          <button class="big" id="btn-again" data-k="again">Play Again</button>
          <div class="row" style="display:flex;gap:8px;justify-content:center;width:100%">
            <button class="ghost" id="btn-leaderboard2" style="flex:1;display:inline-flex;align-items:center;justify-content:center;gap:4px">🏆 Leaderboard</button>
            <button class="ghost" id="btn-home2" data-k="home" style="flex:1">Main Menu</button>
          </div>
          <button class="ghost" id="btn-portal-exit2" style="width:100%">🏠 Exit to Portal</button>
        </div>
      </section>

      <!-- Leaderboard Modal -->
      <section class="lb-modal" id="s-leaderboard">
        <div class="lb-panel">
          <div class="lb-header">
            <div class="lb-title-row">
              <span style="font-size:24px">🏆</span>
              <h2>TOP SCORERS · MUMBAI</h2>
            </div>
            <p class="lb-subtitle">World Tour Champion Leaderboard</p>
          </div>
          <div class="lb-list" id="lb-list"></div>
          <button class="big" id="btn-lb-close" style="margin-top:6px;padding:12px">Close</button>
        </div>
      </section>

      <!-- Controls Guide Modal -->
      <section class="lb-modal" id="s-controls">
        <div class="lb-panel" style="max-width: 440px">
          <div class="lb-header">
            <div class="lb-title-row">
              <span style="font-size:24px">🎮</span>
              <h2>HOW TO PLAY</h2>
            </div>
            <p class="lb-subtitle">Subway Surfers: Mumbai Controls & Tips</p>
          </div>
          <div class="guide-list">
            <div class="guide-item">
              <b style="color:#38bdf8">Switch Tracks:</b>
              <span>Swipe Left / Right or press <b>A / D</b> (or <b>◄ / ►</b>) to dodge incoming Indian trains.</span>
            </div>
            <div class="guide-item">
              <b style="color:#f59e0b">Jump & Roof Running:</b>
              <span>Swipe Up or press <b>W / ▲ / Space</b> to leap over hurdles and climb onto train roofs.</span>
            </div>
            <div class="guide-item">
              <b style="color:#10b981">Slide & Fast Fall:</b>
              <span>Swipe Down or press <b>S / ▼</b> to roll under signs or quickly land from high altitudes.</span>
            </div>
            <div class="guide-item">
              <b style="color:#ef4444">Special Mumbai Power-Ups:</b>
              <span>
                🚀 <b>Rocket Jetpack</b>: Soar high above Mumbai skyline collecting gold!<br>
                ★ <b>Star Multiplier</b>: Multiplies run score by 5X / 10X!<br>
                🧲 <b>Coin Magnet</b>: Magnetizes all 3 tracks of coins.<br>
                👟 <b>Super Sneakers</b>: High super-jumping abilities.
              </span>
            </div>
          </div>
          <button class="big" id="btn-ctrl-close" style="margin-top:4px;padding:12px">Got It!</button>
        </div>
      </section>

      <!-- Character Selector Modal -->
      <section class="lb-modal" id="s-character">
        <div class="lb-panel" style="max-width: 460px">
          <div class="lb-header">
            <div class="lb-title-row">
              <span style="font-size:24px">🏃</span>
              <h2>CHOOSE YOUR RUNNER</h2>
            </div>
            <p class="lb-subtitle">Select a Mumbai character with unique perks</p>
          </div>
          <div class="char-grid" id="char-grid"></div>
          <button class="big" id="btn-char-close" style="margin-top:6px;padding:12px">Select Runner</button>
        </div>
      </section>
    `;

    root.querySelectorAll<HTMLElement>('[id]').forEach((e) => (this.el[e.id] = e));

    const vibrate = () => {
      try {
        if ('vibrate' in navigator) navigator.vibrate(18);
      } catch {}
    };

    // Ultra-reliable cross-platform tap handler: prevents ghost clicks across screen transitions
    const tap = (id: string, fn: () => void) => {
      const btn = this.el[id] || document.getElementById(id);
      if (!btn) return;
      btn.style.touchAction = 'manipulation';
      btn.style.cursor = 'pointer';

      let handled = false;
      const onTrigger = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        if (handled) return;
        handled = true;
        setTimeout(() => { handled = false; }, 280);
        vibrate();
        fn();
      };

      btn.addEventListener('pointerdown', (e) => e.stopPropagation());
      btn.addEventListener('touchstart', (e) => e.stopPropagation(), { passive: true });
      btn.addEventListener('touchend', onTrigger, { passive: false });
      btn.addEventListener('click', onTrigger);
    };

    tap('btn-play', () => {
      if (performance.now() - this.lastScreenChange < 250) return;
      h.play();
    });
    tap('btn-pause', () => h.pause());
    tap('btn-hud-home', () => h.home());
    tap('btn-resume', () => h.resume());
    tap('btn-restart', () => h.restart());
    tap('btn-home', () => h.home());
    tap('btn-home2', () => h.home());
    tap('btn-portal-home', () => navigateToPortalHome());
    tap('btn-portal-exit', () => navigateToPortalHome());
    tap('btn-portal-exit2', () => navigateToPortalHome());
    tap('btn-again', () => h.restart());
    tap('btn-mute', () => h.toggleMute());
    tap('btn-mute2', () => h.toggleMute());

    tap('btn-leaderboard', () => {
      this.renderLeaderboard();
      this.el['s-leaderboard']?.classList.add('on');
    });
    tap('btn-leaderboard2', () => {
      this.renderLeaderboard();
      this.el['s-leaderboard']?.classList.add('on');
    });
    tap('btn-lb-close', () => {
      this.lastScreenChange = performance.now();
      this.el['s-leaderboard']?.classList.remove('on');
    });

    tap('btn-controls', () => {
      this.el['s-controls']?.classList.add('on');
    });
    tap('btn-ctrl-close', () => {
      this.lastScreenChange = performance.now();
      this.el['s-controls']?.classList.remove('on');
    });

    tap('btn-character', () => {
      this.renderCharacters(h.onCharacterSelect);
      this.el['s-character']?.classList.add('on');
    });
    tap('btn-char-close', () => {
      this.lastScreenChange = performance.now();
      this.el['s-character']?.classList.remove('on');
    });

    const toggleFS = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    };
    tap('btn-fullscreen', toggleFS);

    tap('btn-lang', () => {
      const i = LANGS.indexOf(getLang());
      setLang(LANGS[(i + 1) % LANGS.length]);
      this.texts();
      h.langChanged();
    });

    this.setMuted(muted);
    this.texts();
  }

  renderCharacters(onSelect?: (char: CharacterDef) => void) {
    const grid = this.el['char-grid'];
    if (!grid) return;
    const current = getSelectedCharacter();
    grid.innerHTML = CHARACTERS.map((c) => {
      const isSel = c.id === current.id;
      return `
        <div class="char-card ${isSel ? 'active' : ''}" data-char="${c.id}">
          <div class="char-top">
            <span class="char-avatar">${c.avatar}</span>
            <div class="char-info">
              <span class="char-name">${c.name}</span>
              <span class="char-title">${c.title}</span>
            </div>
            ${isSel ? '<span class="char-badge">SELECTED</span>' : ''}
          </div>
          <div class="char-perk">⚡ ${c.perk}</div>
          <div class="char-desc">${c.desc}</div>
        </div>
      `;
    }).join('');

    grid.querySelectorAll<HTMLElement>('.char-card').forEach((card) => {
      const id = card.dataset.char;
      if (!id) return;
      card.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedCharacter(id);
        const selChar = getSelectedCharacter();
        const lbl = this.el['char-name-label'];
        if (lbl) lbl.textContent = selChar.name;
        this.renderCharacters(onSelect);
        if (onSelect) onSelect(selChar);
      });
    });
  }

  texts() {
    document.documentElement.lang = getLang();
    document.title = t('title');
    this.root.querySelectorAll<HTMLElement>('[data-k]').forEach((e) => (e.textContent = t(e.dataset.k as Key)));
    this.el.ctrl.textContent = this.touch ? t('ctrlTouch') : t('ctrlKeys');
    this.el['btn-lang'].textContent = t('lang') + ' · ' + LANG_LABEL[getLang()];
  }

  setMuted(m: boolean) {
    this.el['btn-mute'].innerHTML = m ? ICON.muted : ICON.sound;
    this.el['btn-mute2'].innerHTML = (m ? ICON.muted : ICON.sound) + `<span>${t(m ? 'mute' : 'sound')}</span>`;
  }

  show(s: Screen) {
    this.lastScreenChange = performance.now();
    this.screen = s;
    this.root.dataset.screen = s;

    // The top arcade navigation (Home Portal & Offline Center) is visible whenever NOT actively playing
    const header = document.querySelector('.arcade-header') as HTMLElement;
    if (header) {
      const showHeader = (s !== 'play');
      header.classList.toggle('hidden', !showHeader);
      header.style.display = showHeader ? 'flex' : 'none';
    }

    if (this.el['s-leaderboard']) this.el['s-leaderboard'].classList.remove('on');
    if (this.el['s-controls']) this.el['s-controls'].classList.remove('on');
    if (this.el['s-character']) this.el['s-character'].classList.remove('on');

    for (const k of ['start', 'pause', 'over'] as const) {
      const el = this.el['s-' + k];
      if (el) el.classList.toggle('on', s === k);
    }
    if (this.el.hud) this.el.hud.classList.toggle('on', s === 'play');
    if (s !== 'play') this.hint('');
    if (s === 'start') this.el['btn-play']?.focus({ preventScroll: true });
    if (s === 'over') this.el['btn-again']?.focus({ preventScroll: true });
    if (s === 'pause') this.el['btn-resume']?.focus({ preventScroll: true });
  }

  renderLeaderboard() {
    const list = this.el['lb-list'];
    if (!list) return;
    const entries = getLeaderboard();
    list.innerHTML = entries.map((e, idx) => {
      const rank = idx + 1;
      const rankClass = rank === 1 ? 'gold' : rank === 2 ? 'silver' : rank === 3 ? 'bronze' : '';
      const rankBadge = rank === 1 ? '🥇 #1' : rank === 2 ? '🥈 #2' : rank === 3 ? '🥉 #3' : `#${rank}`;
      return `
        <div class="lb-row ${e.isPlayer ? 'player' : ''}">
          <div class="lb-left">
            <span class="lb-rank ${rankClass}">${rankBadge}</span>
            <span class="lb-avatar">${e.avatar}</span>
            <div class="lb-name-col">
              <span class="lb-name">${e.name}</span>
              <span class="lb-date">${e.date}</span>
            </div>
          </div>
          <div class="lb-right">
            <span class="lb-score">${formatScore(e.score)}</span>
            <span class="lb-stars">★ ${e.stars}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  setStart(best: number, bank: number) {
    this.el.best.textContent = String(best);
    this.el.bank.textContent = String(bank);
    const selChar = getSelectedCharacter();
    const lbl = this.el['char-name-label'];
    if (lbl) lbl.textContent = selChar.name;
  }

  hud(score: number, coins: number, mult: number, power: Record<PowerKind, number>, stars = 0) {
    if (score !== this.last.score) {
      this.el.score.textContent = String(score).padStart(6, '0');
      this.last.score = score;
    }
    if (coins !== this.last.coins) {
      this.el.coins.textContent = String(coins);
      this.last.coins = coins;
      this.el.coins.parentElement!.classList.remove('pop');
      void this.el.coins.offsetWidth;
      this.el.coins.parentElement!.classList.add('pop');
    }
    if (stars !== this.last.stars && this.el.stars) {
      this.el.stars.textContent = String(stars);
      this.last.stars = stars;
    }
    if (mult !== this.last.mult) {
      this.el.mult.textContent = '×' + mult;
      this.el.mult.classList.toggle('hot', mult > 1);
      this.last.mult = mult;
    }
    const key = (Object.keys(power) as PowerKind[]).map((k) => (power[k] > 0 ? k + Math.ceil(power[k] * 10) : '')).join();
    if (key !== this.last.power) {
      this.last.power = key;
      this.el.powers.innerHTML = (Object.keys(power) as PowerKind[])
        .filter((k) => power[k] > 0)
        .map((k) => `<div class="pw ${k}"><i>${POWER_ICON[k]}</i><span>${t(k)}</span><em style="transform:scaleX(${(power[k] / POWER_TIME[k]).toFixed(3)})"></em></div>`)
        .join('');
    }
  }

  hint(text: string, ms = 2200) {
    const e = this.el.hint;
    window.clearTimeout(this.hintTimer);
    e.textContent = text;
    e.classList.toggle('on', !!text);
    if (text) this.hintTimer = window.setTimeout(() => e.classList.remove('on'), ms);
  }

  toast(text: string, ms = 1400) {
    const e = this.el.toast;
    window.clearTimeout(this.toastTimer);
    e.textContent = text;
    e.classList.add('on');
    this.toastTimer = window.setTimeout(() => e.classList.remove('on'), ms);
  }

  flash(kind: 'hit' | 'crash' | 'power') {
    const e = this.el.flash;
    e.className = 'flash';
    void e.offsetWidth;
    e.className = 'flash ' + kind;
  }

  result(r: { score: number; coins: number; stars?: number; distance: number; best: number; newBest: boolean }) {
    this.el['r-score'].textContent = String(r.score);
    if (this.el['r-stars']) this.el['r-stars'].textContent = String(r.stars || 0);
    this.el['r-coins'].textContent = String(r.coins);
    this.el['r-dist'].textContent = r.distance + ' ' + t('meters');
    this.el['r-best'].textContent = String(r.best);
    this.el.newbest.classList.toggle('on', r.newBest);
  }
}
