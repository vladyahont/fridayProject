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
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {getPacksTC} from "../packs-reducer";
import {cardPacksTotalCountSelector} from "../../../app/selectors";

export type TableDataType = {
  name: string
  cards: number
  lastUpdated: string
  createdBy: string
  action: 'learn' | 'edit' | 'delete'
}

export function createData(
  name: string,
  cards: number,
  lastUpdated: string,
  createdBy: string,
  action: 'learn' | 'edit' | 'delete',
): TableDataType {
  return {
    name,
    cards,
    lastUpdated,
    createdBy,
    action,
  };
}



type Order = 'asc' | 'desc';



interface HeadCell {
  disablePadding: boolean;
  id: keyof TableDataType;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
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
    label: 'Cards',
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

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof TableDataType) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {order, orderBy, rowCount, onRequestSort} =
    props;
  const createSortHandler =
    (property: keyof TableDataType) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            // align={headCell.numeric ? 'right' : 'left'}
            align={'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
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

export default function EnhancedTable(props: {rows: TableDataType[] }) {
  const [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams();
  const params = Object.fromEntries(searchParams);

  const cardPacksTotalCount = useAppSelector(cardPacksTotalCountSelector)
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof TableDataType>('name');
  //const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(Number(searchParams.get("page")) || 0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(Number(searchParams.get("pageCount")) || 5);
  const dispatch = useAppDispatch();


  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof TableDataType,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    setSearchParams({ ...params, page:newPage });
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {

    const pageCount = parseInt(event.target.value)
    setRowsPerPage(pageCount);
    setSearchParams({ ...params,  pageCount:pageCount });
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  //const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.rows.length) : 0;

  return (
    <Box sx={{width: '100%'}}>
      <Paper sx={{width: '100%', mb: 2}}>
        <TableContainer>
          <Table
            sx={{minWidth: 750, textAlign: 'center'}}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead rowCount={props.rows.length + 1}
                               onRequestSort={handleRequestSort}
                               order={order}
                               orderBy={orderBy}
            />
            <TableBody>
              {stableSort(props.rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <>
                      <TableRow
                        hover
                        //onClick={(event) => handleClick(event, row.name)}
                        // role="checkbox"
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
                        <TableCell align="left">{row.action}</TableCell>
                      </TableRow>
                    </>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6}/>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={cardPacksTotalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}