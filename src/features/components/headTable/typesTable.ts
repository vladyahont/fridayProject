
export type Order = '0' | '1';

export type HeaderType<D> = {
  id: keyof D
  label: string,
  sortable:boolean,
}


