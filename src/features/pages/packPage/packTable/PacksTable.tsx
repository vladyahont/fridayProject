import * as React from 'react';

import {cardPacksTotalCountSelector, packPageCountParamsSelector, pageParamsSelector} from "../packSelectors";
import {searchPackAC} from "../packs-reducer";
import {useAppIsLoading} from "../../../../hooks/useAppIsLoading";

import {useTableDescAcsFilter} from "../../../components/tableComponents/hooksTable/useTableDescAcsFilter";
import {TableContent} from "../../../components/tableComponents/TableContent";
import {HeaderType} from "../../../components/headTable/typesTable";
import {Pagination} from "../../../components/tableComponents/Pagination";
import {usePagination} from "../../../components/tableComponents/hooksTable/usePagination";
import {PackTableBody} from "./PackTableBody";

export type TableDataType = {
  name: string | undefined
  cardsCount: number
  user_name: string
  updated: string
  action: 'learn' | 'edit' | 'delete'
}

export function PackTable() {
  const isLoading = useAppIsLoading()

  const {onChange, onChangePageCount, totalCount, rowsPerPage, page}
    = usePagination(
    cardPacksTotalCountSelector,
    packPageCountParamsSelector,
    pageParamsSelector,
    searchPackAC)

  const {orderBy, order, handleRequestSort} =
    useTableDescAcsFilter<TableDataType>(
      "sortPacks", searchPackAC)
  return (
 <>
   <TableContent
     orderBy={orderBy}
     order={order}
     onRequestSort={handleRequestSort}
     headCells={headCells}
     isLoading={isLoading}
     pageCount={rowsPerPage}>
     <PackTableBody />
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
}

const headCells: HeaderType<TableDataType>[] = [
  {
    id: 'name',
    label: 'Name',
    sortable:true,
  },
  {
    id: 'cardsCount',
    label: 'cards',
    sortable:true,
  },
  {
    id: 'updated',
    label: 'Last Updated',
    sortable:true,
  },
  {
    id: 'user_name',
    label: 'Created By',
    sortable:true,
  },
  {
    id: 'action',
    label: 'Actions',
    sortable:false,
  },
];

