import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {Skeleton, SxProps} from "@mui/material";

type TableSkeletonType = {

  countRow?: number,
  countColum?: number,
  sxRow?: SxProps,
}

export const TableSkeleton = ({countRow = 5, countColum = 6,sxRow}: TableSkeletonType) =>
  <>
    {Array.from(new Array(countRow)).map((item, key) =>
    <TableRow key={key} sx={sxRow}>
      {
        Array.from(new Array(countColum)).map((cell, i) =>
          <TableCell key={i} component="th" scope="row">
            <Skeleton/>
          </TableCell>)
      }
    </TableRow>)}
  </>


