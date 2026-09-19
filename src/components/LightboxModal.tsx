import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
  description?: string;
  category?: string;
  onNext?: () => void;
  onPrev?: () => void;
  hasNavigation?: boolean;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  title,
  description,
  onNext,
  onPrev,
  hasNavigation = false
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (hasNavigation && onPrev && e.key === 'ArrowLeft') onPrev();
      if (hasNavigation && onNext && e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev, hasNavigation]);

  if (!isOpen) return null;

  return (
    <div
      id="lightbox-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-6 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        id="lightbox-content"
        className="relative max-h-[90vh] max-w-4xl w-full bg-[#18363B] rounded-[16px] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Minimal Header */}
        <div className="flex items-center justify-end px-5 py-3.5 border-b border-white/10 text-white">
          <button
            id="close-lightbox-btn"
            onClick={onClose}
            className="p-1 text-white/70 hover:text-white transition-colors"
            aria-label="Close viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image Display */}
        <div className="relative flex-1 flex items-center justify-center bg-black/30 min-h-[320px] max-h-[75vh] p-4 sm:p-6 overflow-hidden">
          <img
            src={imageUrl}
            alt={title || "Company Archive"}
            referrerPolicy="no-referrer"
            className="max-h-[70vh] max-w-full object-contain rounded-[8px]"
          />

          {hasNavigation && onPrev && (
            <button
              id="lightbox-prev-btn"
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {hasNavigation && onNext && (
            <button
              id="lightbox-next-btn"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
