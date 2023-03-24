import React, {ChangeEvent, useState} from 'react';
import {BasicModal} from "./BasicModal";
import {Input, InputLabel} from "@material-ui/core";
import auth from "features/auth/auth.module.css";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from '@mui/material/Button/Button';
import {addPackTC} from "features/packs/packs-reducer";
import {useAppDispatch} from "app/store";
import {Form, Formik} from "formik";
import {FormGroup} from "@material-ui/core";
import {NewPackType} from "features/packs/packTypes";


export const AddModallll = () => {

    const dispatch = useAppDispatch()

    const [name, setPackName] = useState('')
    const [private, setPrivate] = useState(false)

    const enterNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPackName(e.currentTarget.value)
    }
    const addPackHandler = () => {
        const cardsPack: NewPackType = {name, private}
        dispatch(addPackTC(cardsPack))
    }

    return (
        <BasicModal childrenTitle={<h4>Add new pack</h4>}>
            <InputLabel>Name pack</InputLabel>
            <Input className={auth.input} value={name}
            onChange={enterNameHandler}/>
            <FormControlLabel className={auth.remMe} label={'Private pack'} name="private"
                              control={<Checkbox value={private} onClick={() => setPrivate(!private)}/>}/>
            <Button variant={'contained'} color={'primary'} onClick={addPackHandler}>Save</Button>

        </BasicModal>

    );
}

const initialValuesAddPack = {
    name: '',
    private: false
}

