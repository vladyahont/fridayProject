import React, {ReactNode, useState} from 'react';
import {Paper} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import {TableSkeleton} from "../../../../components/tableSkeleton/TableSkeleton";
import {EmptyRows} from "../../../../components/emptyRows/EmptyRows";
import {HeaderType} from "../../../../components/headTable/typesTable";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import {visuallyHidden} from "@mui/utils";
import Box from "@mui/material/Box";
import TableHead from "@mui/material/TableHead";


type PropsTableContent<D> = {
  headCells: HeaderType<D>[],
  children?: JSX.Element[],

  pageCount?: number,
  emptyRows?: number,
  isLoading: boolean,
  onRequestSort: (property: keyof D) => void,
  order:Order,
  orderBy: keyof D,
}

export const TableContent = <D extends unknown>({
                                                  isLoading,
                                                  children,
                                                  emptyRows,
                                                  pageCount,
                                                  headCells,
                                                  onRequestSort,
                                                  order,
                                                  orderBy,
                                                }: PropsTableContent<D>) => {
  return (
    <Paper sx={{width: '100%', mb: 2}}>
      <TableContainer>
        <Table sx={{minWidth: 800}} size={'medium'}>
          <MyTableHead headCells={headCells}
                       onRequestSort={onRequestSort}
                       order={order}
                       orderBy={orderBy}
                       disabled ={isLoading}/>
          <TableBody sx={{height: 'inherit'}}>
            {isLoading || children}
            {isLoading || emptyRows && <EmptyRows countRow={emptyRows} countColum={6} sxRow={{height: "60px"}}/>}
            {isLoading && <TableSkeleton countRow={pageCount} countColum={6} sxRow={{height: "60px"}}/>}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};


type Order = 'asc' | 'desc'


type MyTableHeadProps<D> = {
  headCells: HeaderType<D>[],
  order: Order,
  orderBy: keyof D,
  onRequestSort: (property: keyof D) => void;
  disabled: boolean
}

const MyTableHead = <D extends unknown>({
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
