import React from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import {packsSelector} from "../../../app/selectors";
import {useAppSelector} from "../../../app/store";


export const PackTable = () => {

  const packs = useAppSelector(packsSelector)


  return (
    <div>
      <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              {packs?.map (pack => (
                <TableRow key={pack._id} >
                  <TableCell>
                    {pack.name}
                  </TableCell>
                  <TableCell align="left">
                    {pack.cardsCount}
                  </TableCell>
                  <TableCell align="left">
                    {pack.updated}
                  </TableCell>
                  <TableCell align="left">
                    {pack.user_name}
                  </TableCell>
                  <TableCell align="left">
                    action
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      </TableContainer>
    </div>
  );
};

