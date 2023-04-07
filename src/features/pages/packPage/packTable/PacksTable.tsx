import * as React from 'react';

import {
  cardPacksTotalCountSelector,
  packPageCountParamsSelector,
  packsSelector,
  pageParamsSelector
} from "../packSelectors";
import {searchPackAC} from "../packs-reducer";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {PackActions} from "./PackActions";
import {useNavigate} from "react-router-dom";
import {useAppIsLoading} from "../../../../hooks/useAppIsLoading";
import {useAppSelector} from "../../../../app/store";
import {ImgBox} from "../../../components/imgBox/ImgBox";

import {useTableDescAcsFilter} from "../../../components/tableComponents/hooksTable/useTableDescAcsFilter";
import {TableContent} from "../../../components/tableComponents/TableContent";
import {HeaderType} from "../../../components/headTable/typesTable";
import {Pagination} from "../../../components/tableComponents/Pagination";
import {usePagination} from "../../../components/tableComponents/hooksTable/usePagination";

import noCover from "../../../../assest/imgs/noCover.png"

export type TableDataType = {
  name: string | undefined
  cardsCount: number
  user_name: string
  updated: string
  action: 'learn' | 'edit' | 'delete'
}

export function PackTable() {
  const isLoading = useAppIsLoading()
  const navigate = useNavigate()

  const packs = useAppSelector(packsSelector)


  const rowPacks = packs.map((pack) =>
    <TableRow key={pack._id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
      <TableCell
        style={{ cursor: 'pointer', width: '350px' }}
        onClick={() => navigate(`/packs/${pack._id}`)}
        component="th"
        scope="row"
      >
        <ImgBox img={pack.deckCover }
                defaultImg={noCover}
                width={'100px'}
                height={'40px'}
                sx = { {alignSelf:"flex-start"}} />
        {pack.name}
      </TableCell>
      <TableCell align="left">{pack.cardsCount}</TableCell>
      <TableCell align="left">{pack.updated.substring(0, 10)}</TableCell>
      <TableCell align="left">{pack.user_name}</TableCell>
      <TableCell align="left">
        <PackActions
          packName={pack.name}
          idUser={pack.user_id}
        />
      </TableCell>
    </TableRow>
  )


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
     {rowPacks}
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
/*<Box sx={{width: '100%'}}>
  <Paper sx={{width: '100%', mb: 2}}>
    <TableContainer>
      <Table sx={{minWidth: 750, textAlign: 'center'}} aria-labelledby="tableTitle" size={'medium'}>    </TableContainer>
  </Paper>
</Box>*/
