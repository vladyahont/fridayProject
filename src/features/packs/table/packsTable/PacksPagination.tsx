import React, {useEffect} from 'react'

import TablePagination from '@mui/material/TablePagination'
import {useAppDispatch, useAppSelector} from "../../../../app/store";
import {cardPacksTotalCountSelector} from "../../../../app/selectors";
import {searchPackAC} from "../../packs-reducer";
import {useSearchParams} from "react-router-dom";


type PaginationPropsType = {
  setEmptyRow: (emptyRows:number) => void
}

export const PacksPagination = ({setEmptyRow}:PaginationPropsType) => {
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams();
  const params = Object.fromEntries(searchParams);

  const cardPacksTotalCount = useAppSelector(cardPacksTotalCountSelector)

  const page = Number(searchParams.get('page') || 1)
  const rowsPerPage = Number(searchParams.get('pageCount') || 5)

  const handleChangePage = (event: unknown, newPage: number) => {
    dispatch(searchPackAC({page: newPage + 1}))
    setSearchParams({...params, page: newPage + 1});
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const pageCount = parseInt(event.target.value)
    dispatch(searchPackAC({pageCount: pageCount, page: 1}))
    setSearchParams({...params, pageCount: pageCount});

  };

  useEffect(() => {
   setEmptyRow(page === Math.floor(cardPacksTotalCount / rowsPerPage) + 1 ?
     rowsPerPage - (cardPacksTotalCount % rowsPerPage)
     : 0)
  }, [cardPacksTotalCount,rowsPerPage,page])

  return (
    <TablePagination
      component="div"
      count={cardPacksTotalCount}
      page={page - 1}
      onPageChange={handleChangePage}
      rowsPerPageOptions={[5, 10, 15]}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      showFirstButton
      showLastButton
    />
  );
};

