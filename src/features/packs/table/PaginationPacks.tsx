import React from 'react'

import TablePagination from '@mui/material/TablePagination'
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {cardPacksTotalCountSelector} from "../../../app/selectors";
import {searchPackAC} from "../packs-reducer";
import {useSearchParams} from "react-router-dom";


type PaginationPropsType = {
  setEmptyRow: (emptyRows:number) => void
}

export const PaginationPacks = ({setEmptyRow}:PaginationPropsType) => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams();
  const params = Object.fromEntries(searchParams);


  const page = Number(searchParams.get('page') || 1)
  const rowsPerPage = Number(searchParams.get('pageCount') || 5)
  const cardPacksTotalCount = useAppSelector(cardPacksTotalCountSelector)

  const handleChangePage = (event: unknown, newPage: number) => {
    dispatch(searchPackAC({page: newPage}))
    setSearchParams({...params, page: newPage});
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const pageCount = parseInt(event.target.value)
    setSearchParams({...params, pageCount: pageCount});
    dispatch(searchPackAC({pageCount: pageCount,page: 1}))
    const emptyRows =
      page === Math.floor(cardPacksTotalCount/rowsPerPage) ?  rowsPerPage - (cardPacksTotalCount % rowsPerPage) : 0;
    setEmptyRow(emptyRows)
  };

  return (
    <TablePagination
      component="div"
      count={cardPacksTotalCount}
      page={page == 1 ? 0 : page - 1}
      onPageChange={handleChangePage}
      rowsPerPageOptions={[5, 10, 15]}
      rowsPerPage={rowsPerPage}
      labelRowsPerPage={"test"}
      onRowsPerPageChange={handleChangeRowsPerPage}
      showFirstButton
      showLastButton
    />
  );
};

