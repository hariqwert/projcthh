import { useRef, useEffect } from 'react';

// Algorithm 24 & 26: Universal Desktop Inertial Drag-to-Scroll + Touch Swipe Gesture Guard
export function useDragToScroll<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let velX = 0;
    let momentumID = 0;

    const onMouseDown = (e: MouseEvent) => {
      // Don't intercept clicks on buttons or links
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a')) return;

      isDown = true;
      el.classList.add('cursor-grabbing');
      el.classList.remove('cursor-grab');
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
      cancelAnimationFrame(momentumID);
    };

    const onMouseLeave = () => {
      if (!isDown) return;
      isDown = false;
      el.classList.remove('cursor-grabbing');
      el.classList.add('cursor-grab');
    };

    const onMouseUp = () => {
      if (!isDown) return;
      isDown = false;
      el.classList.remove('cursor-grabbing');
      el.classList.add('cursor-grab');

      // Apply subtle inertial glide (1.4x multiplier)
      const glide = () => {
        if (Math.abs(velX) > 0.5) {
          el.scrollLeft += velX * 1.4;
          velX *= 0.88;
          momentumID = requestAnimationFrame(glide);
        }
      };
      glide();
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.5;
      velX = walk - (el.scrollLeft - scrollLeft);
      el.scrollLeft = scrollLeft - walk;
    };

    el.classList.add('cursor-grab');
    el.addEventListener('mousedown', onMouseDown);
    el.addEventListener('mouseleave', onMouseLeave);
    el.addEventListener('mouseup', onMouseUp);
    el.addEventListener('mousemove', onMouseMove);

    return () => {
      el.removeEventListener('mousedown', onMouseDown);
      el.removeEventListener('mouseleave', onMouseLeave);
      el.removeEventListener('mouseup', onMouseUp);
      el.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(momentumID);
    };
  }, []);

  return ref;
}
