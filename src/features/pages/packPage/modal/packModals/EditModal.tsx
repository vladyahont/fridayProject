import React, {ChangeEvent, useState} from 'react';

import {useAppDispatch, useAppSelector} from "app/store";
import {Input, InputLabel} from "@material-ui/core";
import auth from "features/auth/auth.module.css";
import Button from "@mui/material/Button";

import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton/IconButton";
import {appStatusSelector} from "app/selectors";
import {fileConverter} from "utils/add-img-utils";
import noCover from './../../../../assest/imgs/noCover.png'
import {UpdatePackType} from "../../packTypes";
import {updatePackTC} from "../../packs-reducer";
import {BasicModal} from "../BasicModal";


type PropsType = {
    id: string
    name?: string
    cover?: string
}

export const EditModal = (props: PropsType) => {

    const appStatus = useAppSelector(appStatusSelector)

    const dispatch = useAppDispatch()

    const [open, setOpen] = useState(false)
    const [name, setPackName] = useState(props.name)
    const [deckCover, setDeckCover] = useState(props.cover)

    const onClose = () => setOpen(false)
    const onOpen = () => setOpen(true)


    const editPackHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPackName(e.currentTarget.value)
    }

    const sendNewPackName = () => {
        if (name) {
            const cardsPack: UpdatePackType = {_id: props.id, name, deckCover}
            dispatch(updatePackTC(cardsPack))
        }
    }

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        fileConverter(e.target.files, (file64: string) => {
            setDeckCover(file64)
        })
    };

    return (
        <>
            <IconButton onClick={onOpen} disabled={appStatus === 'loading'}>
                <EditIcon/>
            </IconButton>
            <BasicModal open={open} onClose={onClose}>
                <h4>Edit pack</h4>
                <InputLabel>Name pack</InputLabel>
                <Input className={auth.input}
                       value={name} onChange={editPackHandler}/>
                <img style={{width:'400px', height:'250px'}} src={deckCover ? deckCover : noCover}/>
                <label>
                    <input type="file"
                           onChange={uploadHandler}
                           style={{display: 'none'}}
                    />
                    <Button variant='contained' component='span'>Download new cover for pack</Button>
                    {deckCover ? <span style={{color:'green'} }>File selected!</span> : ''}
                </label>
                {name && name !== props.name
                    ? <Button variant={'contained'} color={'primary'} onClick={sendNewPackName}>Save</Button>
                    : <Button disabled={true}>Save</Button>}
                <Button variant={'outlined'} color={'primary'} onClick={onClose}>Cancel</Button>
            </BasicModal>
        </>


    );
}

