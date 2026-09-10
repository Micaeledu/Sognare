import "server-only";
import fs from "node:fs";
import path from "node:path";
import { readImageDimensions } from "./image-dimensions";

const MEDIA_ROOT = path.join(process.cwd(), "public", "media");

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const VIDEO_EXTENSIONS = new Set([".mp4", ".webm", ".mov"]);

export type ImageAsset = {
  /** caminho público, ex: /media/images/foto.jpg */
  src: string;
  filename: string;
  width: number;
  height: number;
  ratio: number;
  /** classificação heurística pela proporção, usada para distribuir pelas seções */
  shape: "wide" | "square" | "portrait";
};

export type VideoAsset = {
  src: string;
  filename: string;
  /** primeiro frame gerado como poster, se `<nome>-poster.jpg` existir ao lado do vídeo */
  poster: string | null;
};

function listFiles(dir: string, extensions: Set<string>): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => extensions.has(path.extname(name).toLowerCase()))
    .sort();
}

function classifyShape(ratio: number): ImageAsset["shape"] {
  if (ratio >= 1.35) return "wide";
  if (ratio <= 0.8) return "portrait";
  return "square";
}

function loadImages(subfolder: string): ImageAsset[] {
  const dir = path.join(MEDIA_ROOT, subfolder);
  const files = listFiles(dir, IMAGE_EXTENSIONS);

  const assets: ImageAsset[] = [];
  for (const filename of files) {
    const filePath = path.join(dir, filename);
    let dimensions;
    try {
      // AVIF não é lido pelo parser leve (formato baseado em caixas ISO-BMFF);
      // cai no fallback quadrado abaixo em vez de quebrar o build.
      const buf = fs.readFileSync(filePath);
      dimensions = readImageDimensions(buf);
    } catch {
      dimensions = null;
    }
    const width = dimensions?.width ?? 1200;
    const height = dimensions?.height ?? 1200;
    const ratio = width / height;
    assets.push({
      src: `/media/${subfolder}/${filename}`,
      filename,
      width,
      height,
      ratio,
      shape: classifyShape(ratio),
    });
  }
  return assets;
}

export function getImageManifest(): ImageAsset[] {
  return loadImages("images");
}

export function getAvaliacaoManifest(): ImageAsset[] {
  return loadImages("avaliacoes");
}

export function getVideoManifest(): VideoAsset[] {
  const dir = path.join(MEDIA_ROOT, "videos");
  return listFiles(dir, VIDEO_EXTENSIONS)
    .map((filename) => {
      const posterName = `${path.parse(filename).name}-poster.jpg`;
      const hasPoster = fs.existsSync(path.join(dir, posterName));
      return {
        src: `/media/videos/${filename}`,
        filename,
        poster: hasPoster ? `/media/videos/${posterName}` : null,
      };
    });
}

export type SiteMedia = {
  heroImage: ImageAsset | null;
  heroVideo: VideoAsset | null;
  /** imagens largas restantes, usadas como faixas/fundos de seção */
  banners: ImageAsset[];
  /** imagens quadradas/retrato restantes, usadas nos cards da galeria */
  gallery: ImageAsset[];
  avaliacoes: ImageAsset[];
  /** foto do fundador/ateliê para a seção Sobre (convenção de nome opcional) */
  founderPhoto: ImageAsset | null;
  videos: VideoAsset[];
};

/**
 * Convenção opcional: arquivos cujo nome contém "fundador", "sobre" ou
 * "ateliê/atelie" são tratados como foto da seção Sobre em vez de entrarem
 * na galeria genérica de projetos. Totalmente opcional — sem nenhum arquivo
 * assim, tudo continua caindo na distribuição automática por proporção.
 */
const ABOUT_PHOTO_HINTS = ["fundador", "sobre", "atelie", "ateliê"];

function isAboutPhoto(filename: string) {
  const lower = filename.toLowerCase();
  return ABOUT_PHOTO_HINTS.some((hint) => lower.includes(hint));
}

/**
 * Convenção opcional: um vídeo cujo nome contenha "hero" ou "loop" é tratado
 * como b-roll ambiente (silencioso, em loop, fundo do hero). Qualquer outro
 * vídeo é tratado como depoimento/institucional falado — vira card clicável
 * que toca com som, em vez de virar fundo mudo (o que perderia a fala).
 */
const HERO_VIDEO_HINTS = ["hero", "loop"];

function isHeroVideo(filename: string) {
  const lower = filename.toLowerCase();
  return HERO_VIDEO_HINTS.some((hint) => lower.includes(hint));
}

/**
 * Distribui as mídias encontradas em `public/media` pelas seções do site,
 * sem depender de nome de arquivo fixo (exceto a convenção opcional acima).
 * A imagem mais larga vira destaque do hero (ou fundo do hero, se não houver
 * vídeo); as demais alimentam a galeria e as faixas de seção. Nunca lança
 * erro se as pastas estiverem vazias — quem consome o manifesto decide o
 * fallback visual (bloco sólido da paleta).
 */
export function getSiteMedia(): SiteMedia {
  const allImages = getImageManifest();
  const allVideos = getVideoManifest();
  const avaliacoes = getAvaliacaoManifest();

  const aboutPhotos = allImages.filter((img) => isAboutPhoto(img.filename));
  const founderPhoto =
    [...aboutPhotos].sort((a, b) => b.width - a.width)[0] ?? null;

  const images = allImages.filter((img) => img !== founderPhoto && !aboutPhotos.includes(img));

  const heroVideo = allVideos.find((v) => isHeroVideo(v.filename)) ?? null;
  const videos = allVideos.filter((v) => v !== heroVideo);

  const sortedByWidth = [...images].sort((a, b) => b.ratio - a.ratio);
  const heroImage = heroVideo ? null : (sortedByWidth[0] ?? null);

  const remaining = sortedByWidth.filter((img) => img !== heroImage);
  const banners = remaining.filter((img) => img.shape === "wide");
  const gallery = remaining.filter((img) => img.shape !== "wide");

  return { heroImage, heroVideo, banners, gallery, avaliacoes, founderPhoto, videos };
}
