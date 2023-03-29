import React from 'react';
import {getComparator, stableSort} from "../tableUtils";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton/IconButton";
import SchoolIcon from "@mui/icons-material/School";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import TableBody from "@mui/material/TableBody"
import {Order} from "../typesTable";
import {TableDataType} from "./PacksTable";
import {useAppSelector} from "../../../../app/store";
import {userNameSelector} from "../../../../app/selectors";


type Props ={
  order:Order,
  orderBy:keyof TableDataType,
  emptyRows:number,
  rows: TableDataType[]
}
export const PacksTableBody = ({
                                 order,
                                 orderBy,
                                 emptyRows,
                                 rows,
                               }:Props) => {
  const myName = useAppSelector(userNameSelector)
  return (
    <TableBody>
      {stableSort(rows, getComparator(order, orderBy))
        .map((row, index) => <>
          <TableRow hover tabIndex={-1} key={row.name}>
            <TableCell component="th" id={`enhanced-table-checkbox-${index}`} scope="row" padding="none">{row.name}</TableCell>
            <TableCell align="left">{row.cardsCount}</TableCell>
            <TableCell align="left">{row.updated}</TableCell>
            <TableCell align="left">{row.user_name}</TableCell>
            {row.name === myName
              ? <TableCell align="left">
                <IconButton onClick={() => {
                  console.log('alalala')
                }}><SchoolIcon/></IconButton>
                <IconButton><EditIcon/></IconButton>
                <IconButton><HighlightOffIcon/></IconButton>
              </TableCell>
              : <TableCell align="left">
                <IconButton>
                  <SchoolIcon/>
                </IconButton>
              </TableCell>
            }
          </TableRow>
        </>)
      }
      {emptyRows > 0 && (
        <TableRow style={{height: (53) * emptyRows,}}>
          <TableCell colSpan={6}/>
        </TableRow>
      )}
    </TableBody>
  );
};

