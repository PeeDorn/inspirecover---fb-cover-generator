
import React from 'react';

interface QuoteOverlayProps {
  quote: string;
  subtitle?: string;
}

export const QuoteOverlay: React.FC<QuoteOverlayProps> = ({ quote, subtitle }) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-black/10 backdrop-blur-[1px]">
      <div className="max-w-[80%] text-center space-y-6">
        {/* Decorative Lines */}
        <div className="flex items-center justify-center gap-4 opacity-50">
          <div className="h-[1px] w-12 bg-white/50"></div>
          <div className="w-2 h-2 rounded-full bg-white/50"></div>
          <div className="h-[1px] w-12 bg-white/50"></div>
        </div>

        {/* Main Text */}
        <h2 className="khmer-font text-3xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)] leading-tight tracking-wide">
          {quote}
        </h2>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-sm md:text-lg text-white/80 font-light italic tracking-widest drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] uppercase">
            {subtitle}
          </p>
        )}

        {/* Bottom Decoration */}
        <div className="flex items-center justify-center gap-2 opacity-30 mt-4">
          <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
        </div>
      </div>
    </div>
  );
};
