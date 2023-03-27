import React, {useState} from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import {packsSelector} from "../../../app/selectors";
import {useAppSelector} from "../../../app/store";
import {EnhancedTableHead, HeaderType} from "./PackHeadTable";

type PackColum = {
  name: string
  cards: string
  lastUpdated: string
  createdBy: string
  action: string
}

const headCells: HeaderType<PackColum>[] = [
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

export const PackTable = () => {



  const [sortBuff,setSortBuff] = useState("")


  return (
    <div>
      <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">

            <EnhancedTableHead headCells={headCells}
                               sortBy ={"name"}
                               sortOrderStart={"0"}
                               setSort={setSortBuff}/>

          </Table>
      </TableContainer>
    </div>
  );
};

