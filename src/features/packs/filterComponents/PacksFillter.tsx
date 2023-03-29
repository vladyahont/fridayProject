import React from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {useSearchParams} from "react-router-dom";
import {searchPackAC} from "../packs-reducer";
import {maxCardsCountSelector} from "../../../app/selectors";
import s from "../Packs.module.css";
import {SearchInput} from "./searchInput/SearchInput";
import {ChosePack} from "./chosePacks/Chose";
import {RangeSlider} from "./rangeSlider/RangeSlider";
import SuperButton from "../../../superComponents/c2-SuperButton/SuperButton";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";

export const PacksFilter = () => {

  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams();
  const params = Object.fromEntries(searchParams)
  const maxCardsCount = useAppSelector(maxCardsCountSelector)
  const resetFilter = () => {
    delete params.user_id
    /*delete params.packName*/
    /*params.user_id = ""*/
    params.packName = ""
    params.sortPacks = "0updated"
    params.page = "1"
    params.min =  "0"
    params.max = maxCardsCount + ''
    dispatch(searchPackAC(params))
    console.log(params)
    setSearchParams({...params})
  };

  return (
    <div className={s.filterContainer}>
      <SearchInput/>
      <ChosePack/>
      <RangeSlider/>
      <SuperButton onClick={resetFilter} children={  <FilterAltOffIcon/>} />
    </div>
  );
};

