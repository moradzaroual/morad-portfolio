import { useEffect } from "react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type Slide =
  | { kind: "img"; src: string; alt: string }
  | { kind: "yt"; id: string; title: string };

type Props = {
  slides: Slide[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
};

export default function Lightbox({ slides, index, onIndex, onClose }: Props) {
  const n = slides.length;
  const s = slides[index];
  const go = (d: number) => onIndex((index + d + n) % n);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  });

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) go(1);
    else if (info.offset.x > 60) go(-1);
  };

  const navBtn = "absolute top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/30";

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-6"
    >
      <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} aria-label="Close" className="absolute -top-12 right-0 flex h-11 w-11 items-center justify-center text-white">
          <X />
        </button>

        <div className="flex min-h-[55vh] items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
              drag={s.kind === "img" ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={onDragEnd}
              className="w-full"
            >
              {s.kind === "img" ? (
                <img src={s.src} alt={s.alt} draggable={false} className="mx-auto max-h-[75vh] rounded-2xl object-contain" />
              ) : (
                <iframe
                  className="aspect-video w-full rounded-2xl"
                  src={`https://www.youtube-nocookie.com/embed/${s.id}?autoplay=1`}
                  title={s.title}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <button onClick={() => go(-1)} aria-label="Previous" className={`${navBtn} left-2`}><ChevronLeft /></button>
        <button onClick={() => go(1)} aria-label="Next" className={`${navBtn} right-2`}><ChevronRight /></button>
        <p className="mt-4 text-center text-sm text-white/70">{index + 1} / {n}</p>
      </div>
    </motion.div>
  );
}
