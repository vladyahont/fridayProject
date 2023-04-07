import {useAppDispatch, useAppSelector} from "../../../../app/store";
import {
  cardPacksTotalCountSelector,
  getPageParamsSelector
} from "../../../../app/selectors";
import {setSearchParamsCardsAC} from "../../../packs/cards/cards-reducer";
import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import * as React from "react";
import {searchPackAC} from "../../../packs/packs-reducer";
import {cardPageCountParamsSelector, cardPageParamsSelector, cardTotalCountSelector} from "../../../packs/cards/cardSelector";

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
  typeof setSearchParamsCardsAC  |
  typeof searchPackAC

type totalCountSelectorType =
  typeof cardTotalCountSelector  |
  typeof cardPacksTotalCountSelector

type rowsPerPageSelectorType =
  typeof cardPageCountParamsSelector
 // typeof cardPageCountParamsSelector

type pageSelectorType =
  typeof getPageParamsSelector  |
  typeof cardPageParamsSelector
