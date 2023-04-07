import React from 'react';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

type CardTableRowProps ={
  _id:string,
  question:string,
  answer:string,
  created:string,
  grade:number
}
export const CardTableRow = ({_id,
                               question,
                               answer,
                               created,
                               grade}:CardTableRowProps) => {
  return (
    <TableRow hover key={_id}>
      <TableCell>{question} </TableCell>
      <TableCell>{answer} </TableCell>
      <TableCell>{created} </TableCell>
      <TableCell>{grade} </TableCell>
    </TableRow>
  );
};
