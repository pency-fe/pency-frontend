export function formatUrl(url: string) {
  if (url.startsWith("@")) {
    return url.slice(0);
  } else {
    return `@${url}`;
  }
}
