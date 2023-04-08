import React from 'react';
import {Chose} from "../../../components/chose/Chose";
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
    minCardsCount,
    maxCardsCount,
    valuesSlider,
    setValuesSlider,
    onSliderChange,
    onMyPacks,
    onAllPacks,
    onResetFilter,
    onSearchChange,
  } = usePacksFilter()

  return (
    <FilterContainer>
      <SearchInput onChangeSearchValue={onSearchChange} searchValue={packName} disabled={isLoading}/>
      <Chose initValue={isMy}
             onFirstClick={onAllPacks}
             onSecondClick={onMyPacks}
             disabled={isLoading}/>
      <RangeSlider min={minCardsCount}
                   max={maxCardsCount}
                   minDistance={5}
                   current={valuesSlider}
                   onChangeCurrent={setValuesSlider}
                   onChangeCommitted={onSliderChange}
                   disabled={isLoading}/>
      <SuperButton onClick={onResetFilter} disabled={isLoading} children={<FilterAltOffIcon/>}/>
    </FilterContainer>
  );
};

