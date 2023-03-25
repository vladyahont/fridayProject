import React, {ChangeEvent, useState} from 'react';
import {BasicModal} from "./BasicModal";
import {useAppDispatch} from "app/store";
import {Input, InputLabel} from "@material-ui/core";
import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel';
import auth from "features/auth/auth.module.css";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import {UpdatePackType} from "features/packs/packTypes";
import {updatePackTC} from "features/packs/packs-reducer";


type PropsType = {
    id: string
    name: string
}

export const EditModal = (props: PropsType) => {

    const dispatch = useAppDispatch()

    const [name, setName] = useState(props.name)

    const editPackHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }

    const sendNewPackName = () => {
        const cardsPack: UpdatePackType = {
            _id: props.id,
            name: name
        }
        dispatch(updatePackTC(cardsPack))
    }

    return (
        <BasicModal childrenTitle={<h4>Edit pack</h4>}>
                                <InputLabel>Name pack</InputLabel>
                                <Input className={auth.input}
                                       value={name} onChange={editPackHandler}/>
                                <FormControlLabel className={auth.remMe} label={'Private pack'}
                                                  control={<Checkbox/>}/>
                                <Button variant={'contained'} color={'primary'} onClick={sendNewPackName}>Save</Button>
        </BasicModal>

    );
}

