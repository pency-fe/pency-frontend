"use client";

export function PostPage() {
  return Array.from({ length: 100 }).map((v, i) => <p key={i}>webnovel post</p>);
}
