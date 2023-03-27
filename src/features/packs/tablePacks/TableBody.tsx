import React from 'react';
import {TableBody, TableCell, TableRow} from "@mui/material";
import {useAppSelector} from "../../../app/store";
import {packsSelector} from "../../../app/selectors";

const MyTableBody = () => {
  const packs = useAppSelector(packsSelector)
  packs


  return ( {stableSort(packs, getComparator("name", "0"))
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
    })})
 /* return (
      <TableBody>
        { packs.length? packs.map (pack => (
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
          )):
          <div>
            <span>Oppss</span>
          </div>
        }
      </TableBody>
  );*/
};

