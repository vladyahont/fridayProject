import React, {useCallback} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {searchPackAC} from "../packs-reducer";
import {
  appStatusSelector,
  getPackNameParamsSelector,
  getUserIdParamsSelector,
  maxCardsCountSelector, userIdSelector
} from "../../../app/selectors";
import s from "../Packs.module.css";
import {SearchInput} from "./searchInput/SearchInput";
import {Chose} from "./chose/Chose";
import {useSearchParams} from "react-router-dom";

export const PacksFilter = () => {

  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams();
  const searchParamsObject = Object.fromEntries(searchParams);






  const maxCardsCount = useAppSelector(maxCardsCountSelector)

  const userIdParam = useAppSelector(getUserIdParamsSelector)
  const userId = useAppSelector(userIdSelector)
  const isMy = !!userIdParam
  const packName = useAppSelector(getPackNameParamsSelector)

  const onSearchChange = useCallback((searchValue: string) => {
    setSearchParams({...searchParamsObject,packName: searchValue})
    dispatch(searchPackAC({ packName: searchValue }))

  }, [])

  const getAllPacks = useCallback(() => {
    setSearchParams({...searchParamsObject,user_id: userId})
    dispatch(searchPackAC({ user_id: userId }))

  }, [])

  const getMyPacks  = useCallback(() => {
    setSearchParams({...searchParamsObject,user_id: '' })
    dispatch(searchPackAC({ user_id: '' }))
  }, [])

  const appStatus = useAppSelector(appStatusSelector);
  const isLoading = appStatus === "loading"

  return (
    <div className={s.filterContainer}>
      <SearchInput onChangeSearchValue = {onSearchChange} searchValue = {packName} disabled={isLoading}/>
      <Chose disabled={isLoading} initValue={isMy} onFirstClick={getAllPacks} onSecondClick={getMyPacks}/>
    </div>
  );
};

/* const resetFilter = () => {
   delete params.user_id
   /!*delete params.packName*!/
   /!*params.user_id = ""*!/
   params.packName = ""
   params.sortPacks = "0updated"
   params.page = "1"
   params.min =  "0"
   params.max = maxCardsCount + ''
   dispatch(searchPackAC(params))
   console.log(params)
   setSearchParams({...params})
 };*/