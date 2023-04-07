import React from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {searchPackAC} from "../packs-reducer";
import {appStatusSelector, userIdSelector} from "../../../app/selectors";
import {SearchInput} from "./searchInput/SearchInput";
import {Chose} from "./chose/Chose";
import SuperButton from "../../../superComponents/c2-SuperButton/SuperButton";
import {RangeSlider} from "./rangeSlider/RangeSlider";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import {useSearchParams} from "react-router-dom";
import {packNameParamsSelector, userIdParamsSelector} from "../packSelectors";
import {FilterContainer} from "../../components/filterContainer/FilterContainer";

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
    params.page = "1"
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

