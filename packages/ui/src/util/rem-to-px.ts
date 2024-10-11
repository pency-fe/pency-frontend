/**
 * Converts rem to px
 */
export function remToPx(value: string): number {
  return Math.round(parseFloat(value) * 16);
}
