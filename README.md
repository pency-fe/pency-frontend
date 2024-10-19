# Pency Frontend

## 프로젝트 구조

### pency-web

- `app`
  - `_api`: 외부 통신을 위한 query, mutation 함수를 작성합니다.
  - `_components`: `@pency/ui/components`에 ui와 관련된 데이터와 로직을 추가시킨 컴포넌트를 작성합니다.
  - `_route`: `(route)`의 라우트 구조를 기반으로 하여 `layout`, `page`를 작성합니다. `layout.tsx` 파일에서는 어플 여부에 따라 렌더링될 컴포넌트를 다르게 작성할 수 있습니다.
  - `(route)`: 라우트 구조를 작성합니다.

### @pency/ui

### @pency/util
