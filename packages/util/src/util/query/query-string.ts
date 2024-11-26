export function createQueryString(searchParams: URLSearchParams) {
  const queryString = searchParams.toString();

  if (queryString === "") {
    return "";
  }

  return `?${queryString}`;
}
