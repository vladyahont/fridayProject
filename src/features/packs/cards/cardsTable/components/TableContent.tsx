import React, {ReactNode} from 'react';
import {Paper} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import {TableSkeleton} from "../../../../components/tableSkeleton/TableSkeleton";
import {EmptyRows} from "../../../../components/emptyRows/EmptyRows";


type PropsTableContent = {
  pageCount?: number,
  emptyRows?: number,
  isLoading: boolean
  children?: JSX.Element[]
}

export const TableContent = ({
                               isLoading,
                               children,
                               emptyRows,
                               pageCount
                             }: PropsTableContent) => {
  return (
    <Paper sx={{width: '100%', mb: 2}}>
      <TableContainer>
        <Table sx={{minWidth: 800}} size={'medium'}>
          <TableBody sx={{height: 'inherit'}}>
            {isLoading || children}
            {isLoading || emptyRows && <EmptyRows countRow={emptyRows} countColum={6} sxRow={{height:"60px"}}/>}
            {isLoading && <TableSkeleton countRow={pageCount} countColum={6}  sxRow={{height:"60px"}}/>}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
