
import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {Skeleton, SxProps} from "@mui/material";

type EmptyRowsType = {
  countRow: number
  countColum: number
  sxRow?: SxProps,
}

export const EmptyRows = ({countRow, countColum,sxRow}: EmptyRowsType) =>
  <>
    {Array.from(new Array(countRow)).map((item, key) =>
      <TableRow key={key} sx={sxRow} >
        <TableCell colSpan={countColum}/>
      </TableRow>)}
  </>


