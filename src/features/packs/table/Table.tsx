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
import {searchPackAC} from "../packs-reducer";
import {cardPacksTotalCountSelector, packsSelector} from "app/selectors";
import SchoolIcon from '@mui/icons-material/School';
import IconButton from '@mui/material/IconButton/IconButton';
import { EditModal } from '../modal/packModals/EditModal';
import {DeleteModal} from "features/packs/modal/packModals/DeleteModal";
import noCover from './../../../assest/imgs/noCover.png'



export type TableDataType = {
    cover: string
    name: string | undefined
    _id: string
    cards: number
    lastUpdated: string
    createdBy: string
    action: 'learn' | 'edit' | 'delete'
}

export function createData(
    cover: string,
    name: string | undefined,
    _id: string,
    cards: number,
    lastUpdated: string,
    createdBy: string,
    action: 'learn' | 'edit' | 'delete',
): TableDataType {
    return {
        cover,
        name,
        _id,
        cards,
        lastUpdated,
        createdBy,
        action,
    };
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string | undefined },
    b: { [key in Key]: number | string | undefined },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

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

interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof TableDataType) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {

    const {order, orderBy, rowCount, onRequestSort} = props;
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

export function EnhancedTable(props: { rows: TableDataType[] }) {
    const [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams();
    const params = Object.fromEntries(searchParams);
    const userInfo = useAppSelector(packsSelector)


    const cardPacksTotalCount = useAppSelector(cardPacksTotalCountSelector)

    console.log(params)

    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof TableDataType>('name');
    //const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
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
        dispatch(searchPackAC({page: newPage}))
        setSearchParams({...params, page: newPage});
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {

        const pageCount = parseInt(event.target.value)
        setRowsPerPage(pageCount);
        setSearchParams({...params, pageCount: pageCount});
        dispatch(searchPackAC({pageCount: pageCount}))

        setPage(0);
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
                                    const rand = (Math.random() + 1).toString(36).substring(7)
                                    return (
                                            <TableRow
                                                hover
                                                //onClick={(event) => handleClick(event, row.name)}
                                                // role="checkbox"
                                                tabIndex={-1}
                                                key={rand}
                                            >
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    padding="none"
                                                >
                                                    <div style={{display:'flex', alignItems:'center'}}>
                                                        <img src={row.cover ? row.cover : noCover} style={{width:'80px', height:'50px', }}/>
                                                        <div style={{marginLeft:'15px'}}>{row.name}</div>
                                                    </div>
                                                </TableCell>
                                                <TableCell align="left">{row.cards}</TableCell>
                                                <TableCell align="left">{row.lastUpdated}</TableCell>
                                                <TableCell align="left">{row.createdBy}</TableCell>
                                                {row.createdBy === userInfo[0].user_name
                                                    ?
                                                        <TableCell align="left">
                                                            <div style={{display:'flex'}}>
                                                            <IconButton>
                                                                <SchoolIcon/>
                                                            </IconButton>
                                                            <EditModal name={row.name} id={row._id} cover={row.cover}/>
                                                            <DeleteModal id={row._id} packName={row.name}/>
                                                            </div>

                                                        </TableCell>
                                                    : <TableCell align="left">
                                                        <IconButton>
                                                            <SchoolIcon/>
                                                        </IconButton>
                                                    </TableCell>
                                                }

                                            </TableRow>
                                    )
                                        ;
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
};