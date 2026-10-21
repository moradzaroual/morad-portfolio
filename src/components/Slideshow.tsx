import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play, ImageOff } from "lucide-react";
import { SLIDE_IDS } from "../slideIds";

const EASE = [0.2, 0.7, 0.2, 1] as const;
const DURATION_MS = 5000;

export default function Slideshow() {
  const slides = SLIDE_IDS.map((id) => `https://lh3.googleusercontent.com/d/${id}=w1600`);
  const n = slides.length;
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [paused, setPaused] = useState(false);
  const [broken, setBroken] = useState(false);
  const isPaused = paused || hovering;

  const next = () => { setBroken(false); setIndex((i) => (i + 1) % n); };
  const prev = () => { setBroken(false); setIndex((i) => (i - 1 + n) % n); };

  const btn = "absolute z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-white/35";

  return (
    <section id="slides" className="px-6 pb-28">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[.2em] text-muted">Slideshow</p>
        <h2 className="mb-10 mt-3 font-display text-5xl font-semibold tracking-tight md:text-6xl">
          Auto <em className="italic text-teal">gallery.</em>
        </h2>

        {n === 0 ? (
          <p className="rounded-2xl border border-dashed border-muted/50 p-6 text-muted">
            No slideshow images yet. Add the IDs to src/slideIds.ts.
          </p>
        ) : (
          <div
            className="relative overflow-hidden rounded-3xl bg-ink"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            <div className="relative flex aspect-video items-center justify-center">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: EASE }}
                  className="absolute inset-0"
                >
                  {broken ? (
                    <div className="flex h-full items-center justify-center text-white/60">
                      <ImageOff className="h-10 w-10" />
                    </div>
                  ) : (
                    <img
                      src={slides[index]}
                      alt={`Slide ${index + 1}`}
                      onError={() => setBroken(true)}
                      className="h-full w-full object-cover"
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              <button onClick={prev} aria-label="Previous image" className={`${btn} left-4 top-1/2 -translate-y-1/2`}>
                <ChevronLeft />
              </button>
              <button onClick={next} aria-label="Next image" className={`${btn} right-4 top-1/2 -translate-y-1/2`}>
                <ChevronRight />
              </button>
              <button
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? "Play" : "Pause"}
                className={`${btn} right-4 top-4 h-10 w-10`}
              >
                {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              </button>
            </div>

            {/* 5-second progress line; moves to the next image when it finishes */}
            <div className="h-1 w-full bg-white/15">
              <div
                key={index}
                onAnimationEnd={next}
                className="h-full bg-teal"
                style={{
                  animation: `slide-progress ${DURATION_MS}ms linear forwards`,
                  animationPlayState: isPaused ? "paused" : "running",
                }}
              />
            </div>
          </div>
        )}

        {n > 0 && <p className="mt-4 text-center text-sm text-muted">{index + 1} / {n}</p>}
      </div>
    </section>
  );
}