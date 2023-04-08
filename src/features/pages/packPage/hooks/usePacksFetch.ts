import {useEffect} from 'react';

import {getPacksTC, searchPackAC} from "../packs-reducer";
import {
  packMaxParamsSelector,
  packMinParamsSelector,
  packNameParamsSelector,
  packPageCountParamsSelector,
  packSortParamsSelector,
  pageParamsSelector,
  userIdParamsSelector
} from "../packSelectors";
import {useSearchParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../../app/store";

export const usePacksFetch = () => {

  const dispatch = useAppDispatch()

  const min = useAppSelector(packMinParamsSelector)
  const max = useAppSelector(packMaxParamsSelector)
  const packName = useAppSelector(packNameParamsSelector)
  const page = useAppSelector(pageParamsSelector)
  const pageCount = useAppSelector(packPageCountParamsSelector)
  const sortPacks = useAppSelector(packSortParamsSelector)
  const userId = useAppSelector(userIdParamsSelector)

  const [searchParams] = useSearchParams();
  const searchParamsObject = Object.fromEntries(searchParams);


  useEffect(() => {
    dispatch(getPacksTC())
  }, [min, max, page, packName,userId,pageCount,page,sortPacks])

  useEffect(() => {
    dispatch(searchPackAC({...searchParamsObject}))
  }, [])

};

