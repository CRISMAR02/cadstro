/**
 * Extrae el ID de YouTube de una URL
 * @param url URL de YouTube
 * @returns ID de YouTube o la URL original si no se pudo extraer
 */
export function extractYouTubeID(url: string): string {
  if (!url) return url

  // Patrones comunes de URLs de YouTube
  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/i,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^/?]+)/i,
    /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^/?]+)/i,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }

  // Si no coincide con ningún patrón, devolver la URL original
  return url
}

/**
 * Determina si una URL es de YouTube
 * @param url URL a verificar
 * @returns true si es una URL de YouTube, false en caso contrario
 */
export function isYouTubeUrl(url: string): boolean {
  return /youtube\.com|youtu\.be/i.test(url)
}

/**
 * Genera una URL de embed de YouTube a partir de una URL o ID
 * @param url URL o ID de YouTube
 * @returns URL de embed de YouTube
 */
export function generateYouTubeEmbedUrl(url: string): string {
  const youtubeID = extractYouTubeID(url)
  if (youtubeID === url) {
    // Si no se pudo extraer un ID, verificar si ya es un ID
    if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
      return `https://www.youtube.com/embed/${url}`
    }
    // Si no es un ID ni una URL de YouTube, devolver la URL original
    return url
  }
  return `https://www.youtube.com/embed/${youtubeID}`
}

