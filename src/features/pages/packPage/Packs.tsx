import React from "react";
import {PackTable} from "./packTable/PacksTable";
import {PacksFilterPanel} from "./packsFilterPanel/PacksFilterPanel";

import {SubHeaderTable} from "../../components/subHeaderTable/SubHeaderTable";
import {useAppIsLoading} from "../../../hooks/useAppIsLoading";
import {Container} from "../../components/container/Container";
import {usePacksFetch} from "./hooks/usePacksFetch";
import {useModals} from "../../modals/useModals";
import {BasicModal} from "../../modals/modal/BasicModal";


export const Packs = () => {

  const isLoading = useAppIsLoading()

  usePacksFetch()
  const {modalData, isEdit,isAdd,isDelete, closeModal, showModal} = useModals()
  const {name} = modalData
  return (
    <Container>
      <SubHeaderTable
        isLoading={isLoading}
        title={'Pack list'}
        titleButton={'Add pack'}
        onClick={() => showModal("add", {name:"test"})}
      />

      <PacksFilterPanel/>
      <PackTable/>

      <BasicModal open={isEdit}
                  onClose={closeModal}
      >
        <h4>Edit pack  {name}</h4>
      </BasicModal>
      <BasicModal open={isAdd}
                  onClose={closeModal}
      >
        <h4>Add new pack {name}</h4>
      </BasicModal>
      <BasicModal open={isDelete}
                  onClose={closeModal}
      >
        <h4>Delete pack {name}</h4>
      </BasicModal>
    </Container>
  )
}