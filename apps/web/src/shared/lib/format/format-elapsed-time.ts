import dayjs from "dayjs";

export function formatElapsedTime(second: number) {
  const now = dayjs.utc().unix();

  const secondDiff = now - second;

  if (secondDiff < 60) {
    return `${secondDiff}초 전`;
  } else if (secondDiff < 3600) {
    return `${Math.floor(secondDiff / 60)}분 전`;
  } else if (secondDiff < 86400) {
    return `${Math.floor(secondDiff / 3600)}시간 전`;
  } else if (secondDiff < 604800) {
    return `${Math.floor(secondDiff / 86400)}일 전`;
  }

  return dayjs.unix(second).format("YY-MM-DD");
}
