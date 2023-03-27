import * as React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import {visuallyHidden} from "@mui/utils";
import {useState} from "react";

type Order = 'asc' | 'desc';

 export type HeaderType<D> = {
  id: keyof D
  disablePadding: boolean;
  label: string;
  numeric: boolean;
}

export type EnhancedTableProps<D> = {
  headCells: HeaderType<D>[]
  sortBy: string;
  sortOrderStart: string;
  setSort:(sort:string)=>void,
}

export const EnhancedTableHead = <D extends unknown>(
  {
    sortBy,
    sortOrderStart,
    headCells,
    setSort,
    }: EnhancedTableProps<D>) => {

  const [order, setOrder] = useState<Order>(sortOrderStart === '1' ? 'asc' : 'desc')
  const [orderBy, setOrderBy] = useState<keyof D>(sortBy as keyof D)

  const createSortHandler =
    (property: keyof D) => () => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
      setSort((isAsc ? '0' : '1') + property.toString());
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id as string}
            align={'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
