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
  /** imagem de serviço ao lado do carrossel de depoimentos (convenção de nome opcional) */
  serviceImage: ImageAsset | null;
  videos: VideoAsset[];
};

/**
 * Convenções de nome de arquivo opcionais para direcionar uma imagem/vídeo a
 * uma seção específica em vez de cair na distribuição automática por
 * proporção. Nenhuma delas é obrigatória — sem arquivo algum com esses
 * termos no nome, tudo continua funcionando pela heurística de proporção.
 */
const ABOUT_PHOTO_HINTS = ["fundador", "sobre", "atelie", "ateliê"];
const HERO_IMAGE_HINTS = ["hero"];
const SERVICE_IMAGE_HINTS = ["servico", "serviço", "destaque"];
const HERO_VIDEO_HINTS = ["hero", "loop"];

function matchesHint(filename: string, hints: string[]) {
  const lower = filename.toLowerCase();
  return hints.some((hint) => lower.includes(hint));
}

/**
 * Distribui as mídias encontradas em `public/media` pelas seções do site,
 * sem depender de nome de arquivo fixo (exceto as convenções opcionais
 * acima). Prioridade do fundo do hero: imagem com "hero" no nome > vídeo
 * ambiente (nome com "hero"/"loop") > imagem mais larga disponível > bloco
 * sólido da paleta. Nunca lança erro se as pastas estiverem vazias.
 */
export function getSiteMedia(): SiteMedia {
  const allImages = getImageManifest();
  const allVideos = getVideoManifest();
  const avaliacoes = getAvaliacaoManifest();

  const aboutPhotos = allImages.filter((img) => matchesHint(img.filename, ABOUT_PHOTO_HINTS));
  const founderPhoto =
    [...aboutPhotos].sort((a, b) => b.width - a.width)[0] ?? null;

  const heroTaggedImage =
    allImages.find((img) => matchesHint(img.filename, HERO_IMAGE_HINTS)) ?? null;

  const serviceImage =
    allImages.find((img) => matchesHint(img.filename, SERVICE_IMAGE_HINTS)) ?? null;

  const reserved = new Set([founderPhoto, heroTaggedImage, serviceImage].filter(Boolean));
  const images = allImages.filter((img) => !reserved.has(img));

  // Um vídeo mudo/loop ambiente (nome com "hero"/"loop") nunca entra no
  // grupo de vídeos falados/clicáveis — só vira fundo do hero se não houver
  // imagem explícita para isso (vídeo falado nunca é usado mudo, perderia a
  // mensagem).
  const ambientVideo =
    allVideos.find((v) => matchesHint(v.filename, HERO_VIDEO_HINTS)) ?? null;
  const heroVideo = heroTaggedImage ? null : ambientVideo;
  const videos = allVideos.filter((v) => v !== ambientVideo);

  const sortedByWidth = [...images].sort((a, b) => b.ratio - a.ratio);
  const heroImage = heroTaggedImage ?? (heroVideo ? null : (sortedByWidth[0] ?? null));

  const remaining = sortedByWidth.filter((img) => img !== heroImage);
  const banners = remaining.filter((img) => img.shape === "wide");
  const gallery = remaining.filter((img) => img.shape !== "wide");

  return {
    heroImage,
    heroVideo,
    banners,
    gallery,
    avaliacoes,
    founderPhoto,
    serviceImage,
    videos,
  };
}
