import { DRIVE_IDS } from "./photoIds";

/* ===== EDIT YOUR CONTENT HERE ===== */

// Google Drive photos (folder shared as "Anyone with the link").
// Each ID comes from src/photoIds.ts. Google serves a 1600px version.
export const PHOTOS: string[] = DRIVE_IDS.map(
  (id) => `https://lh3.googleusercontent.com/d/${id}=w1600`
);

export type Video = { id: string; title: string };
export const VIDEOS: Video[] = [
  { id: "upWgTnzEkkA", title: "Charles Bukowski on Being Alone" },
  { id: "V-Mme1qvD7Q", title: "Capernaum - Zain" },
  { id: "JJRxKunm61Y", title: "Horses of God | Hans Zimmer - STAY" },
  { id: "D5rD3sgeU4M", title: "How to end a movie" },
  { id: "Jxd5Jf6zLUM", title: "Kina - Can We Kiss Forever?" },
  { id: "3N5U0dkOHsI", title: "Her | Powfu - Death bed" },
  { id: "8vpNVtZK7ks", title: "Pain - ألم" },
  { id: "eNJo_0P43D4", title: "Best Acting Of All Time" },
  { id: "t_IB3bR-lIo", title: "I am losing My mind" },
  { id: "mfjs0uA2qwo", title: "Eyes" },
  { id: "jt-ivFUixpM", title: "Smile - إبتسامة" },
  { id: "W7hlfVzIMKg", title: "Something beyond feelings" },
  { id: "wn7ndOiK-to", title: "You can never feel my pain" },
  { id: "Dhlgs-R_94s", title: "Six Feet Under | Paravi Das" },
  { id: "5pSGxG67FH4", title: "For Your Precious Love" },
];

export type Project = {
  name: string;
  title: string;
  desc: string;
  tags: string[];
  url: string;
  from: string;
  to: string;
};
export const PROJECTS: Project[] = [
  { name: "MYISTA", title: "Ressources académiques en un seul endroit",
    desc: "PDFs, supports de cours, vidéos et articles organisés par filière et par module, avec recherche instantanée.",
    tags: ["Web app", "Search", "Content structure"], url: "https://myista.vercel.app/", from: "#0d9488", to: "#134e4a" },
  { name: "Nadraa", title: "Portail d'actualités en arabe",
    desc: "Site d'information en RTL avec fil d'actualités en direct, catégories et mise en page éditoriale.",
    tags: ["Arabic RTL", "News layout", "Responsive"], url: "https://nadraa.vercel.app/", from: "#dc2626", to: "#7f1d1d" },
  { name: "IDMAROUK Négoce", title: "Vitrine d'import de bois",
    desc: "Présentation d'un distributeur de bois nobles et dérivés : produits, galerie et prise de contact.",
    tags: ["Corporate", "Gallery", "Brand design"], url: "https://idmarouk-website.vercel.app/", from: "#1e3a8a", to: "#c9a227" },
  { name: "Espirato+", title: "Plateforme sportive en direct",
    desc: "Matchs, temps forts et articles pour les fans de football. Projet que je fonde et fais grandir.",
    tags: ["Live sports", "Blog", "Founder"], url: "https://espiratoplus.blogspot.com/", from: "#be123c", to: "#0a0a0a" },
];