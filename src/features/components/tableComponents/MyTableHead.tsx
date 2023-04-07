import {HeaderType} from "../headTable/typesTable";
import React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import {visuallyHidden} from "@mui/utils";

export type Order = 'asc' | 'desc'


type MyTableHeadProps<D> = {
  headCells: HeaderType<D>[],
  order: Order,
  orderBy: keyof D,
  onRequestSort: (property: keyof D) => void;
  disabled: boolean
}

export const MyTableHead = <D extends unknown>({
                                          headCells,
                                          onRequestSort,
                                          disabled,
                                          order,
                                          orderBy,
                                        }: MyTableHeadProps<D>) => {
  const createSortHandler = (property: keyof D) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells?.map(headCell =>
          (headCell.sortable) ? <TableCell
              key={headCell.id as string}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              {headCell.id === 'empty' ? (
                headCell.label
              ) : (
                <TableSortLabel
                  disabled={disabled}
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
              )}
            </TableCell> :
            <TableCell key={headCell.id as string}>
              {headCell.label}
            </TableCell>
        )}
      </TableRow>
    </TableHead>
  )
}
