# Pency Frontend

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
