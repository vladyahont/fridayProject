import {useAppDispatch, useAppSelector} from "../../app/store";
import {
  maxCardsCountSearchSelector,
  mixCardsCountSearchSelector,
  packNameSearchSelector,
  packsSelector,
  pageCountSearchSelector,
  pageSearchSelector,
  userIdSearchSelector
} from "../../app/selectors";
import React, {useEffect} from "react";
import {addPackTC, getPackssTC} from "./packs-reducer";
import EnhancedTable, {createData, TableDataType} from "./Table/Table";
import s from './Packs.module.css'
import Button from "@mui/material/Button";
import {FilterPanel} from "./filterComponents/FilterPanel";


export const Packs = () => {
  const dispatch = useAppDispatch()
  const packNameSearch = useAppSelector(packNameSearchSelector)
  const pageSearch = useAppSelector(pageSearchSelector)
  const pageCountSearch = useAppSelector(pageCountSearchSelector)
  const userIdSearch = useAppSelector(userIdSearchSelector)
  const mixCardsCountSearch = useAppSelector(mixCardsCountSearchSelector)
  const maxCardsCountSearch = useAppSelector(maxCardsCountSearchSelector)

  useEffect(() => {
    dispatch(getPackssTC())

  }, [packNameSearch,
    pageSearch,
    pageCountSearch,
    userIdSearch,
    mixCardsCountSearch,
    maxCardsCountSearch])


  const packs: TableDataType[] = useAppSelector(packsSelector)
    .map(p => createData(p.name, p.cardsCount, p.updated, p.user_name, 'learn'))


  /*
    const resetFilter = () => {
      const params = Object.fromEntries(searchParams)
      delete params.packName
      delete params.min
      delete params.max
      delete params.user_id
      setSearchParams(params)
      dispatch(getPackssTC(params));
    };*/


  const addNewPackHandler = () => {
    dispatch(addPackTC('$newPack$'))
  }

  return (
    <div className={s.componentContainer}>
      <div className={s.headContainer}>
        <h1 className={s.h1}>Packs List</h1>
        <Button className={s.button} onClick={addNewPackHandler}>Add new pack</Button>
      </div>
      <FilterPanel/>
      <EnhancedTable rows={packs}/>
    </div>
  )
}