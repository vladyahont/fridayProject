import React from 'react';

import {
  cardPageCountParamsSelector,
  cardPageParamsSelector,
  cardsSelector,
  cardTotalCountSelector
} from "../cardSelector";
import {useAppIsLoading} from "../../../../hooks/useAppIsLoading";
import {useAppSelector} from "../../../../app/store";
import {setSearchParamsCardsAC} from "../cards-reducer";
import {useTableDescAcsFilter} from "../../../components/tableComponents/hooksTable/useTableDescAcsFilter";
import {usePagination} from "../../../components/tableComponents/hooksTable/usePagination";
import {CardTableRow} from "./CardTableRow";
import {TableContent} from "../../../components/tableComponents/TableContent";
import {Pagination} from "../../../components/tableComponents/Pagination";
import {HeaderType} from "../../../components/headTable/typesTable";

export const CardsTable = () => {

  const isLoading = useAppIsLoading()
  const cards = useAppSelector(cardsSelector)

  const {orderBy, order, handleRequestSort} =
    useTableDescAcsFilter<TableDataType>(
      "sortCards", setSearchParamsCardsAC)

  const {onChange, onChangePageCount, totalCount, rowsPerPage, page}
    = usePagination(
    cardTotalCountSelector,
    cardPageCountParamsSelector,
    cardPageParamsSelector,
    setSearchParamsCardsAC)

  const rowCards = cards.map((card) =>
    <CardTableRow key = {card._id}
                  _id={card._id}
                  question={card.question}
                  answer={card.answer}
                  created={card.created}
                  grade={card.grade}/>
  )
  return (
    <>
      <TableContent
        orderBy={orderBy}
        order={order}
        onRequestSort={handleRequestSort}
        headCells={headCells}
        isLoading={isLoading}
        pageCount={rowsPerPage}>
        {rowCards}
      </TableContent>
      <Pagination
        disabled={isLoading}
        rowsPerPage={rowsPerPage}
        page={page || 0}
        totalCount={totalCount}
        onChange={onChange}
        onChangePageCount={onChangePageCount}
      />
    </>
  );
};


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
    sortable: true,
  },
  {
    id: 'answer',
    label: 'Answer',
    sortable: true,
  },
  {
    id: 'updated',
    label: 'Last Updated',
    sortable: true,
  },
  {
    id: 'grade',
    label: 'Grade',
    sortable: true,
  },
];
