
export type Order = '0' | '1';
export type HeaderType<D> = {
  id: keyof D
  numeric: boolean,
  disablePadding: boolean,
  label: string
}


