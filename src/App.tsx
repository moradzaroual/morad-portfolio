import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Mail, Linkedin, Printer, Play, ImageOff } from "lucide-react";
import { PHOTOS, PROJECTS, VIDEOS } from "./data";
import { THUMB_IDS } from "./thumbIds";
import Lightbox, { type Slide } from "./components/Lightbox";
import Slideshow from "./components/Slideshow";

const EASE = [0.2, 0.7, 0.2, 1] as const;

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function SectionTitle({ eyebrow, children }: { eyebrow: string; children: ReactNode }) {
  return (
    <Reveal>
      <p className="text-xs uppercase tracking-[.2em] text-muted">{eyebrow}</p>
      <h2 className="mb-10 mt-3 font-display text-5xl font-semibold tracking-tight md:text-6xl">{children}</h2>
    </Reveal>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    f();
    addEventListener("scroll", f, { passive: true });
    return () => removeEventListener("scroll", f);
  }, []);
  const links = [
    ["#work", "Work"],
    ["#photos", "Photography"],
    ["#videos", "Videos"],
    ["#slides", "Slideshow"],
    ["#about", "About"],
    ["#contact", "Contact"],
  ];
  return (
    <nav className={`no-print fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "bg-cream/85 shadow-[0_1px_0_#e2ded3] backdrop-blur-md" : ""}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="#" className="font-display text-2xl font-semibold">Morad<span className="text-teal">.</span></a>
        <div className="hidden gap-7 text-sm md:flex">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="py-1 text-muted transition hover:text-ink">{label}</a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 260]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const words = "Systems that grow with you.".split(" ");
  return (
    <header ref={ref} className="relative flex min-h-screen items-center overflow-hidden">
      <motion.div style={{ y: y1 }} className="absolute -right-28 -top-20 h-[480px] w-[480px] rounded-full bg-[#5eead4]/40 blur-[70px]" />
      <motion.div style={{ y: y2 }} className="absolute -bottom-24 -left-20 h-[360px] w-[360px] rounded-full bg-[#fcd34d]/40 blur-[70px]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="text-xs uppercase tracking-[.2em] text-muted">
          Growth systems · Web development · Agadir
        </motion.p>
        <h1 className="mt-5 font-display text-6xl font-semibold leading-[1.02] md:text-8xl">
          {words.map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.12, duration: 0.9, ease: EASE }}
              className="mr-4 inline-block"
            >
              {w === "grow" ? <em className="italic text-teal">{w}</em> : w}
            </motion.span>
          ))}
        </h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.8 }} className="mt-7 max-w-xl text-lg text-muted">
          I build fast websites, automated workflows and marketing systems that turn visitors into customers.
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.8 }} className="mt-10 flex flex-wrap gap-4">
          <a href="#work" className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 py-3 font-bold text-cream transition hover:-translate-y-1">
            View work <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
          </a>
          <a href="#contact" className="inline-flex min-h-12 items-center rounded-full border-[1.5px] border-ink px-6 py-3 font-bold transition hover:-translate-y-1 hover:bg-ink hover:text-cream">
            Get in touch
          </a>
        </motion.div>
      </div>
    </header>
  );
}

function Projects() {
  return (
    <section id="work" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Selected projects">Work that <em className="italic text-teal">ships.</em></SectionTitle>
        <div className="grid gap-6 sm:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.name} className={i % 2 ? "sm:mt-16" : ""}>
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="group overflow-hidden rounded-3xl border border-[#e2ded3] bg-white shadow-sm hover:shadow-2xl"
              >
                <div
                  className="relative flex aspect-[4/3] items-end overflow-hidden p-6 font-display text-3xl italic text-white"
                  style={{ background: `linear-gradient(135deg, ${p.from}, ${p.to})` }}
                >
                  {THUMB_IDS[p.key] && (
                    <img
                      src={`https://lh3.googleusercontent.com/d/${THUMB_IDS[p.key]}=w800`}
                      alt={p.name}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  )}
                  <span className="relative z-10 drop-shadow-lg">{p.name}</span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl font-semibold">{p.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.desc}</p>
                  <div className="my-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-full border border-[#e2ded3] bg-cream px-3 py-1 text-xs">{t}</span>
                    ))}
                  </div>
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="group/link inline-flex min-h-11 items-center gap-2 font-bold">
                    Visit website <ArrowUpRight className="h-4 w-4 transition group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                  </a>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Photos() {
  const [open, setOpen] = useState<number | null>(null);
  const [broken, setBroken] = useState<Record<number, boolean>>({});
  const slides: Slide[] = PHOTOS.map((src, i) => ({ kind: "img", src, alt: `Photo ${i + 1}` }));

  return (
    <section id="photos" className="px-6 pb-28">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Photography">Moments, <em className="italic text-teal">framed.</em></SectionTitle>

        {PHOTOS.length === 0 && (
          <div className="flex items-start gap-3 rounded-2xl border border-dashed border-muted/50 p-6 text-muted">
            <ImageOff className="mt-0.5 h-5 w-5 shrink-0" />
            <p>No photos added yet. Add their IDs to src/photoIds.ts.</p>
          </div>
        )}

        <div className="columns-2 gap-4 md:columns-3">
          {PHOTOS.map((src, i) => (
            <Reveal key={src} className="mb-4 break-inside-avoid">
              <button
                onClick={() => setOpen(i)}
                aria-label={`Open photo ${i + 1}`}
                className="group block w-full overflow-hidden rounded-2xl bg-[#e8e4da]"
              >
                {broken[i] ? (
                  <div className="flex aspect-square items-center justify-center text-muted"><ImageOff /></div>
                ) : (
                  <img
                    src={src}
                    alt={`Photo ${i + 1}`}
                    loading="lazy"
                    decoding="async"
                    onError={() => setBroken((b) => ({ ...b, [i]: true }))}
                    className="block w-full transition duration-700 group-hover:scale-105"
                  />
                )}
              </button>
            </Reveal>
          ))}
        </div>

        {open !== null && (
          <Lightbox slides={slides} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />
        )}
      </div>
    </section>
  );
}

function Videos() {
  const [open, setOpen] = useState<number | null>(null);
  const slides: Slide[] = VIDEOS.map((v) => ({ kind: "yt", id: v.id, title: v.title }));

  return (
    <section id="videos" className="px-6 pb-28">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Videos">Watch <em className="italic text-teal">the cuts.</em></SectionTitle>
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {VIDEOS.map((v, i) => (
            <Reveal key={v.id}>
              <button onClick={() => setOpen(i)} aria-label={`Play ${v.title}`} className="group block w-full text-left">
                <div className="relative aspect-video overflow-hidden rounded-2xl bg-ink">
                  <img
                    src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105 group-hover:opacity-80"
                  />
                  <span className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/90 transition group-hover:scale-110">
                    <Play className="ml-1 h-6 w-6 fill-ink text-ink" />
                  </span>
                </div>
                <p className="mt-3 font-medium">{v.title}</p>
              </button>
            </Reveal>
          ))}
        </div>

        {open !== null && (
          <Lightbox slides={slides} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />
        )}
      </div>
    </section>
  );
}

function About() {
  const skills = ["React Native", "Next.js", "WordPress", "n8n", "Make.com", "AI agents", "Zoho", "HubSpot", "Low-code", "SEO"];
  return (
    <section id="about" className="px-6 pb-28">
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2">
        <Reveal>
          <p className="text-xs uppercase tracking-[.2em] text-muted">About</p>
          <h2 className="mb-6 mt-3 font-display text-5xl font-semibold tracking-tight">Growth meets <em className="italic text-teal">engineering.</em></h2>
          <p className="mb-4 text-lg text-muted">
            I'm Morad, a growth systems builder and web developer based in Morocco. I founded Espirato+, a live sports
            platform, and build sites and automations for businesses that want more than a brochure.
          </p>
          <p className="text-lg text-muted">
            Background in marketing (ISTA Assaka) and English studies, with digital marketing experience at ZineGlob, Agadir.
          </p>
        </Reveal>
        <Reveal>
          <p className="text-xs uppercase tracking-[.2em] text-muted">Toolkit</p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {skills.map((s) => (
              <span key={s} className="rounded-full border border-[#e2ded3] bg-white px-4 py-2 text-sm">{s}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="px-6 pb-24">
      <Reveal className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[.2em] text-muted">Contact</p>
        <h2 className="mb-10 mt-3 font-display text-5xl font-semibold tracking-tight md:text-6xl">Let's build <em className="italic text-teal">something.</em></h2>
        <div className="no-print flex flex-wrap gap-4">
          <a href="mailto:morad.zaroual@hotmail.com" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 py-3 font-bold text-cream transition hover:-translate-y-1">
            <Mail className="h-4 w-4" /> morad.zaroual@hotmail.com
          </a>
          <a href="https://www.linkedin.com/in/moradzaroual" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full border-[1.5px] border-ink px-6 py-3 font-bold transition hover:-translate-y-1 hover:bg-ink hover:text-cream">
            <Linkedin className="h-4 w-4" /> LinkedIn
          </a>
          <button onClick={() => window.print()} className="inline-flex min-h-12 items-center gap-2 rounded-full border-[1.5px] border-ink px-6 py-3 font-bold transition hover:-translate-y-1 hover:bg-ink hover:text-cream">
            <Printer className="h-4 w-4" /> Print portfolio
          </button>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="no-print border-t border-[#e2ded3] px-6 py-10 text-sm text-muted">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap justify-between gap-3">
        <span>© 2026 Morad</span>
        <a href="#" className="hover:text-ink">Back to top ↑</a>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Projects />
      <Photos />
      <Videos />
      <Slideshow />
      <About />
      <Contact />
      <Footer />
    </>
  );
}