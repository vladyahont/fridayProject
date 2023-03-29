import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import {useAppSelector} from "app/store";
import {packsSelector} from "app/selectors";
import {createDataPacks} from "../tableUtils";
import {PacksPagination} from "./PacksPagination";
import {Order} from "../typesTable";
import PacksHeadTable from "./PacksHeadTable";
import {PacksTableBody} from "./PacksTableBody";


export type TableDataType = {
  name: string | undefined
  cardsCount: number
  user_name: string
  updated: string
  action: 'learn' | 'edit' | 'delete'
}

export function PacksTable() {

  const packs = useAppSelector(packsSelector)
  const rows: TableDataType[] = packs
    .map(p => createDataPacks(p.name, p.cardsCount, p.updated, p.user_name, 'learn'))

  const [emptyRows, setEmptyRows] = React.useState(0);
  const [order, setOrder] = React.useState<Order>('0');
  const [orderBy, setOrderBy] = React.useState<keyof TableDataType>('updated');



  return (
    <Box sx={{width: '100%'}}>
      <Paper sx={{width: '100%', mb: 2}}>
        <TableContainer>
          <Table
            sx={{minWidth: 750, textAlign: 'center'}}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
          <PacksHeadTable order = {order} orderBy ={orderBy} setOrder = {setOrder} setOrderBy ={setOrderBy} />
           <PacksTableBody order={order} orderBy={orderBy} emptyRows={emptyRows} rows={rows} />
          </Table>
        </TableContainer>
        <PacksPagination setEmptyRow={setEmptyRows}/>
      </Paper>
    </Box>
  );
}

