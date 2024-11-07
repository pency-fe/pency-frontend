"use client";

export default function PostPage() {
  return Array.from({ length: 100 }).map((v, i) => <p key={i}>webtoon post</p>);
}
