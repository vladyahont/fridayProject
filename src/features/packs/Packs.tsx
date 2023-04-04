import React from "react";
import {PacksTable} from "./table/packsTable/PacksTable";
import s from './Packs.module.css'
import {PacksFilter} from "./filterComponents/PacksFillter";
import {usePacksFetch} from "./usePacksFetch";
import {useAppSelector} from "../../app/store";
import {appStatusSelector} from "../../app/selectors";
import {SubHeaderTable} from "../components/subHeaderTable/SubHeaderTable";

export const Packs = () => {
    const appStatus = useAppSelector(appStatusSelector)
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