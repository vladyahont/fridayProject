import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {SxProps} from "@mui/material";

type EmptyRowsType = {

  index:number
  countCells: number
  sxRow?: SxProps,
}

export const EmptyRow = ({ countCells,sxRow,index}: EmptyRowsType) => <TableRow  key = {index} sx={sxRow} >
        <TableCell colSpan={countCells}/>
      </TableRow>


