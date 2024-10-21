# Pency Frontend

## 프로젝트 구조

### pency-web

- `app`
  - `_api`: 외부 통신을 위한 query, mutation 함수를 생성합니다.
  - `_components`
    - `ui`: `@pency/ui/components`를 확장시킨 컴포넌트
      1. 컴포넌트를 생성합니다. 컴포넌트 이름은 `[WT | WN | CM | GS]_[Post | Series | ...]_OverviewCard` 이며, 단일 컴포넌트 형식으로 작성합니다.
      2. ui와 관련된 데이터를 props로 받고 그 데이터로 인해 달라지는 ui 부분을 작성합니다.
      3. 비즈니스 로직과 mutation 부분을 작성합니다.
      4. 구현할 수 없는 로직은 `onClick`, `onChange` 같이 직관적인 이름으로 props를 추가한 다음 실행될 부분에 함수 호출을 작성합니다. **이 단계는 주의가 필요합니다. 정말 필요한지 다시 생각해 보길 바랍니다. 항상 틀렸다는 것이 아니라 현재 구현중인 컴포넌트 자체가 틀릴 확률이 높다는 것입니다. 왜 이 컴포넌트를 만드려는지, boundary 컴포넌트가 아닌지 다시 생각해 보길 바랍니다.**
    - `boundary`: 에러 바운더리를 기준으로 작성한 컴포넌트
      1.  컴포넌트를 생성합니다. 컴포넌트 이름은 `[WT | WN | CM | GS]_[Post | Series | ...]_XXX` 이며, 컴파운드 컴포넌트 형식으로 작성합니다.
      2.  ui와 관련된 데이터를 props로 받고
  - `_route`: `(route)`의 라우트 구조를 기반으로 하여 `layout`, `page`를 생성합니다. `layout.tsx` 파일에서는 웹뷰 여부에 따라 렌더링될 컴포넌트를 다르게 작성할 수 있습니다. `page.tsx` 파일에는 section 단위로 작성합니다. **여러 라우트에서 중복된 section을 작성해야 할 때가 있습니다.**
  - `(route)`: 라우트 구조를 작성합니다.

### @pency/ui

### @pency/util
