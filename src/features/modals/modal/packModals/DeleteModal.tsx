import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "app/store";

import Button from "@mui/material/Button/Button";

import IconButton from "@mui/material/IconButton/IconButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {appStatusSelector} from "app/selectors";
import {BasicModal} from "../BasicModal";
import {deletePackTC} from "../../../pages/packPage/packs-reducer";

type PropsType = {
    id: string
    packName?: string
}

export const DeleteModal = (props: PropsType) => {

    const appStatus = useAppSelector(appStatusSelector)

    const dispatch = useAppDispatch()

    const [open, setOpen] = useState(false)

    const onClose = () => setOpen(false)
    const onOpen = () => setOpen(true)

    const deletePackHandler = () => {
        console.log(props.id)
        dispatch(deletePackTC(props.id))
        onClose()
    }

    return (
        <div>
            <IconButton onClick={onOpen} disabled={appStatus === 'loading'}>
                <HighlightOffIcon/>
            </IconButton>
            <BasicModal open={open} onClose={onClose}>
                <h4>Delete pack</h4>
                <div>Do you really want ro remove <span style={{fontWeight: '600'}}>{props.packName}</span>?
                    All cards will be deleted
                </div>
                <Button variant={'contained'} color={'error'}
                        onClick={deletePackHandler}>Delete</Button>
            </BasicModal>
        </div>
    )
}
