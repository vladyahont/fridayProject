import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/store";
import {getPacksTC} from "./packs-reducer";
import {
  packMaxParamsSelector,
  packMinParamsSelector,
  packNameParamsSelector,
  packPageCountParamsSelector,
  packSortParamsSelector,
  pageParamsSelector,
  userIdParamsSelector
} from "./packSelectors";

export const usePacksFetch = () => {
  const dispatch = useAppDispatch()

  const min = useAppSelector(packMinParamsSelector)
  const max = useAppSelector(packMaxParamsSelector)
  const packName = useAppSelector(packNameParamsSelector)
  const page = useAppSelector(pageParamsSelector)
  const pageCount = useAppSelector(packPageCountParamsSelector)
  const sortPacks = useAppSelector(packSortParamsSelector)
  const userId = useAppSelector(userIdParamsSelector)

  useEffect(() => {
    dispatch(getPacksTC())
  }, [min, max, page, packName,userId,pageCount,page,sortPacks])
};

