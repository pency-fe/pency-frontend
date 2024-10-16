"use client";

export default function Page() {
  return Array.from({ length: 100 }).map((v, i) => <p key={i}>home</p>);
}
