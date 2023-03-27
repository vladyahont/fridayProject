import React, {ChangeEvent, useState} from 'react';
import {BasicModal} from "./BasicModal";
import {Input, InputLabel} from "@material-ui/core";
import auth from "features/auth/auth.module.css";
import Button from '@mui/material/Button/Button';
import {addPackTC} from "features/packs/packs-reducer";
import {useAppDispatch} from "app/store";
import {NewPackType} from "features/packs/packTypes";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton/IconButton";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


export const AddModallll = () => {

    const dispatch = useAppDispatch()

    const [name, setPackName] = useState('')
    const [privateValue, setPrivateValue] = useState(false)

    const enterNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPackName(e.currentTarget.value)
    }
    const addPackHandler = () => {
        const cardsPack: NewPackType = {name, private:privateValue}
        dispatch(addPackTC(cardsPack))
    }

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            console.log('file: ', file)
        }
    };


    return (
        <BasicModal childrenTitle={<h4>Add new pack</h4>}>
            <Button variant={'contained'} color={'primary'}>Add pack</Button>
            <InputLabel>Name pack</InputLabel>
            <Input className={auth.input} value={name} onChange={enterNameHandler}/>
            <IconButton component="label">
                <CloudUploadIcon/>
                {/*<Button>Download cover for pack</Button>*/}
                <input type="file"
                       onChange={uploadHandler}
                       style={{display: 'none'}}
                />
            </IconButton>
            <FormControlLabel className={auth.remMe} label={'Private pack'} name="private"
                              control={<Checkbox value={privateValue} onClick={() => setPrivateValue(!privateValue)}/>}/>
            <Button variant={'contained'} color={'primary'} onClick={addPackHandler}>Save</Button>

        </BasicModal>

    );
}

