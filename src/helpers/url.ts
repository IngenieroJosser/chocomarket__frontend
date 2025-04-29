export function normalizeImageUrl(url: string): string {
  // Si ya es URL remota (http:// o https://), la devolvemos tal cual
  if (/^https?:\/\//.test(url)) {
    return url;
  }
  // Si es ruta local, nos aseguramos de que empiece con '/'
  return url.startsWith('/') ? url : `/${url}`;
}