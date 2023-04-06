import React from 'react';
import {TableContent} from "./components/TableContent";
import {useAppSelector} from "../../../../app/store";
import {cardsSelector} from "../../../../app/selectors";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {useAppIsLoading} from "../../../../app/useAppIsLoading";

export const CardsTable = () => {
  const isLoading = useAppIsLoading()
  const cards = useAppSelector(cardsSelector)


  const rowCards = cards.map( card => <TableRow hover key={card._id}>
    <TableCell>{card.question} </TableCell>
    <TableCell>{card.answer} </TableCell>
    <TableCell>{card.created} </TableCell>
    <TableCell>{card.grade} </TableCell>
    </TableRow>
  )
  return (
     <TableContent isLoading={isLoading} pageCount={8} emptyRows={3}>
       {rowCards}
     </TableContent>
  );
};

