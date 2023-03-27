import {useAppDispatch, useAppSelector} from "app/store";
import {
    getMaxParamsSelector,
    getMinParamsSelector,
    getPackNameParamsSelector,
    getPageParamsSelector,
    maxCardsCountSelector,
} from "app/selectors";
import React, {useEffect} from "react";
import {changeMinMaxCountAC, getPacksTC} from "./packs-reducer";
import s from './Packs.module.css'
import {SearchInput} from "./filterComponents/searchInput/SearchInput";
import {ChosePack} from "./filterComponents/chosePacks/Chose";
import {RangeSlider} from "./filterComponents/rangeSlider/RangeSlider";
import SuperButton from "../../superComponents/c2-SuperButton/SuperButton";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import {useSearchParams} from "react-router-dom";
import {AddModallll} from "features/packs/modal/AddModallllll";
import {EditModal} from "features/packs/modal/EditModal";
import {PackTable} from "./tablePacks/PackTable";


export const Packs = () => {
    const dispatch = useAppDispatch()



    const min = useAppSelector(getMinParamsSelector)
    const max = useAppSelector(getMaxParamsSelector)
    const packName = useAppSelector(getPackNameParamsSelector)
    const page = useAppSelector(getPageParamsSelector)

    const maxCardsCount = useAppSelector(maxCardsCountSelector)

    const [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams();
    const params = Object.fromEntries(searchParams)
    const resetFilter = () => {
        delete params.packName
        delete params.min
        delete params.max
        delete params.user_id
        delete params.pageCount
        delete params.page

        dispatch(changeMinMaxCountAC(0,maxCardsCount))

        setSearchParams(params)
    };

    useEffect(() => {
        dispatch(getPacksTC())
    }, [min, max, page, packName])

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
            <PackTable />

        </div>
    )
}