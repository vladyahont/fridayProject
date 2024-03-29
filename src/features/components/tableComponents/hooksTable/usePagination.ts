import {useAppDispatch, useAppSelector} from "../../../../app/store";
import {useSearchParams} from "react-router-dom";
import * as React from "react";
import {useEffect} from "react";
import {searchCardsAC} from "../../../pages/cardPage/cards-reducer";
import {searchPackAC} from "../../../pages/packPage/packs-reducer";
import {
  cardPageCountParamsSelector,
  cardPageParamsSelector,
  cardTotalCountSelector
} from "../../../pages/cardPage/cardSelector";
import {
  cardPacksTotalCountSelector,
  packPageCountParamsSelector,
  pageParamsSelector
} from "../../../pages/packPage/packSelectors";


export const usePagination = (totalCountSelector:totalCountSelectorType,
                              rowsPerPageSelector:rowsPerPageSelectorType,
                              pageSelector:pageSelectorType,
                              setSearchParamAC:SetSearchParamACType) => {
  const [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams();
  const params = Object.fromEntries(searchParams);


  const dispatch = useAppDispatch();

  const totalCount = useAppSelector(totalCountSelector)
  const rowsPerPage = useAppSelector(rowsPerPageSelector)
  const page = useAppSelector(pageSelector)

  useEffect(() => {
    if (searchParams.has("pageCount") && searchParams.has("page")){
      dispatch(setSearchParamAC({pageCount: Number(params.pageCount), page: Number(params.page)}))
    }
  }, [])


  const [emptyRows, setEmptyRows] = React.useState(0);
  useEffect(() => {
    setEmptyRows(page != 0 ? page === Math.floor(totalCount / rowsPerPage)?
      rowsPerPage - (totalCount % rowsPerPage)
      : 0 : rowsPerPage - totalCount)
  })

  const onChange = (page: number) => {
    setSearchParams({...params, page: page})
    dispatch(setSearchParamAC({page}))
  }
  const onChangePageCount = (pageCount: number) => {
    setSearchParams({...params, pageCount: pageCount, page: 0})
    dispatch(setSearchParamAC({pageCount: pageCount, page: 0}))
  }

  return {
    onChange,
    onChangePageCount,
    totalCount: Number(totalCount),
    rowsPerPage: Number(rowsPerPage),
    page: Number(page),
    emptyRows,
  }
}


type SetSearchParamACType =
  typeof searchCardsAC  |
  typeof searchPackAC

type totalCountSelectorType =
  typeof cardTotalCountSelector  |
  typeof cardPacksTotalCountSelector

type rowsPerPageSelectorType =
  typeof cardPageCountParamsSelector |
  typeof packPageCountParamsSelector

type pageSelectorType =
  typeof pageParamsSelector  |
  typeof cardPageParamsSelector
