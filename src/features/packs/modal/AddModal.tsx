import React from 'react';
import {BasicModal} from "./BasicModal";
import {Input, InputLabel} from "@material-ui/core";
import auth from "features/auth/auth.module.css";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from '@mui/material/Button/Button';
import {addPackTC} from "features/packs/packs-reducer";
import {useAppDispatch} from "app/store";

export const AddModal = () => {

    const dispatch = useAppDispatch()
    const addPackHandler = () => {
        dispatch(addPackTC({
            name: '#newPack#',
            private: false,
            deckCover: '111'
        }))
    }

    return (
        <BasicModal childrenTitle={<h2>Add new pack</h2>}>
            <InputLabel>Name pack</InputLabel>
            <Input className={auth.input}/>
            <FormControlLabel className={auth.remMe} label={'Private pack'}
                              control={<Checkbox/>}/>
            <div>
                <Button variant={'text'}>Cancel</Button>
                <Button variant={'contained'} onClick={addPackHandler}>Save</Button>
            </div>
        </BasicModal>
    );
};

