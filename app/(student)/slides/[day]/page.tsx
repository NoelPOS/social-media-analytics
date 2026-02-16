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
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// Adjust these to match the actual number of slides per day
const SLIDES_PER_DAY: Record<string, number> = {
  day1: 37,
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
        "flex flex-col bg-[#0a0a0f]",
        fullscreen ? "fixed inset-0 z-50" : "min-h-screen"
      )}
    >
      {/* Top bar */}
      {!fullscreen && (
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-black/30 backdrop-blur-sm">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="text-white/40 text-xs font-medium uppercase tracking-widest">
              {slideLabel}
            </span>
            <span className="text-white/20">·</span>
            <span className="text-white font-semibold text-sm">
              {current} <span className="text-white/40">/ {totalSlides}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowGrid(!showGrid)}
              className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"
              title="Grid view (G)"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"
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
      <div className="flex-1 flex items-center justify-center relative px-12 md:px-20 py-4">
        {/* Prev button */}
        <button
          onClick={goPrev}
          disabled={current === 1}
          className={cn(
            "absolute left-2 md:left-4 z-10 p-2.5 rounded-xl transition-all duration-200",
            current === 1
              ? "text-white/10 cursor-not-allowed"
              : "text-white/50 hover:text-white hover:bg-white/10 active:scale-95"
          )}
          title="Previous slide (←)"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Slide image */}
        <div
          className={cn(
            "relative w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl shadow-black/60 transition-all duration-300",
            "border border-white/5"
          )}
          style={{ aspectRatio: "16/9" }}
        >
          {imageError ? (
            <div className="w-full h-full flex flex-col items-center justify-center bg-white/[0.02] text-white/20 gap-3">
              <div className="text-6xl">📄</div>
              <p className="text-sm">Slide {current} not found</p>
              <p className="text-xs text-white/10">
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
              sizes="(max-width: 768px) 100vw, 80vw"
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
              ? "text-white/10 cursor-not-allowed"
              : "text-white/50 hover:text-white hover:bg-white/10 active:scale-95"
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
                    ? "w-4 h-2 bg-violet-500"
                    : "w-2 h-2 bg-white/15 hover:bg-white/30"
                )}
              />
            ))}
          </div>
        )}

        {/* Keyboard hints */}
        {!fullscreen && (
          <p className="text-center text-white/15 text-xs">
            ← → Arrow keys to navigate · F to fullscreen · G for grid
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
                    ? "border-violet-500 shadow-lg shadow-violet-500/30"
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
                  n === current ? "bg-violet-500/20" : "opacity-0 group-hover:opacity-100 transition-opacity"
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
