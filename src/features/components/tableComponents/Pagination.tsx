import React, {ChangeEvent} from "react";
import TablePagination from "@mui/material/TablePagination";

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

