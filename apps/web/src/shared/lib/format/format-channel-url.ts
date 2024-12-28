type Options = {
  prefix: boolean;
};

export function formatChannelUrl(url: string, { prefix }: Options = { prefix: true }) {
  if (prefix && !url.startsWith("@")) {
    return `@${url}`;
  }

  if (!prefix && url.startsWith("@")) {
    return url.slice(1);
  }

  return url;
}
