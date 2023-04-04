import React, {useCallback} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {searchPackAC} from "../packs-reducer";
import {appStatusSelector, getPackNameParamsSelector, maxCardsCountSelector} from "../../../app/selectors";
import s from "../Packs.module.css";
import {SearchInput} from "./searchInput/SearchInput";

export const PacksFilter = () => {

  const dispatch = useAppDispatch()

  const maxCardsCount = useAppSelector(maxCardsCountSelector)
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

  const packName = useAppSelector(getPackNameParamsSelector)
  const onSearchChange = useCallback((searchValue: string) => {
    dispatch(searchPackAC({ packName: searchValue }))
  }, [])
  const appStatus = useAppSelector(appStatusSelector);
  const isLoading = appStatus === "loading"
  return (
    <div className={s.filterContainer}>
      <SearchInput onChangeSearchValue = {onSearchChange} searchValue = {packName} disabled={isLoading}/>

    </div>
  );
};

