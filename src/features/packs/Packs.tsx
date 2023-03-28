import {useAppDispatch, useAppSelector} from "app/store";
import {
    getMaxParamsSelector,
    getMinParamsSelector,
    getPackNameParamsSelector,
    getPageCountParamsSelector,
    getPageParamsSelector,
    maxCardsCountSelector
} from "app/selectors";
import React, {useEffect} from "react";
import {getPacksTC, searchPackAC} from "./packs-reducer";
import {EnhancedTable} from "./table/packsTable/PacksTable";
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

    const min = useAppSelector(getMinParamsSelector)
    const max = useAppSelector(getMaxParamsSelector)
    const packName = useAppSelector(getPackNameParamsSelector)
    const page = useAppSelector(getPageParamsSelector)
    const pageCount = useAppSelector(getPageCountParamsSelector)
    const maxCardsCount = useAppSelector(maxCardsCountSelector)

    const [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams();
    const params = Object.fromEntries(searchParams)
    const resetFilter = () => {
        delete params.packName
        delete params.user_id
        params.page = "1"
        params.min =  "0"
        params.max = maxCardsCount + ''
        dispatch(searchPackAC(params))
        setSearchParams({...params})
    };

    useEffect(() => {
        dispatch(getPacksTC())
    }, [min, max, page, packName,params.user_id,pageCount,page])

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
            <EnhancedTable/>
        </div>
    )
}