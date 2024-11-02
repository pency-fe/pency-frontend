import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(utc);
dayjs.extend(relativeTime);

export function formatRelativeTimeFromUTC(second: number) {
  const now = dayjs.utc(); // 현재 UTC 시간
  const to = dayjs.utc(second * 1000); // 밀리초로 변환 후 UTC 시간 계산

  const secondDiff = now.diff(to, "second"); // 초 단위 차이

  if (secondDiff < 60) {
    return `${secondDiff}초 전`;
  } else if (secondDiff < 3600) {
    return `${Math.floor(secondDiff / 60)}분 전`;
  } else if (secondDiff < 86400) {
    return `${Math.floor(secondDiff / 3600)}시간 전`;
  } else if (secondDiff < 604800) {
    return `${Math.floor(secondDiff / 25200)}일 전`;
  }

  return to.format("YY-MM-DD");
}
