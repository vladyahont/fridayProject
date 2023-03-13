import {useAppDispatch, useAppSelector} from "../../app/store";
import {packsSelector, userIdSelector} from "../../app/selectors";
import React, {useEffect, useState} from "react";
import {getPacksTC} from "./packs-reducer";
import EnhancedTable, {createData} from "./Table/Table";
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export const Packs = () => {
    const dispatch = useAppDispatch()
    const [switcher, setSwitcher] = useState(true)

    const packs = useAppSelector(packsSelector).map(p => createData(p.name, p.cardsCount, p.updated, p.user_name, 'learn'))
    const myID = useAppSelector(userIdSelector)
    const testID = '6409ee16363fe2261c921716'

    useEffect(() => dispatch(getPacksTC()), [])
    useEffect(() => {
        console.log(myID)
        !switcher ? dispatch(getPacksTC(myID)) : dispatch(getPacksTC())
    }, [switcher])

    return (
        <>
            <Stack direction="row" spacing={1} alignItems="center">
                <Typography>My</Typography>
                <Switch checked={switcher} onChange={() => {
                    setSwitcher(!switcher)
                }}/>
                <Typography>All</Typography>
            </Stack>
            <EnhancedTable rows={packs}/>
        </>
    )
}