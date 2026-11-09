import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useDragToScroll } from '../../hooks/useDragToScroll';

interface HorizontalShelfProps {
  title: string;
  subtitle?: string;
  actionText?: string;
  onActionClick?: () => void;
  children: React.ReactNode;
}

export const HorizontalShelf: React.FC<HorizontalShelfProps> = ({
  title,
  subtitle,
  actionText,
  onActionClick,
  children,
}) => {
  const scrollContainerRef = useDragToScroll<HTMLDivElement>();

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const offset = scrollContainerRef.current.clientWidth * 0.75;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -offset : offset,
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative w-full py-5 space-y-3">
      {/* Shelf Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end justify-between">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
            <span>{title}</span>
          </h3>
          {subtitle && <p className="text-xs sm:text-sm text-gray-400 mt-0.5">{subtitle}</p>}
        </div>

        <div className="flex items-center space-x-2">
          {actionText && (
            <button
              onClick={onActionClick}
              className="text-xs font-semibold text-pink-400 hover:text-pink-300 transition-colors mr-2 uppercase tracking-wider"
            >
              {actionText}
            </button>
          )}

          <button
            onClick={() => scroll('left')}
            className="p-1.5 rounded-xl glass-panel hover:bg-white/15 text-gray-300 hover:text-white border border-white/10 transition-colors hidden sm:flex items-center justify-center"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-1.5 rounded-xl glass-panel hover:bg-white/15 text-gray-300 hover:text-white border border-white/10 transition-colors hidden sm:flex items-center justify-center"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Area */}
      <div
        ref={scrollContainerRef}
        className="flex items-center space-x-4 overflow-x-auto no-scrollbar px-4 sm:px-6 lg:px-8 pb-2 select-none"
      >
        {children}
      </div>
    </section>
  );
};
