import React from 'react';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody"
import {useAppSelector} from "../../../../app/store";
import {appStatusSelector, packsSelector} from "../../../../app/selectors";
import {PackActions} from "./PackActions";


type Props = {
  emptyRows: number,
}
export const PacksTableBody = ({
                                 emptyRows,
                               }: Props) => {
  const packs = useAppSelector(packsSelector)
  const appStatus = useAppSelector(appStatusSelector)
  const isLoading = appStatus === "loading"
  console.log(emptyRows)

  return (
    <TableBody>
      {packs?.map(pack => (
        <TableRow key={pack._id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
          <TableCell
            onClick={() => console.log("tut")}
          >
            {pack.name}
          </TableCell>
          {/*IMG*/}
          <TableCell align="left">{pack.cardsCount}</TableCell>
          <TableCell align="left">{pack.updated.substring(0, 10)}</TableCell>
          <TableCell align="left">{pack.user_name}</TableCell>
          <TableCell align="left">
            <PackActions
              packName={pack.name}
              idUser={pack.user_id}
            />
          </TableCell>
        </TableRow>
      ))
      }
      {emptyRows > 0 && Array(emptyRows).map(()=>
        <TableRow style={{height: (53) * emptyRows,}}>
          <TableCell colSpan={6}/>
          {/*?????*/}
        </TableRow>
      )
      }
    </TableBody>
  );
};


