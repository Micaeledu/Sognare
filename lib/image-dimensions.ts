/**
 * Leitor mínimo de dimensões de imagem (PNG, JPEG, WebP) direto do cabeçalho
 * do arquivo, sem depender de bibliotecas de terceiros. Evita trazer parsers
 * de formatos que não usamos (ICNS/HEIF/JXL) só para ler largura/altura.
 *
 * Formato não reconhecido -> retorna null (o chamador decide o fallback).
 */

export type ImageDimensions = { width: number; height: number };

function readPng(buf: Buffer): ImageDimensions | null {
  const isPng =
    buf.length >= 24 &&
    buf[0] === 0x89 &&
    buf[1] === 0x50 &&
    buf[2] === 0x4e &&
    buf[3] === 0x47;
  if (!isPng) return null;
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

function readJpeg(buf: Buffer): ImageDimensions | null {
  if (buf.length < 4 || buf[0] !== 0xff || buf[1] !== 0xd8) return null;

  let offset = 2;
  while (offset + 9 < buf.length) {
    if (buf[offset] !== 0xff) {
      offset++;
      continue;
    }
    const marker = buf[offset + 1];
    const isSofMarker =
      (marker >= 0xc0 && marker <= 0xc3) ||
      (marker >= 0xc5 && marker <= 0xc7) ||
      (marker >= 0xc9 && marker <= 0xcb) ||
      (marker >= 0xcd && marker <= 0xcf);

    if (isSofMarker) {
      const height = buf.readUInt16BE(offset + 5);
      const width = buf.readUInt16BE(offset + 7);
      return { width, height };
    }

    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd9)) {
      offset += 2;
      continue;
    }

    const segmentLength = buf.readUInt16BE(offset + 2);
    offset += 2 + segmentLength;
  }
  return null;
}

function readWebp(buf: Buffer): ImageDimensions | null {
  const isRiffWebp =
    buf.length >= 30 &&
    buf.toString("ascii", 0, 4) === "RIFF" &&
    buf.toString("ascii", 8, 12) === "WEBP";
  if (!isRiffWebp) return null;

  const chunkType = buf.toString("ascii", 12, 16);

  if (chunkType === "VP8X") {
    const width = 1 + (buf[24] | (buf[25] << 8) | (buf[26] << 16));
    const height = 1 + (buf[27] | (buf[28] << 8) | (buf[29] << 16));
    return { width, height };
  }

  if (chunkType === "VP8 ") {
    const width = buf.readUInt16LE(26) & 0x3fff;
    const height = buf.readUInt16LE(28) & 0x3fff;
    return { width, height };
  }

  if (chunkType === "VP8L") {
    const bits = buf.readUInt32LE(21);
    const width = (bits & 0x3fff) + 1;
    const height = ((bits >> 14) & 0x3fff) + 1;
    return { width, height };
  }

  return null;
}

export function readImageDimensions(buf: Buffer): ImageDimensions | null {
  return readPng(buf) ?? readJpeg(buf) ?? readWebp(buf);
}
