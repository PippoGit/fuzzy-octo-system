type FirstHalf<T extends unknown[]> = T extends [infer F, ...infer M, unknown]
  ? [F, ...FirstHalf<M>]
  : T;

type LastHalf<T extends unknown[]> = T extends [...FirstHalf<T>, ...infer E]
  ? E
  : never;

type Interleave<T extends unknown[], U extends unknown[]> = T extends [
  infer H,
  ...infer R
]
  ? [H, ...Interleave<U, R>]
  : U;

type Shuffle<T extends unknown[]> = Interleave<
  FirstHalf<[...T]>,
  LastHalf<[...T]>
>;

export function shuffle<T extends readonly unknown[]>(
  array: T
): Shuffle<[...T]>;

export function shuffle(array: unknown[]) {
  if (array.length === 0 || array.length === 1) {
    return array.slice();
  }
  const rest = array.slice();
  const middle = rest.splice(Math.ceil(array.length / 2), 1)[0];
  const first = rest.shift();
  return [first, middle, ...shuffle(rest)];
}
