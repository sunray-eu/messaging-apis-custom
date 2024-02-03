export type MaxLengthArray<
  T,
  MaxLength extends number,
  Arr extends T[] = [],
> = Arr['length'] extends MaxLength
  ? Arr
  : Arr | MaxLengthArray<T, MaxLength, [T, ...Arr]>;
