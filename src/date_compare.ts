export function isMicroSeconds(n: number) {
  return (-100_000_000_000_000 < n && n <= -30_000_000_000) || (100_000_000_000 <= n && n < 100_000_000_000_000);
}
export function dateCompare(l: number, r: number) {
  if (!isMicroSeconds(l) || !isMicroSeconds(r)) throw new Error('date is not micro sec.');
  l = Math.floor(l / 1_000);
  r = Math.floor(r / 1_000);
  return l === r;
}
