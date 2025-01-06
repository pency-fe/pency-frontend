"use client";

// [TODO] [현지]
/**
 * 카드의 라벨 순서 바꾸기
 * - header가 필요하다. 왼쪽에는 back, 오른쪽은 북마크(=선호작품), 알림, 더보기
 * - Grid 사용한다.
 *  - 데스크탑: 왼쪽(position: sticky) 오른쪽 덩어리
 *  - 모바일: 위(position: static) 아래 덩어리
 * - 왼쪽 덩어리 (상하좌우 패딩)
 *  - Stack
 *    - 시리즈 썸네일(연령)
 *    - 시리즈 정보(제목, 채널명, 연재/15화, 조회수, 좋아요수, 댓글수, 아코디언(시리즈 정보: 창작유형, 페어, 장르, 설명, 태그))
 *    - 버튼 한개 또는 두개 (첫 화 보기/EP.1 다시보기, 다음 화 보기)
 *    - [참고]
 *    - 자신의 시리즈일 경우 버튼 한개만 존재한다. (신규회차 등록)
 * - 오른쪽 덩어리 (상하좌우 패딩)
 *  - 한 줄: 왼쪽은 선택 구매(버튼), 오른쪽은 최신순, 첫화부터(필터칩) -> 높이나 폰트사이즈가 다르다? 그러면 찬우한테 전화
 *  - Stack
 *    - listItemx (18개)
 *    - 맨 밑에 (페이지네이션)
 *
 */
export const ChannelUrlWebtoonSeriesPage = () => {
  // 여기 부분은 구조 잡는 부분 (Grid)
  return <h1>[TODO][현지]</h1>;
};

const Header = () => {
  // AppBar
};

const SeriesSection = () => {
  // Stack
};

const EpisodeSection = () => {
  // Stack
};
