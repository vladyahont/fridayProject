import {useAppDispatch, useAppSelector} from "../../app/store";
import {packsSelector} from "../../app/selectors";
import React, {useEffect} from "react";
import {getPacksTC} from "./packs-reducer";
import EnhancedTable from "./Table/Table";

export const Packs = () => {
    const dispatch = useAppDispatch()
    const packs = useAppSelector(packsSelector)

    useEffect(() => dispatch(getPacksTC()), [])

        return (
            <EnhancedTable />
        )
}