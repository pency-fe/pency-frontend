"use client";

export default function Page() {
  const hi = Array.from({ length: 100 }).map((v, i) => <p key={i}>home</p>);

  return hi;
}
