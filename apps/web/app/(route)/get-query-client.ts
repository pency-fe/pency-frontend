import { defaultShouldDehydrateQuery, isServer, QueryClient } from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      dehydrate: {
        // include pending queries in dehydration
        shouldDehydrateQuery: (query) => defaultShouldDehydrateQuery(query) || query.state.status === "pending",
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) {
    // 서버: 항상 새로운 쿼리 클라이언트를 만들어야 한다.
    return makeQueryClient();
  } else {
    //브라우저: 이미 쿼리 클라이언트를 가지고 있지 않다면, 새로운 쿼리 클라이언트를 만들어야 한다.
    // 만약 suspense boundary가 query client 생성 아래에 위치해 있다면, 이것은 필요없을 수 있습니다.
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
