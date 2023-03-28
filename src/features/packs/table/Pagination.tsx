import React, { FC } from 'react'

import TablePagination from '@mui/material/TablePagination'


type PaginationPropsType = {
  paginationTitle: string
  changeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
  changePage:(event: unknown, newPage: number)=>void
  totalCount: number
  rows: number
  page: number
}

export const SuperPagination: FC<PaginationPropsType> = ({changePage,
                                                           paginationTitle,
                                                           changeRowsPerPage,
                                                           totalCount,
                                                           rows,
                                                           page,
                                                         }) => {


  return (
    <div>

    </div>
  )
}
