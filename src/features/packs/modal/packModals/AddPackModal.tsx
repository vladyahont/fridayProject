import React, {ChangeEvent, memo, useState} from 'react';
import {Input, InputLabel} from "@material-ui/core";
import auth from "features/auth/auth.module.css";
import Button from '@mui/material/Button/Button';
import {addPackTC} from "features/packs/packs-reducer";
import {useAppDispatch, useAppSelector} from "app/store";
import {NewPackType} from "features/packs/packTypes";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton/IconButton";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {BasicModal} from "features/packs/modal/BasicModal";
import {appStatusSelector} from "app/selectors";
import {fileConverter} from "utils/add-img-utils";

export const AddPackModal = memo(() => {

    const appStatus = useAppSelector(appStatusSelector)

    const dispatch = useAppDispatch()


    const [open, setOpen] = useState(false)
    const [name, setPackName] = useState('')
    const [privateValue, setPrivateValue] = useState(false)
    const [img, setImg] = useState('')

    const onClose = () => setOpen(false)
    const onOpen = () => setOpen(true)

    const enterNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.currentTarget.value
        if (name) {
            setPackName(name)
        }
    }
    const addPackHandler = () => {
        const cardsPack: NewPackType = {name, private: privateValue}
        dispatch(addPackTC(cardsPack))
        setPackName('')
        onClose()
    }

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const reader = fileConverter(e.target.files)
        console.log('reader => ', reader)
        if (reader instanceof FileReader) {

            setImg(reader.result as string)
        }
    };

    return (
        <div>
            <Button variant={'contained'}
                    onClick={onOpen}
                    disabled={appStatus === 'loading'}>
                <div>Add new pack</div>
            </Button>
            <BasicModal open={open} onClose={onClose}>
                <h4>Add new pack</h4>
                <InputLabel>Name pack</InputLabel>
                <Input className={auth.input} value={name} onChange={enterNameHandler}/>
                <label>
                    <input type="file"
                           onChange={uploadHandler}
                           style={{display: 'none'}}
                    />
                    <Button variant='contained' component='span'>Download cover for pack</Button>
                </label>
                <FormControlLabel className={auth.remMe} label={'Private pack'}
                                  control={<Checkbox value={privateValue}
                                                     onClick={() => setPrivateValue(!privateValue)}/>}/>
                {name ? <Button variant={'contained'} color={'primary'} onClick={addPackHandler}>Save</Button>
                    : <Button disabled={true}>Save</Button>}
                <Button variant={'outlined'} color={'primary'} onClick={onClose}>Cancel</Button>
            </BasicModal>
        </div>
    );
})