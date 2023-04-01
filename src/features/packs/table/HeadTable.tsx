import * as React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import {visuallyHidden} from "@mui/utils";

import {HeaderType, Order} from "./typesTable";

export type EnhancedTableProps<D> = {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof D) => void;
  order: Order;
  orderBy: keyof D;
  disable: boolean,
  headCells: HeaderType<D>[],
}

export const HeadTable = <D extends unknown>({
                                               headCells,
                                               order,
                                               orderBy,
                                               onRequestSort,
                                               disable
                                             }: EnhancedTableProps<D>) => {

  const createSortHandler =
    (property: keyof D) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  const reOrder = order === "0" ? 'asc' : 'desc'

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) =>
          (headCell.sortable) ? <TableCell
              key={headCell.id as string}
              align={'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? reOrder : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? reOrder : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {reOrder === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
            :
            <TableCell>
              {headCell.label}
            </TableCell>)
        }
      </TableRow>
    </TableHead>
  );
}