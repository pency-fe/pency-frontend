"use client";

export function SeriesPage() {
  return Array.from({ length: 100 }).map((v, i) => <p key={i}>webnovel series</p>);
}
