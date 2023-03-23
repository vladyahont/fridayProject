import React from 'react';
import {BasicModal} from "./BasicModal";

export const AddModal = () => {
    return (
        <BasicModal childrenTitle={<h2>Add modal</h2>}>
            <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, vitae!</span>
            <button>Delete</button>
        </BasicModal>
    );
};

