import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import {PacksPagination} from "./PacksPagination";

import {PacksTableBody} from "./PacksTableBody";
import {PacksHeadTable} from "./PacksHeadTable";


export type TableDataType = {
  name: string | undefined
  cardsCount: number
  user_name: string
  updated: string
  action: 'learn' | 'edit' | 'delete'
}

export function PacksTable() {
  const [emptyRows, setEmptyRows] = React.useState(0);


  return (
    <Box sx={{width: '100%'}}>
      <Paper sx={{width: '100%', mb: 2}}>
        <TableContainer>
          <Table
            sx={{minWidth: 750, textAlign: 'center'}}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
           <PacksHeadTable />
           <PacksTableBody emptyRows={emptyRows}/>
          </Table>
        </TableContainer>
        <PacksPagination setEmptyRow={setEmptyRows}/>
      </Paper>
    </Box>
  );
}

