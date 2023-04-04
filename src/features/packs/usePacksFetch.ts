import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/store";
import {
  getMaxParamsSelector,
  getMinParamsSelector,
  getPackNameParamsSelector,
  getPageCountParamsSelector,
  getPageParamsSelector,
  getSortPacksParamsSelector,
  getUserIdParamsSelector
} from "../../app/selectors";
import {getPacksTC} from "./packs-reducer";

export const usePacksFetch = () => {
  const dispatch = useAppDispatch()

  const min = useAppSelector(getMinParamsSelector)
  const max = useAppSelector(getMaxParamsSelector)
  const packName = useAppSelector(getPackNameParamsSelector)
  const page = useAppSelector(getPageParamsSelector)
  const pageCount = useAppSelector(getPageCountParamsSelector)
  const sortPacks = useAppSelector(getSortPacksParamsSelector)
  const userId = useAppSelector(getUserIdParamsSelector)

  useEffect(() => {
    dispatch(getPacksTC())
  }, [min, max, page, packName,userId,pageCount,page,sortPacks])

};

