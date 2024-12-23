type Options = {
  prefix: boolean;
};

export function formatUrl(url: string, { prefix }: Options = { prefix: true }) {
  if (prefix && !url.startsWith("@")) {
    return `@${url}`;
  }

  if (!prefix && url.startsWith("@")) {
    return url.slice(1);
  }

  return url;
}
