import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import {visuallyHidden} from '@mui/utils';
import {useSearchParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "app/store";
import {searchPackAC} from "../../packs-reducer";
import {cardPacksTotalCountSelector, maxCardsCountSelector, packsSelector} from "app/selectors";
import SchoolIcon from '@mui/icons-material/School';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import IconButton from '@mui/material/IconButton/IconButton';
import {createData, getComparator, stableSort} from "../tableUtils";
import {PacksPagination} from "./PacksPagination";
import {Order} from "../typesTable";
import {HeaderType, HeadTable} from "../HeadTable";


export type TableDataType = {
  name: string | undefined
  cards: number
  lastUpdated: string
  createdBy: string
  action: 'learn' | 'edit' | 'delete'
}

export function PacksTable() {
  const dispatch = useAppDispatch();


  const [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams();
  const params = Object.fromEntries(searchParams);


  const userName = useAppSelector(packsSelector)

  const packs = useAppSelector(packsSelector)
  const rows: TableDataType[] = packs
    .map(p => createData(p.name, p.cardsCount, p.updated, p.user_name, 'learn'))


  const [order, setOrder] = React.useState<Order>('0');
  const [orderBy, setOrderBy] = React.useState<keyof TableDataType>('name');


  console.log(order+orderBy)
  const [dense, setDense] = React.useState(false);
  const [emptyRows, setEmptyRows] = React.useState(0);




  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof TableDataType,
  ) => {
    const isAsc = orderBy === property && order === '0';
    setOrder(isAsc ? '1' : '0');
    setOrderBy(property);
  };


  return (
    <Box sx={{width: '100%'}}>
      <Paper sx={{width: '100%', mb: 2}}>
        <TableContainer>
          <Table
            sx={{minWidth: 750, textAlign: 'center'}}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <HeadTable  headCells={headCells}
                        onRequestSort={handleRequestSort}
                        order={order}
                        orderBy={orderBy}
            />
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
                        <TableCell align="left">{row.cards}</TableCell>
                        <TableCell align="left">{row.lastUpdated}</TableCell>
                        <TableCell align="left">{row.createdBy}</TableCell>
                        {row.createdBy === userName[0].user_name
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

const headCells: HeaderType<TableDataType>[] = [
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
    label: 'cards',
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
