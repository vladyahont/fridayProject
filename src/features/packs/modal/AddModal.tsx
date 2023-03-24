import React from 'react';
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


export const AddModal = () => {

    const dispatch = useAppDispatch()

    return (
        <BasicModal childrenTitle={<h4>Add new pack</h4>}>
            {(cb) => (
                <Formik
                    initialValues={initialValuesAddPack}
                    onSubmit={values => {
                        dispatch(addPackTC(values))
                        cb()
                    }}>
                    {(formik) => (
                        <Form onSubmit={formik.handleSubmit}>
                            <FormGroup style={{marginTop: '0'}}>
                                <InputLabel>Name pack</InputLabel>
                                <Input className={auth.input} name="name"/>
                                <FormControlLabel className={auth.remMe} label={'Private pack'} name="private"
                                                  control={<Checkbox/>}/>
                                <Button type={'submit'} variant={'contained'} color={'primary'}>Save</Button>
                            </FormGroup>
                        </Form>
                    )}
                </Formik>)}
        </BasicModal>

    );
}

const initialValuesAddPack = {
    name: '',
    private: false
}

