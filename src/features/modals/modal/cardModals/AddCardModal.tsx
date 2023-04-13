import React, {ChangeEvent, memo, useState} from 'react';
import {Input, InputLabel} from "@material-ui/core";
import auth from "features/auth/auth.module.css";
import Button from '@mui/material/Button/Button';

import {useAppDispatch, useAppSelector} from "app/store";

import IconButton from "@mui/material/IconButton/IconButton";

import {appStatusSelector} from "app/selectors";

import {BasicModal} from "../BasicModal";
import {NewPackType} from "../../../pages/packPage/packTypes";
import {addPackTC} from "../../../pages/packPage/packs-reducer";

export const AddCardModal = memo(() => {

    //TODO

    const appStatus = useAppSelector(appStatusSelector)

    const dispatch = useAppDispatch()

    const [open, setOpen] = useState(false)
    const [name, setPackName] = useState('')

    const onClose = () => setOpen(false)
    const onOpen = () => setOpen(true)

    const enterNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.currentTarget.value
        if (name) {
            setPackName(name)
        }
    }
    const addPackHandler = () => {
        const cardsPack: NewPackType = {name}
        dispatch(addPackTC(cardsPack))
        setPackName('')
        onClose()
    }

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            console.log('file: ', file)
        }
    };

    return (
        <div>
            <Button variant={'contained'}
                    onClick={onOpen}
                    disabled={appStatus === 'loading'}>
                <div>Add new pack</div>
            </Button>
            <BasicModal title={"Add new pack"} open={open} onClose={onClose}>
                <InputLabel>Name pack</InputLabel>
                <Input className={auth.input} value={name} onChange={enterNameHandler}/>
                <IconButton component="label">
                    <input type="file"
                           accept="image/*"
                           onChange={uploadHandler}
                           style={{display: 'none'}}
                    />
                    <Button>Download cover for pack</Button>
                </IconButton>
                {name ? <Button variant={'contained'} color={'primary'} onClick={addPackHandler}>Save</Button>
                    : <Button disabled={true}>Save</Button>}
                <Button variant={'outlined'} color={'primary'} onClick={onClose}>Cancel</Button>
            </BasicModal>
        </div>
    );
})