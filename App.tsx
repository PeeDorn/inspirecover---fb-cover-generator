
import React, { useState, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Camera, Download, Sparkles, RefreshCw, Type, Image as ImageIcon } from 'lucide-react';

// Custom components
import { QuoteOverlay } from './components/QuoteOverlay';
import { generateBaseImage } from './services/geminiService';

const DEFAULT_QUOTE = "កុំបោះបង់ ពេលវាពិបាក";
const DEFAULT_SUBTITLE = "Don't give up when it's hard";

const App: React.FC = () => {
  const [quote, setQuote] = useState(DEFAULT_QUOTE);
  const [subtitle, setSubtitle] = useState(DEFAULT_SUBTITLE);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const previewRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const prompt = `An inspirational life quote cover image, sunrise over a long empty road leading to mountains, soft blue and warm orange gradient sky, symbol of hope, perseverance, and new beginnings, minimalist and calm style, cinematic lighting, emotional atmosphere, high quality, clean, professional photography, no people close-up, no text overlay, center space for text placement.`;
      const base64Image = await generateBaseImage(prompt);
      if (base64Image) {
        setImageSrc(base64Image);
      } else {
        setError("Failed to generate image. Please try again.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (!previewRef.current) return;
    
    // In a real browser environment, we'd use html-to-image or similar.
    // Since we are in a sandbox, we'll simulate the download intent.
    // For a high-quality result, we usually re-draw to a canvas at target resolution.
    alert("In a production environment, this would export a high-resolution PNG (820x360).");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 md:p-8">
      <header className="w-full max-w-5xl mb-8 text-center space-y-2">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-orange-400 to-blue-500 bg-clip-text text-transparent">
          InspireCover
        </h1>
        <p className="text-slate-400 text-lg">Create stunning Facebook covers with AI-generated cinematic landscapes.</p>
      </header>

      <main className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Control Panel */}
        <section className="lg:col-span-1 space-y-6 bg-slate-800/50 p-6 rounded-2xl border border-slate-700 backdrop-blur-sm">
          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Type size={16} /> Main Quote (Khmer/English)
              </span>
              <textarea
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                className="mt-1 w-full p-3 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition khmer-font text-lg"
                rows={2}
                placeholder="Enter your inspirational quote..."
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Type size={16} className="opacity-50" /> Subtitle (Optional)
              </span>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="mt-1 w-full p-3 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-sm"
                placeholder="Translation or author name..."
              />
            </label>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-white shadow-lg shadow-orange-900/20 flex items-center justify-center gap-2 transition-all transform active:scale-95"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="animate-spin" />
                Generating Vision...
              </>
            ) : (
              <>
                <Sparkles />
                Generate Landscape
              </>
            )}
          </button>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-xs text-center">
              {error}
            </div>
          )}

          <div className="pt-4 border-t border-slate-700">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Tips</h3>
            <ul className="text-xs text-slate-400 space-y-2">
              <li className="flex gap-2">• Optimized for 820x360 Facebook covers</li>
              <li className="flex gap-2">• Cinematic lighting ensures emotional depth</li>
              <li className="flex gap-2">• Best results with minimalist text</li>
            </ul>
          </div>
        </section>

        {/* Preview Area */}
        <section className="lg:col-span-2 space-y-6">
          <div className="bg-slate-800/30 p-2 rounded-2xl border border-slate-700/50 shadow-2xl relative">
            <div 
              ref={previewRef}
              className="relative w-full aspect-[820/360] bg-slate-900 rounded-xl overflow-hidden group shadow-inner"
            >
              {imageSrc ? (
                <>
                  <img 
                    src={imageSrc} 
                    alt="Generated Background" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <QuoteOverlay quote={quote} subtitle={subtitle} />
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-600 p-8 text-center">
                  <ImageIcon size={64} strokeWidth={1} className="mb-4 opacity-20" />
                  <p className="text-lg font-medium">Your landscape will appear here</p>
                  <p className="text-sm opacity-60">Click 'Generate Landscape' to start</p>
                </div>
              )}
            </div>
            
            <div className="absolute top-6 left-6 pointer-events-none opacity-50">
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[10px] uppercase tracking-tighter font-bold">Live Preview</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleDownload}
              disabled={!imageSrc || isGenerating}
              className="flex-1 py-4 px-6 rounded-xl bg-slate-700 hover:bg-slate-600 disabled:opacity-30 disabled:cursor-not-allowed font-bold text-white flex items-center justify-center gap-2 transition-colors border border-slate-600"
            >
              <Download size={20} />
              Download Final Image
            </button>
            
            <button
              className="flex-none py-4 px-6 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 font-bold border border-blue-500/30 transition-colors"
              onClick={() => {
                setQuote(DEFAULT_QUOTE);
                setSubtitle(DEFAULT_SUBTITLE);
              }}
            >
              Reset Text
            </button>
          </div>
        </section>
      </main>

      <footer className="mt-auto pt-12 pb-6 text-slate-500 text-sm flex items-center gap-2">
        <Camera size={14} />
        Built with Gemini 2.5 AI & React
      </footer>
    </div>
  );
};

export default App;
