import React, {ChangeEvent} from 'react';
import {TableContent} from "./components/TableContent";
import {useAppSelector} from "../../../../app/store";
import {
  cardsSelector,
  cardsTotalCountSelector,
  getCardsPageCountParamsSelector,
  getCardsPageParamsSelector
} from "../../../../app/selectors";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {useAppIsLoading} from "../../../../hooks/useAppIsLoading";
import {HeaderType} from "../../../components/headTable/typesTable";
import {setSearchParamsCardsAC} from "../cards-reducer";
import {useTableDescAcsFilter} from "./useTableDescAcsFilter";
import TablePagination from "@mui/material/TablePagination";
import {usePagination} from "./usePagination";


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

  const {orderBy, order, handleRequestSort} = useTableDescAcsFilter<TableDataType>("sortCards", setSearchParamsCardsAC)

  const {onChange, onChangePageCount, totalCount, rowsPerPage, page,emptyRows}
    = usePagination(cardsTotalCountSelector,getCardsPageCountParamsSelector,
    getCardsPageParamsSelector,setSearchParamsCardsAC)

  const rowCards = cards.map((card) =>
      <TableRow hover key={card._id}>
        <TableCell>{card.question} </TableCell>
        <TableCell>{card.answer} </TableCell>
        <TableCell>{card.created} </TableCell>
        <TableCell>{card.grade} </TableCell>
      </TableRow>
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
        disabled = {isLoading}
        rowsPerPage = {rowsPerPage}
        page={page}
        totalCount={totalCount}
        onChange = {onChange}
        onChangePageCount = {onChangePageCount}
      />
    </>

  );
};


type PaginationType = {
  page: number
  rowsPerPage: number
  totalCount: number
  disabled: boolean
  onChange: (page: number) => void
  onChangePageCount: (pageCount: number) => void
}

export const Pagination = ({
                             onChange,
                             page,
                             rowsPerPage,
                             onChangePageCount,
                             totalCount,
                             disabled,
                           }: PaginationType) => {

  const isDisabled = Math.ceil(totalCount / rowsPerPage) - 1 == page || page <= -1
  const handleChangePage = (event: unknown, newPage: number) => {
    onChange(newPage)
  }
  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChangePageCount(Number(event.target.value))
    console.log(Number(event.target.value))
  }
  return (
    <TablePagination
      component="div"
      count={totalCount}
      page={page > 0 && totalCount < rowsPerPage ? 0 : page}
      rowsPerPageOptions={[5, 10, 15]}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      backIconButtonProps={{disabled: page == 0}}
      nextIconButtonProps={{disabled: isDisabled}}
      showFirstButton
      showLastButton
      hidden={!totalCount}
    />
  )
}

