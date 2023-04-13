import React from 'react';

import {cardPageCountParamsSelector, cardPageParamsSelector, cardTotalCountSelector} from "../cardSelector";
import {useAppIsLoading} from "../../../../hooks/useAppIsLoading";
import {searchCardsAC} from "../cards-reducer";
import {useTableDescAcsFilter} from "../../../components/tableComponents/hooksTable/useTableDescAcsFilter";
import {usePagination} from "../../../components/tableComponents/hooksTable/usePagination";
import {TableContent} from "../../../components/tableComponents/TableContent";
import {Pagination} from "../../../components/tableComponents/Pagination";
import {HeaderType} from "../../../components/headTable/typesTable";
import {CardTableBody} from "./CardTableBody";

export const CardsTable = () => {

  const isLoading = useAppIsLoading()


  const {orderBy, order, handleRequestSort} =
    useTableDescAcsFilter<TableDataType>("sortCards", searchCardsAC)

  const {onChange, onChangePageCount, totalCount, rowsPerPage, page}
    = usePagination(
    cardTotalCountSelector,
    cardPageCountParamsSelector,
    cardPageParamsSelector,
    searchCardsAC)

  return (
    <>
      <TableContent
        orderBy={orderBy}
        order={order}
        onRequestSort={handleRequestSort}
        headCells={headCells}
        isLoading={isLoading}
        pageCount={rowsPerPage}>
        <CardTableBody />
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
