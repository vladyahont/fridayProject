import React from "react";
import {PacksTable} from "./table/packsTable/PacksTable";
import s from './Packs.module.css'
import {PacksFilter} from "./filterComponents/PacksFillter";
import {usePacksFetch} from "./usePacksFetch";

export const Packs = () => {

    usePacksFetch()

    return (
        <div className={s.componentContainer}>
            <PacksFilter />
            <PacksTable />
        </div>
    )
}