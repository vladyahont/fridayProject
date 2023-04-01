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
import {PacksFilter} from "./filterComponents/PacksFillter";
import {AddPackModal} from "./modal/packModals/AddPackModal";

export const Packs = () => {

    const dispatch = useAppDispatch()
    /* const [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams();
     const params = Object.fromEntries(searchParams)*/

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
                <AddPackModal/>
            </div>
            <PacksFilter />
            <PacksTable />
        </div>
    )
}