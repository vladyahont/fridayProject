import React from 'react';
import {Paper} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import {HeaderType} from "../headTable/typesTable";
import {MyTableHead, Order} from "./MyTableHead";
import {TableSkeleton} from "../tableSkeleton/TableSkeleton";

type PropsTableContent<D> = {
  headCells: HeaderType<D>[],
  children: JSX.Element,
  pageCount?: number,
  isLoading: boolean,
  onRequestSort: (property: keyof D) => void,
  order:Order,
  orderBy: keyof D,
}

export const TableContent = <D extends unknown>({
                                                  isLoading,
                                                  children,
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
         {/*   {isLoading || emptyRows && <EmptyRows countRow={emptyRows} countColum={6} sxRow={{height: "60px"}}/>}*/}
            {isLoading && <TableSkeleton countRow={pageCount} countColum={6} sxRow={{height: "60px"}}/>}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};


