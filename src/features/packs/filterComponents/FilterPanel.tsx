import React from 'react';
import {SearchInput} from "./SearchInput/SearchInput";
import {ChosePack} from "./ChosePacks/Chose";
import SuperButton from "../../../superComponents/c2-SuperButton/SuperButton";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import {clearSearchParamsAC} from "../packs-reducer";
import {useAppDispatch} from "../../../app/store";
import {RangeSlider} from "./RangeSlider/RangeSlider";
import s from "../filterComponents/filterPanel.module.css"

export const FilterPanel = () => {
  const dispatch = useAppDispatch()
  const onResetFilter = () =>{
    dispatch(clearSearchParamsAC())
  }
  return (
    <div className={s.container}>
      <SearchInput/>
      <ChosePack/>
      <RangeSlider/>
      <FilterAltOffIcon onClick={onResetFilter}/>
    </div>
  );
};

