import React, {useState} from 'react';
import {useAppDispatch} from "app/store";
import {deletePackTC} from "features/packs/packs-reducer";
import Button from "@mui/material/Button/Button";
import {BasicModal} from "features/packs/modal/BasicModal";
import IconButton from "@mui/material/IconButton/IconButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

type PropsType = {
    id: string
    packName?: string
}

export const DeleteModal = (props: PropsType) => {

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
            <IconButton onClick={onOpen}>
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
