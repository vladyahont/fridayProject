import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useAppSelector} from "app/store";
import {packsSelector, userNameSelector} from "app/selectors";
import SchoolIcon from '@mui/icons-material/School';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import IconButton from '@mui/material/IconButton/IconButton';
import {createDataPacks, getComparator, stableSort} from "../tableUtils";
import {PacksPagination} from "./PacksPagination";
import {Order} from "../typesTable";
import PacksHeadTable from "./PacksHeadTable";


export type TableDataType = {
  name: string | undefined
  cardsCount: number
  user_name: string
  updated: string
  action: 'learn' | 'edit' | 'delete'
}

export function PacksTable() {
  const myName = useAppSelector(userNameSelector)
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
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <>
                      <TableRow
                        hover
                        tabIndex={-1}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.name}
                        </TableCell>
                        <TableCell align="left">{row.cardsCount}</TableCell>
                        <TableCell align="left">{row.updated}</TableCell>
                        <TableCell align="left">{row.user_name}</TableCell>
                        {row.user_name === myName
                          ? <TableCell align="left">
                            <IconButton onClick={() => {
                              console.log('alalala')
                            }}>
                              <SchoolIcon/>
                            </IconButton>
                            <IconButton>
                              <EditIcon/>
                            </IconButton>
                            <IconButton>
                              <HighlightOffIcon/>
                            </IconButton>
                          </TableCell>
                          : <TableCell align="left">
                            <IconButton>
                              <SchoolIcon/>
                            </IconButton>
                          </TableCell>
                        }
                      </TableRow>
                    </>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6}/>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <PacksPagination setEmptyRow={setEmptyRows}/>
      </Paper>
    </Box>
  );
}

