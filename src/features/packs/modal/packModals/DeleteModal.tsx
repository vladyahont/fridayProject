import React from 'react';
import {useAppDispatch, useAppSelector} from "app/store";
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
        <div>111</div>
        // <BasicModal childrenTitle={<h4>Delete pack</h4>}>
        //     {(cb) => (
        //         <div>
        //             <div>Do you really want ro remove <span style={{fontWeight: '600'}}>{packName}</span>?
        //                 All cards will be deleted
        //             </div>
        //             <Button variant={'contained'} color={'error'} onClick={() => deletePackHandler(props.id)}>Delete</Button>
        //         </div>
        //
        //     )}
        // </BasicModal>

    );
}

const initialValuesAddPack = {
    name: '',
    private: false
}

