export function createQueryString(searchParams: URLSearchParams) {
  const queryString = searchParams.toString().replace(/\+/g, "%20");

  if (queryString === "") {
    return "";
  }

  return `?${queryString}`;
}

/**
 * Filters nullable values ​​​​from the provided object and returns them as a string using URLSearchParams.
 * @example
 * createSearchParamString({ foo: 1, bar: ['a', 'b'], baz: undefined }) // foo=1&bar=a&bar=b
 * @param params params The object to convert into a query
 */
export function createSearchParamString(params: Record<string, any>) {
  return createQueryString(
    new URLSearchParams(
      Object.entries(params)
        .filter(([, value]) => value != null)
        .map(([key, value]) => {
          if (Array.isArray(value)) {
            return value.map((x) => [key, x]);
          }
          return [[key, value]];
        })
        .flat(),
    ),
  );
}
