import {useAppDispatch, useAppSelector} from "app/store";
import {
    getMaxParamsSelector,
    getMinParamsSelector,
    getPackNameParamsSelector,
    getPageCountParamsSelector,
    getPageParamsSelector,
    getSortPacksParamsSelector,
    getUserIdParamsSelector
} from "app/selectors";
import React, {useEffect} from "react";
import {getPacksTC} from "./packs-reducer";
import {PacksTable} from "./table/packsTable/PacksTable";
import s from './Packs.module.css'
import {AddModallll} from "features/packs/modal/AddModallllll";
import {EditModal} from "features/packs/modal/EditModal";
import {PacksFilter} from "./filterComponents/PacksFillter";

export const Packs = () => {

    const dispatch = useAppDispatch()

    const min = useAppSelector(getMinParamsSelector)
    const max = useAppSelector(getMaxParamsSelector)
    const packName = useAppSelector(getPackNameParamsSelector)
    const page = useAppSelector(getPageParamsSelector)
    const pageCount = useAppSelector(getPageCountParamsSelector)
    const sortPacks = useAppSelector(getSortPacksParamsSelector)
    const userId = useAppSelector(getUserIdParamsSelector)

    useEffect(() => {
        dispatch(getPacksTC())
    }, [min, max, page, packName,userId,pageCount,page,sortPacks])

    return (
        <div className={s.componentContainer}>
            <div className={s.headContainer}>
                <h1 className={s.h1}>Packs List</h1>
                <AddModallll/>
                <EditModal id={'12'} name={'sad'}/>
            </div>
            <PacksFilter />
            <PacksTable />
        </div>
    )
}