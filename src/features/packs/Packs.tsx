import React, {useEffect} from "react";
import {PacksTable} from "./table/packsTable/PacksTable";
import s from './Packs.module.css'
import {PacksFilter} from "./filterComponents/PacksFillter";
import {usePacksFetch} from "./usePacksFetch";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {appStatusSelector} from "../../app/selectors";
import {SubHeaderTable} from "../components/subHeaderTable/SubHeaderTable";
import {useSearchParams} from "react-router-dom";
import {getPacksTC, searchPackAC} from "./packs-reducer";

export const Packs = () => {
    const appStatus = useAppSelector(appStatusSelector)
    const dispatch = useAppDispatch()
    const [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams();
    const searchParamsObject = Object.fromEntries(searchParams);

    useEffect(() => {
      dispatch(searchPackAC(searchParamsObject))
    }, [searchParams])

    usePacksFetch()
    return (
        <>
          <SubHeaderTable
            isLoading={appStatus === "loading"}
            title={'Pack list'}
            titleButton={'Add pack'}
            onClick={()=> console.log("Click")}
          />
            <PacksFilter />
            <PacksTable />
        </>
    )
}