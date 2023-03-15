import {useAppDispatch, useAppSelector} from "../../app/store";
import {packsSelector, userIdSelector} from "../../app/selectors";
import React, {useEffect, useState} from "react";
import {addPackTC, getPacksTC} from "./packs-reducer";
import EnhancedTable, {createData, TableDataType} from "./Table/Table";
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import s from './Packs.module.css'
import Button from "@mui/material/Button";

export const Packs = () => {
    const dispatch = useAppDispatch()
    const [switcher, setSwitcher] = useState(true)

    const packs: TableDataType[] = useAppSelector(packsSelector)
        .map(p => createData(p.name, p.cardsCount, p.updated, p.user_name, 'learn'))
    const myID = useAppSelector(userIdSelector)
    const testID = '6409ee16363fe2261c921716'

    //useEffect(() => dispatch(getPacksTC()), [])
    useEffect(() => {
        !switcher ? dispatch(getPacksTC(myID)) : dispatch(getPacksTC())
    }, [switcher])

    const addNewPackHandler = () => {
        dispatch(addPackTC('$newPack$'))
    }

    return (
        <div className={s.componentContainer}>
            <div className={s.headContainer}>
                <h1 className={s.h1}>Packs List</h1>
                <Button className={s.button} onClick={addNewPackHandler}>Add new pack</Button>
            </div>
            <div className={s.controlsContainer}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{marginBottom: '20px'}}>
                    <Typography>My</Typography>
                    <Switch checked={switcher}
                            onChange={() => {
                                setSwitcher(!switcher)
                            }}
                    />
                    <Typography>All</Typography>
                </Stack>
            </div>
            <EnhancedTable rows={packs}/>
        </div>
    )
}