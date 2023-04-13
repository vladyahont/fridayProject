import React from 'react';
import {BasicModal} from "../BasicModal";

import {useModals} from "../../useModals";
import {PackModalForm} from "./PackModalForm";
import noCover from "./../../../../assest/imgs/noCover.png"

type PackModalProps = {
  title: string
  open: boolean,
  onSubmit: (data: any) => void,
}
export const PackModal = ({
                            open,
                            title,
                            onSubmit,
                          }: PackModalProps) => {
  const {modalData:{name,deckCover},closeModal,setDeckCover} = useModals()

  return (
    <BasicModal open={open}
                onClose={closeModal}
                title={title}
    >
      <PackModalForm name={name || ''}
                 onSubmit={onSubmit}
                 deckCover={deckCover || noCover}
                 setDeckCover={setDeckCover}
                 closeModal={closeModal}/>
    </BasicModal>
  );
};
