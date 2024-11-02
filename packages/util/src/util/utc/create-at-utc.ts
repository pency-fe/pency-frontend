import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";

dayjs.extend(utc);
dayjs.extend(relativeTime);

export function createdAtUTC(second: number) {
  const createdAtUTCSecond = second; // UTC 기준 게시물 등록된 시간
  const createdAtUTC = dayjs.utc(createdAtUTCSecond * 1000); // 게시물 등록된 시간 밀리초로 변환

  const nowUTC = dayjs.utc(); // UTC 기준 현재 시간

  const timeDifference = nowUTC.diff(createdAtUTC, "second"); // 현재 시간과 등록된 시간 초 단위 차이

  let relativeTimeString;

  if (timeDifference < 60) {
    relativeTimeString = `${relativeTimeString}초 전`;
  } else if (timeDifference < 3600) {
    relativeTimeString = `${Math.floor(timeDifference / 60)}분 전`;
  } else if (timeDifference < 86400) {
    relativeTimeString = `${Math.floor(timeDifference / 3600)}시간 전`;
  } else if (timeDifference < 604800) {
    relativeTimeString = `${Math.floor(timeDifference / 25200)}일 전`;
  } else {
    relativeTimeString = createdAtUTC.format("YYYY-MM-DD");
  }

  return relativeTimeString;
}
