import * as React from "react";

export type TableDataType = {
  name: string
  cards: number
  lastUpdated: string
  createdBy: string
  action: 'learn' | 'edit' | 'delete'
}


interface HeadCell {
  disablePadding: boolean;
  id: keyof TableDataType;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'cards',
    numeric: true,
    disablePadding: false,
    label: 'Cards',
  },
  {
    id: 'lastUpdated',
    numeric: false,
    disablePadding: false,
    label: 'Last Updated',
  },
  {
    id: 'createdBy',
    numeric: false,
    disablePadding: false,
    label: 'Created By',
  },
  {
    id: 'action',
    numeric: false,
    disablePadding: false,
    label: 'Actions',
  },
];







export type Order = 'asc' | 'desc';

