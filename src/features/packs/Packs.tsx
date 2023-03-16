import {useAppDispatch, useAppSelector} from "../../app/store";
import {packsSelector} from "../../app/selectors";
import React from "react";
import {addPackTC, getPackssTC} from "./packs-reducer";
import EnhancedTable, {createData, TableDataType} from "./Table/Table";
import s from './Packs.module.css'
import Button from "@mui/material/Button";
import {SearchInput} from "./filterComponents/SearchInput/SearchInput";
import {ChosePack} from "./filterComponents/ChosePacks/Chose";
import {RangeSlider} from "./filterComponents/RangeSlider/RangeSlider";
import SuperButton from "../../superComponents/c2-SuperButton/SuperButton";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";

export const Packs = () => {
    const dispatch = useAppDispatch()

    const packs: TableDataType[] = useAppSelector(packsSelector)
        .map(p => createData(p.name, p.cardsCount, p.updated, p.user_name, 'learn'))


  const resetFilter = () => {
    dispatch(getPackssTC({}));
  };


    const addNewPackHandler = () => {
        dispatch(addPackTC('$newPack$'))
    }

    return (
        <div className={s.componentContainer}>
            <div className={s.headContainer}>
                <h1 className={s.h1}>Packs List</h1>
                <Button className={s.button} onClick={addNewPackHandler}>Add new pack</Button>
            </div>
          <div className={s.filterContainer}>
            <SearchInput />
            <ChosePack />
            <RangeSlider />
            <SuperButton  onClick={resetFilter}>
              <FilterAltOffIcon />
            </SuperButton>
          </div>
            <EnhancedTable rows={packs}/>
        </div>
    )
}