// Keyboard and ultra-responsive mobile swipe input for Subway Surfers: Mumbai.
export type Action = 'left' | 'right' | 'up' | 'down' | 'pause' | 'confirm' | 'mute';

export function bindInput(target: HTMLElement, on: (a: Action) => void, canSwipe: () => boolean) {
  const keys: Record<string, Action> = {
    ArrowLeft: 'left', KeyA: 'left', ArrowRight: 'right', KeyD: 'right',
    ArrowUp: 'up', KeyW: 'up', Space: 'up', ArrowDown: 'down', KeyS: 'down',
    Escape: 'pause', KeyP: 'pause', Enter: 'confirm', KeyM: 'mute',
  };

  window.addEventListener('keydown', (e) => {
    const a = keys[e.code];
    if (!a) return;
    if ((e.target as HTMLElement)?.tagName === 'BUTTON' && (e.code === 'Space' || e.code === 'Enter')) return;
    e.preventDefault();
    if (e.repeat && a !== 'left' && a !== 'right') return;
    on(a);
  });

  // Minimum pixel distance to trigger a swipe action immediately
  const SWIPE_DIST = 22;

  let tracking = false;
  let sx = 0, sy = 0;
  let hasSwiped = false;

  const onStart = (clientX: number, clientY: number, targetEl: EventTarget | null) => {
    if (!canSwipe()) return;
    // Do not interfere if user is tapping a HUD button or modal
    if (targetEl && (targetEl as HTMLElement).closest && (targetEl as HTMLElement).closest('button, .icon-btn, .chip, .big, .ghost, .nav-btn, .lb-panel')) {
      return;
    }
    tracking = true;
    hasSwiped = false;
    sx = clientX;
    sy = clientY;
  };

  const onMove = (clientX: number, clientY: number, e?: Event) => {
    if (!tracking || !canSwipe()) return;
    const dx = clientX - sx;
    const dy = clientY - sy;
    const adx = Math.abs(dx);
    const ady = Math.abs(dy);

    if (adx >= SWIPE_DIST || ady >= SWIPE_DIST) {
      if (e && e.cancelable) e.preventDefault();
      if (!hasSwiped) {
        hasSwiped = true;
        if (adx > ady) {
          on(dx > 0 ? 'right' : 'left');
        } else {
          on(dy > 0 ? 'down' : 'up');
        }
        // Advance starting point to allow continuous chaining of swipes in one gesture
        sx = clientX;
        sy = clientY;
      }
    }
  };

  const onEnd = (clientX: number, clientY: number) => {
    if (!tracking) return;
    tracking = false;
    if (!hasSwiped && canSwipe()) {
      const dx = clientX - sx;
      const dy = clientY - sy;
      const adx = Math.abs(dx);
      const ady = Math.abs(dy);
      if (adx >= 14 || ady >= 14) {
        if (adx > ady) {
          on(dx > 0 ? 'right' : 'left');
        } else {
          on(dy > 0 ? 'down' : 'up');
        }
      }
    }
    hasSwiped = false;
  };

  // Touch Events (High-precision mobile touch handling)
  window.addEventListener('touchstart', (e) => {
    if (e.touches.length > 0) {
      const t = e.touches[0];
      onStart(t.clientX, t.clientY, e.target);
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (tracking && e.touches.length > 0) {
      const t = e.touches[0];
      onMove(t.clientX, t.clientY, e);
    }
  }, { passive: false });

  window.addEventListener('touchend', (e) => {
    if (tracking && e.changedTouches.length > 0) {
      const t = e.changedTouches[0];
      onEnd(t.clientX, t.clientY);
    } else {
      tracking = false;
    }
  }, { passive: true });

  window.addEventListener('touchcancel', () => { tracking = false; hasSwiped = false; }, { passive: true });

  // Pointer Events (Mouse, Pen, or Pointer-based browsers)
  window.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'touch') {
      onStart(e.clientX, e.clientY, e.target);
    }
  });

  window.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'touch') {
      onMove(e.clientX, e.clientY, e);
    }
  });

  window.addEventListener('pointerup', (e) => {
    if (e.pointerType !== 'touch') {
      onEnd(e.clientX, e.clientY);
    }
  });
}
