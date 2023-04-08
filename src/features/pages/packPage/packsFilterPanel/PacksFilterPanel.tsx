import React from 'react';
import {Chose} from "./chose/Chose";
import {RangeSlider} from "./rangeSlider/RangeSlider";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import {FilterContainer} from "../../../components/filterContainer/FilterContainer";
import {SearchInput} from "../../../components/searchInput/SearchInput";
import SuperButton from "../../../../superComponents/c2-SuperButton/SuperButton";
import {usePacksFilter} from "../hooks/usePackFilter";
import {useAppIsLoading} from "../../../../hooks/useAppIsLoading";


export const PacksFilterPanel = () => {

  const isLoading = useAppIsLoading()

  const {
    packName,
    isMy,
    onMyPacks,
    onAllPacks,
    onResetFilter,
    onSearchChange,
  } = usePacksFilter()

  return (
    <FilterContainer>
      <SearchInput   onChangeSearchValue = {onSearchChange} searchValue = {packName} disabled={isLoading}/>
      <Chose   initValue={isMy} onFirstClick={onAllPacks} onSecondClick={onMyPacks} disabled={isLoading}/>
      <RangeSlider />
      <SuperButton onClick={onResetFilter} children={<FilterAltOffIcon/>} />
    </FilterContainer>
  );
};

