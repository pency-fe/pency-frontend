"use client";

// QueryClientProvider는 내부적으로 useContext를 사용하므로, 최상단에 "use client"를 추가해야 합니다.
import { isServer, matchQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function makeQueryClient() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
        refetchOnMount: false,
      },
    },
  });

  queryClient.getMutationCache().config.onSuccess = (_data, _variables, _context, mutation) => {
    queryClient.invalidateQueries({
      predicate: (query) =>
        mutation.meta?.invalidates?.some((queryKey) => {
          return matchQuery({ queryKey }, query);
        }) ?? false,
    });

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

function getQueryClient() {
  if (isServer) {
    // 서버: 요청 별로 항상 새로운 쿼리 클라이언트를 만들어야 합니다.
    return makeQueryClient();
  } else {
    // 브라우저: 이미 쿼리 클라이언트를 가지고 있지 않다면, 새로운 쿼리 클라이언트를 만들어야 한다.
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export function InitQueryClientProvider({ children }: { children?: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
