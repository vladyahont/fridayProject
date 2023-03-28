import React, {ChangeEvent, useState} from 'react';
import {BasicModal} from "features/packs/modal/BasicModal";
import {useAppDispatch} from "app/store";
import {Input, InputLabel} from "@material-ui/core";
import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel';
import auth from "features/auth/auth.module.css";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import {UpdatePackType} from "features/packs/packTypes";
import {updatePackTC} from "features/packs/packs-reducer";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton/IconButton";


type PropsType = {
    id: string
    name?: string
}

export const EditModal = (props: PropsType) => {

    const dispatch = useAppDispatch()

    const [open, setOpen] = useState(false)
    const [name, setPackName] = useState(props.name)

    const onClose = () => setOpen(false)
    const onOpen = () => setOpen(true)


    const editPackHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPackName(e.currentTarget.value)
    }

    const sendNewPackName = () => {
        if (name) {
            const cardsPack: UpdatePackType = {
                _id: props.id,
                name: name
            }
            dispatch(updatePackTC(cardsPack))
        }
    }

    return (
        <>
            <IconButton onClick={onOpen}>
                <EditIcon/>
            </IconButton>
            <BasicModal open={open} onClose={onClose}>
                <h4>Change pack name</h4>
                <InputLabel>Name pack</InputLabel>
                <Input className={auth.input}
                       value={name} onChange={editPackHandler}/>
                <FormControlLabel className={auth.remMe} label={'Private pack'}
                                  control={<Checkbox/>}/>
                {name && name !== props.name
                    ? <Button variant={'contained'} color={'primary'} onClick={sendNewPackName}>Save</Button>
                    : <Button disabled={true}>Save</Button>}
                <Button variant={'outlined'} color={'primary'} onClick={onClose}>Cancel</Button>
            </BasicModal>
        </>


    );
}

