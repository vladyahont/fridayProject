import React from 'react';

import {searchPackAC} from "../packs-reducer";
import {Chose} from "./chose/Chose";
import {RangeSlider} from "./rangeSlider/RangeSlider";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import {useSearchParams} from "react-router-dom";
import {packNameParamsSelector, userIdParamsSelector} from "../packSelectors";
import {useAppDispatch, useAppSelector} from "../../../../app/store";
import {appStatusSelector, userIdSelector} from "../../../../app/selectors";
import {FilterContainer} from "../../../components/filterContainer/FilterContainer";
import {SearchInput} from "../../../components/searchInput/SearchInput";
import SuperButton from "../../../../superComponents/c2-SuperButton/SuperButton";


export const PacksFilter = () => {

  const dispatch = useAppDispatch()
  const userIdParam = useAppSelector(userIdParamsSelector)
  const userId = useAppSelector(userIdSelector)
  const isMy = !!userIdParam
  const packName = useAppSelector(packNameParamsSelector)

  const onSearchChange = (searchValue: string) => {
    dispatch(searchPackAC({ packName: searchValue }))
  }

  const getAllPacks = () => {
    dispatch(searchPackAC({ user_id: userId }))
  }

  const getMyPacks  = () => {
    dispatch(searchPackAC({ user_id: '' }))
  }

  const [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams();
  const params = Object.fromEntries(searchParams)
  const resetFilter = () => {
    params.pageCount = "5"
    params.sortPacks = "0updated"
    params.page = "0"
    dispatch(searchPackAC({...params,packName: "",}))
    setSearchParams({...params})
   };

  const appStatus = useAppSelector(appStatusSelector);
  const isLoading = appStatus === "loading"

  return (
    <FilterContainer>
      <SearchInput onChangeSearchValue = {onSearchChange} searchValue = {packName} disabled={isLoading}/>
      <Chose disabled={isLoading} initValue={isMy} onFirstClick={getAllPacks} onSecondClick={getMyPacks}/>
      <RangeSlider/>
      <SuperButton onClick={resetFilter} children={<FilterAltOffIcon/>} />
    </FilterContainer>
  );
};

