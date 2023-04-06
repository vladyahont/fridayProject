import React, {useEffect, useState} from 'react';
import {TableContent} from "./components/TableContent";
import {useAppDispatch, useAppSelector} from "../../../../app/store";
import {cardsSelector} from "../../../../app/selectors";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {useAppIsLoading} from "../../../../app/useAppIsLoading";
import {HeaderType} from "../../../components/headTable/typesTable";
import {searchPackAC} from "../../packs-reducer";
import {useSearchParams} from "react-router-dom";
import {setSearchParamsCardsAC} from "../cards-reducer";
import {loginTC} from "../../../auth/auth-reducer";
import {useTableDescAcsFilter} from "./useTableDescAcsFilter";

type TableDataType = {
  question: string
  answer: number
  updated: string
  grade: string
}
const headCells: HeaderType<TableDataType>[] = [
  {
    id: 'question',
    label: 'Question',
    sortable:true,
  },
  {
    id: 'answer',
    label: 'Answer',
    sortable:true,
  },
  {
    id: 'updated',
    label: 'Last Updated',
    sortable:true,
  },
  {
    id: 'grade',
    label: 'Grade',
    sortable:true,
  },
];
type Order = 'asc' | 'desc'
export const CardsTable = () => {

  const isLoading = useAppIsLoading()
  const cards = useAppSelector(cardsSelector)

  const {orderBy,order,handleRequestSort} = useTableDescAcsFilter<TableDataType>("sortCards",setSearchParamsCardsAC)

  const rowCards = cards.map( card => <TableRow hover key={card._id}>
    <TableCell>{card.question} </TableCell>
    <TableCell>{card.answer} </TableCell>
    <TableCell>{card.created} </TableCell>
    <TableCell>{card.grade} </TableCell>
    </TableRow>
  )
  return (
     <TableContent
       orderBy={orderBy}
       order={order}
       onRequestSort={handleRequestSort}
       headCells = {headCells}
       isLoading={isLoading}
       pageCount={8}
       emptyRows={3}>
       {rowCards}
     </TableContent>
  );
};

