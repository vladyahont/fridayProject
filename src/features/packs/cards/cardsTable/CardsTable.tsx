import React from 'react';
import {useAppSelector} from "../../../../app/store";
import {
  cardsSelector,
  cardsTotalCountSelector,
  getCardsPageCountParamsSelector,
  getCardsPageParamsSelector
} from "../../../../app/selectors";
import {useAppIsLoading} from "../../../../hooks/useAppIsLoading";
import {setSearchParamsCardsAC} from "../cards-reducer";
import {useTableDescAcsFilter} from "./useTableDescAcsFilter";
import {usePagination} from "./usePagination";
import {Pagination} from "../../../components/tableComponents/Pagination";
import {TableContent} from "../../../components/tableComponents/TableContent";
import {CardTableRow} from "./CardTableRow";

import {HeaderType} from "../../../components/headTable/typesTable";


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

export const CardsTable = () => {

  const isLoading = useAppIsLoading()
  const cards = useAppSelector(cardsSelector)

  const {orderBy, order, handleRequestSort} =
    useTableDescAcsFilter<TableDataType>("sortCards", setSearchParamsCardsAC)

  const {onChange, onChangePageCount, totalCount, rowsPerPage, page}
    = usePagination(
    cardsTotalCountSelector, getCardsPageCountParamsSelector,
    getCardsPageParamsSelector, setSearchParamsCardsAC)

  const rowCards = cards.map((card) =>
    <CardTableRow _id={card._id} question={card.question} answer={card.answer}
                  created={card.created} grade={card.grade}/>
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
        page={page}
        totalCount={totalCount}
        onChange={onChange}
        onChangePageCount={onChangePageCount}
      />
    </>
  );
};


