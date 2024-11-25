# Pency Frontend

## hosts파일 수정하기

`127.0.0.1 localhost`를 `127.0.0.1 pency.co.kr`로 변경해라.

- mac: https://suyeonme.tistory.com/55
- window: https://likedev.tistory.com/entry/%EC%9C%88%EB%8F%84%EC%9A%B0-PC%EC%97%90%EC%84%9C-Hosts-%ED%8C%8C%EC%9D%BC-%EC%84%A4%EC%A0%95-%EB%B0%A9%EB%B2%95

## 프로젝트 구조

### pency-web

- `app`

  - `_store`: 애플리케이션 전역적으로 사용되는 스토어입니다. ex. 사용자 id 저장하는 스토어

  - `_core`

    - `webtoon`

      - `post`

        - `ui`: `@pency/ui/components`를 필요한 것만 확장시킨 컴포넌트입니다.
          1. 컴포넌트를 생성합니다. 컴포넌트 이름은 `[WT | WN | CM | GS]_[Post | Series | ...]_OverviewCard`로 네이밍합니다. 단일 컴포넌트로 작성합니다.
          2. ui와 관련된 데이터를 props로 받고 그 데이터로 인해 달라지는 ui 부분을 작성합니다.
          3. 작성할 수 있는 모든 비즈니스 로직과 mutation 부분을 작성합니다.
          4. 구현할 수 없는 로직은 `onClick`, `onChange` 같이 직관적인 이름으로 props를 추가한 다음 실행될 부분에 함수 호출을 작성합니다. **이 단계는 주의가 필요합니다. 정말 필요한지 다시 생각해 보길 바랍니다. 항상 틀렸다는 것이 아니라, 현재 컴포넌트가 충분히 구현할 수 있는지, 왜 이 컴포넌트를 만드려는지, boundary 컴포넌트가 아닌지 다시 생각해 보길 바랍니다.**
        - `boundary`: error-boundary 기준으로 컴포넌트를 작성합니다.
          1. 컴포넌트를 생성합니다. 컴포넌트 이름은 `[WT | WN | CM | GS]_[Post | Series | ...]_PopularList`로 네이밍합니다. 컴파운드 컴포넌트로 작성합니다.
          2. `useSuspenseQuery`를 사용해서 데이터를 불러옵니다.
          3. 필요시 데이터를 props를 받을 수 있습니다. 탭 버튼, 정렬 버튼하고 관련된 거 말고는 거의 없어.
          4. `../ui`의 컴포넌트를 사용할 수 있습니다.
          5. 작성할 수 있는 모든 비즈니스 로직을 작성합니다.
          6. withAsyncBoundary를 사용합니다.
          7. createStore를 사용합니다.
        - `query`: query, mutation, api를 작성합니다.
          - `queries.ts`: query key + query options를 작성합니다.
          - `mutation`: useMutation 사용한 커스텀 훅을 작성합니다.
          - `api`: ky라이브러리를 사용해서 api를 작성합니다.

      - `series`

    - `webnovel`
    - `channel`
    - `user`

  - `(route)`: 라우트 구조를 작성합니다. `layout`, `page`를 생성합니다.

### @pency/ui

### @pency/util

### route 구조

```
(auth)

(home-header)
  layout.tsx -> 헤더
  (home-sidebar)
    layout.tsx -> 사이드 바
    page.tsx -> "/"
    webtoon
      post
        page.tsx -> "/webtoon/post"
        -> "?genre={ROMANCE | ACTION | ...}" -> "/webtoon/post"는 ALL로 생각한다. 이상한 값이 들어와도 ALL이다.
        list
          page.tsx -> "/webtoon/post/list"
          -> "?genre={ROMANCE | ACTION | ...}" -> "/webtoon/post/list"는 ALL로 생각한다. 이상한 값이 들어와도 ALL이다.
          -> "?sort={LATEST | POPULAR | WPOPULAR}" -> "/webtoon/post/list"는 LATEST로 생각한다. 이상한 값이 들어와도 LATEST이다.
          -> "?page={2 | ...}" -> "/webtoon/post/list"는 1로 생각한다. 이상한 값이 들어와도 1이다.
      series -> "/webtoon/series"
        - 위에 있는 post와 동일하다.
    webnovel
      - 위에 있는 webtoon과 동일하다.
  (setting-sidebar)

(webtoon-editor)

(webnovel-editor)
- layout: home header

```

- layout: home header

  - 채널 만들기: `/channel/create`

  - layout: platform sidebar

    - 홈 (사이드 바 로고에 포함): `/`
    - 웹툰 (사이드 바에 포함)

      - 포스트 홈 (사이드 바에 포함): `/webtoon/post`

        - 리스트

          - `/webtoon/post/list` === `/webtoon/post/list?genre=ALL` 기본값, 이상한 값이 들어오면 기본값으로 취급한다.
          - `/webtoon/post/list` === `/webtoon/post/list?sort=LATEST` 기본값, 이상한 값이 들어오면 기본값으로 취급한다.
          - `/webtoon/post/list` === `/webtoon/post/list?page=1` 기본값, 이상한 값이 들어오면 기본값으로 취급한다.

      - 시리즈 홈 (사이드 바에 포함): `/webtoon/series`
        - 리스트
          - 포스트 리스트랑 똑같음

    - 채널 홈: `/@channelId`
    - 프로필 홈: `/profile/profileId`

  - layout: setting sidebar `/setting`

- layout(아마 page.tsx에서 구현할 듯): webtoon viewer header, footer `/@channelId/webtoon/post/postId`
- layout(아마 page.tsx에서 구현할 듯): webnovel viewer header, footer
- layout(아마 page.tsx에서 구현할 듯): webtoon editor: `/editor/@channelId/webtoon`, `/editor/@channelId/webtoon/postId`
- layout(아마 page.tsx에서 구현할 듯): webnovel editor: `/editor/@channelId/webnovel`, `/editor/@channelId/webnovel/postId`

- layout: studio header & sidebar: `/studio/@channelId`
