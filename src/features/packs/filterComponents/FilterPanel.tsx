import React from 'react';
import {SearchInput} from "./SearchInput/SearchInput";
import {ChosePack} from "./ChosePacks/Chose";
import SuperButton from "../../../superComponents/c2-SuperButton/SuperButton";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import {clearSearchParamsAC} from "../packs-reducer";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {RangeSlider} from "./RangeSlider/RangeSlider";


export const FilterPanel = () => {
  const dispatch = useAppDispatch()

  const onResetFilter = () =>{
    dispatch(clearSearchParamsAC())
  }
  return (
    <div>
      <SearchInput/>
      <ChosePack/>
      <RangeSlider/>
      <SuperButton onClick={onResetFilter}>
        <FilterAltOffIcon/>
      </SuperButton>
    </div>
  );
};

