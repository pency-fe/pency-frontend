export function zodArray<T>(arr: T[]): [T, ...T[]] {
  return arr as [T, ...T[]];
}
