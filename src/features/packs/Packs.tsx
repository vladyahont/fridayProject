import {useAppDispatch, useAppSelector} from "app/store";
import {
    getMaxParamsSelector,
    getMinParamsSelector,
    getPackNameParamsSelector,
    getPageParamsSelector,
    maxCardsCountSelector,
    packsSelector
} from "app/selectors";
import React, {useEffect} from "react";
import {changeMinMaxCountAC, getPacksTC} from "./packs-reducer";
import {EnhancedTable, createData, TableDataType} from "./table/Table";
import s from './Packs.module.css'
import {SearchInput} from "./filterComponents/searchInput/SearchInput";
import {ChosePack} from "./filterComponents/chosePacks/Chose";
import {RangeSlider} from "./filterComponents/rangeSlider/RangeSlider";
import SuperButton from "../../superComponents/c2-SuperButton/SuperButton";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import {useSearchParams} from "react-router-dom";
import {AddModallll} from "features/packs/modal/AddModallllll";
import {EditModal} from "features/packs/modal/EditModal";

export const Packs = () => {
    const dispatch = useAppDispatch()

    let packs = useAppSelector(packsSelector)

    const min = useAppSelector(getMinParamsSelector)
    const max = useAppSelector(getMaxParamsSelector)
    const packName = useAppSelector(getPackNameParamsSelector)
    const page = useAppSelector(getPageParamsSelector)

    const maxCardsCount = useAppSelector(maxCardsCountSelector)


    let rows: TableDataType[] = packs
        .map(p => createData(p.name, p.cardsCount, p.updated, p.user_name, 'learn'))


    const [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams();
    const params = Object.fromEntries(searchParams)
    const resetFilter = () => {
        delete params.packName
        delete params.min
        delete params.max
        delete params.user_id
        /*delete params.pageCount*/
        params.page = "0"

        dispatch(changeMinMaxCountAC(0,maxCardsCount))

        setSearchParams(params)
    };
    console.log(params)
    useEffect(() => {
        dispatch(getPacksTC())
    }, [min, max, page, packName,params.user_id,params.pageCount,params.page])

    return (
        <div className={s.componentContainer}>
            <div className={s.headContainer}>
                <h1 className={s.h1}>Packs List</h1>
                <AddModallll/>
                <EditModal id={'12'} name={'sad'}/>
            </div>
            <div className={s.filterContainer}>
                <SearchInput/>
                <ChosePack/>
                <RangeSlider/>
                <SuperButton onClick={resetFilter}>
                    <FilterAltOffIcon/>
                </SuperButton>
            </div>
            <EnhancedTable rows={rows}/>
        </div>
    )
}