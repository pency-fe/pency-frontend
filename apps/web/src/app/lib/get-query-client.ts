import { isServer, matchQuery, QueryClient } from "@tanstack/react-query";

function makeQueryClient() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });

  queryClient.getMutationCache().config.onSuccess = (_data, _variables, _context, mutation) => {
    const invalidates = mutation.meta?.invalidates;

    if (invalidates && invalidates.length) {
      queryClient.invalidateQueries({
        predicate: (query) =>
          invalidates.some((queryKey) => {
            return matchQuery({ queryKey }, query);
          }) ?? false,
      });
    }

    if (invalidates && !invalidates.length) {
      queryClient.invalidateQueries();
    }

    return queryClient.invalidateQueries(
      {
        predicate: (query) => mutation.meta?.awaits?.some((queryKey) => matchQuery({ queryKey }, query)) ?? false,
      },
      { cancelRefetch: false },
    );
  };

  return queryClient;
}

let browserQueryClient: QueryClient | undefined = undefined;

export const getQueryClient = () => {
  if (isServer) {
    // 서버: 요청 별로 항상 새로운 쿼리 클라이언트를 만들어야 합니다.
    return makeQueryClient();
  } else {
    // 브라우저: 이미 쿼리 클라이언트를 가지고 있지 않다면, 새로운 쿼리 클라이언트를 만들어야 한다.
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
};
