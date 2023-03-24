import React from 'react';
import {BasicModal} from "./BasicModal";
import {useAppDispatch, useAppSelector} from "app/store";
import Button from "@mui/material/Button/Button";
import {deletePackTC} from "features/packs/packs-reducer";

type PropsType = {
    id: string
}

export const DeleteModal = (props: PropsType) => {

    const dispatch = useAppDispatch()
    const packName = useAppSelector(state => state.packs.params.packName?.length)

    const deletePackHandler = (id: string) => {
        dispatch(deletePackTC('нужно прокинуть id'))
    }

    return (
        <BasicModal childrenTitle={<h4>Delete pack</h4>}>
            {(cb) => (
                <div>
                    <div>Do you really want ro remove <span style={{fontWeight: '600'}}>{packName}</span>?
                        All cards will be deleted
                    </div>
                    <Button variant={'contained'} color={'error'} onClick={() => deletePackHandler(props.id)}>Delete</Button>
                </div>

            )}
        </BasicModal>

    );
}

const initialValuesAddPack = {
    name: '',
    private: false
}

