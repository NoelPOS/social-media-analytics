"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  ArrowLeft,
  Grid3X3,
  X,
  FileText,
  Keyboard,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// Adjust these to match the actual number of slides per day
const SLIDES_PER_DAY: Record<string, number> = {
  day1: 70,
  day2: 20,
};

export default function SlidesPage() {
  const params = useParams();
  const router = useRouter();
  const day = params.day as string;
  const totalSlides = SLIDES_PER_DAY[day] ?? 10;

  const [current, setCurrent] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [imageError, setImageError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (n: number) => {
      if (n < 1 || n > totalSlides) return;
      setCurrent(n);
      setImageError(false);
    },
    [totalSlides]
  );

  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);
  const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "f" || e.key === "F") {
        setFullscreen((f) => !f);
      } else if (e.key === "Escape") {
        if (showGrid) setShowGrid(false);
        else setFullscreen(false);
      } else if (e.key === "g" || e.key === "G") {
        setShowGrid((g) => !g);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev, showGrid]);

  // Native fullscreen API
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  useEffect(() => {
    const handler = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  const slideLabel = day === "day1" ? "Day 1" : day === "day2" ? "Day 2" : day.toUpperCase();
  const slidePath = `/slides/${day}/${current}.png`;

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex flex-col transition-colors duration-300",
        fullscreen ? "fixed inset-0 z-50 bg-[#0a0a0f]" : "min-h-screen bg-slate-50"
      )}
    >
      {/* Top bar */}
      {!fullscreen && (
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-white/80 backdrop-blur-sm">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="text-muted-foreground/60 text-xs font-medium uppercase tracking-widest">
              {slideLabel}
            </span>
            <span className="text-muted-foreground/30">·</span>
            <span className="text-foreground font-semibold text-sm">
              {current} <span className="text-muted-foreground/60">/ {totalSlides}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowGrid(!showGrid)}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-black/5 transition-all"
              title="Grid view (G)"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-black/5 transition-all"
              title="Fullscreen (F)"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Fullscreen header overlay */}
      {fullscreen && (
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity">
          <span className="text-white/60 text-sm">{slideLabel}</span>
          <span className="text-white font-medium text-sm">
            {current} / {totalSlides}
          </span>
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg text-white/60 hover:text-white bg-black/30 hover:bg-black/50 transition-all"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Slide viewer */}
      <div 
        className={cn(
          "flex-1 flex items-center justify-center relative transition-all duration-300",
          fullscreen ? "p-0" : "px-4 md:px-12 py-4"
        )}
      >
        {/* Prev button */}
        <button
          onClick={goPrev}
          disabled={current === 1}
          className={cn(
            "absolute left-2 md:left-4 z-10 p-2.5 rounded-xl transition-all duration-200",
            current === 1
              ? (fullscreen ? "text-white/10" : "text-gray-300") + " cursor-not-allowed"
              : fullscreen 
                ? "text-white/50 hover:text-white hover:bg-white/10 active:scale-95"
                : "text-gray-400 hover:text-gray-900 hover:bg-black/5 active:scale-95"
          )}
          title="Previous slide (←)"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Slide image */}
        <div
          className={cn(
            "relative overflow-hidden transition-all duration-300",
            fullscreen 
              ? "w-full h-full" 
              : "w-full max-w-5xl rounded-2xl shadow-2xl shadow-black/20 border border-gray-200 bg-white"
          )}
          style={fullscreen ? {} : { aspectRatio: "16/9" }}
        >
          {imageError ? (
            <div className={cn(
              "w-full h-full flex flex-col items-center justify-center gap-3",
              fullscreen ? "bg-white/[0.02] text-white/20" : "bg-gray-50 text-gray-400"
            )}>
              <FileText className="w-16 h-16 opacity-20" />
              <p className="text-sm">Slide {current} not found</p>
              <p className="text-xs opacity-50">
                Add images to /public/slides/{day}/{current}.png
              </p>
            </div>
          ) : (
            <Image
              key={slidePath}
              src={slidePath}
              alt={`${slideLabel} - Slide ${current}`}
              fill
              className="object-contain slide-enter"
              onError={() => setImageError(true)}
              priority
              sizes={fullscreen ? "100vw" : "(max-width: 768px) 100vw, 80vw"}
            />
          )}
        </div>

        {/* Next button */}
        <button
          onClick={goNext}
          disabled={current === totalSlides}
          className={cn(
            "absolute right-2 md:right-4 z-10 p-2.5 rounded-xl transition-all duration-200",
            current === totalSlides
              ? (fullscreen ? "text-white/10" : "text-gray-300") + " cursor-not-allowed"
              : fullscreen 
                ? "text-white/50 hover:text-white hover:bg-white/10 active:scale-95"
                : "text-gray-400 hover:text-gray-900 hover:bg-black/5 active:scale-95"
          )}
          title="Next slide (→)"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom progress bar */}
      <div className="px-4 pb-4 space-y-3">
        <div className="flex items-center gap-3">
          <Progress
            value={(current / totalSlides) * 100}
            className="flex-1 h-1.5"
          />
        </div>

        {/* Slide dots (for smaller sets) */}
        {totalSlides <= 30 && (
          <div className="flex justify-center gap-1 flex-wrap">
            {Array.from({ length: totalSlides }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => goTo(n)}
                className={cn(
                  "transition-all duration-200 rounded-full",
                  n === current
                    ? "w-4 h-2 bg-blue-500"
                    : "w-2 h-2 bg-gray-200 hover:bg-gray-400"
                )}
              />
            ))}
          </div>
        )}

        {/* Keyboard hints */}
        {!fullscreen && (
          <p className="text-center text-muted-foreground/40 text-xs flex items-center justify-center gap-4">
            <span className="flex items-center gap-1"><Keyboard className="w-3 h-3" /> Navigation</span>
            <span><span className="font-mono bg-white/10 px-1 rounded">←</span> <span className="font-mono bg-white/10 px-1 rounded">→</span> to move</span>
            <span><span className="font-mono bg-white/10 px-1 rounded">F</span> fullscreen</span>
            <span><span className="font-mono bg-white/10 px-1 rounded">G</span> grid</span>
          </p>
        )}
      </div>

      {/* Grid overlay */}
      {showGrid && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm overflow-auto p-4 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white font-bold text-lg">{slideLabel} — All Slides</h2>
            <button
              onClick={() => setShowGrid(false)}
              className="p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
            {Array.from({ length: totalSlides }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => {
                  goTo(n);
                  setShowGrid(false);
                }}
                className={cn(
                  "relative rounded-lg overflow-hidden border-2 transition-all duration-200 aspect-video group",
                  n === current
                    ? "border-blue-500 shadow-lg shadow-blue-500/30"
                    : "border-white/10 hover:border-white/30"
                )}
              >
                <Image
                  src={`/slides/${day}/${n}.png`}
                  alt={`Slide ${n}`}
                  fill
                  className="object-cover"
                  sizes="120px"
                  onError={() => {}}
                />
                <div className={cn(
                  "absolute inset-0 flex items-center justify-center bg-black/50",
                  n === current ? "bg-blue-500/20" : "opacity-0 group-hover:opacity-100 transition-opacity"
                )}>
                  <span className="text-white text-xs font-bold">{n}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
