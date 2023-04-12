import React from "react";
import {PackTable} from "./packTable/PacksTable";
import {PacksFilterPanel} from "./packsFilterPanel/PacksFilterPanel";

import {SubHeaderTable} from "../../components/subHeaderTable/SubHeaderTable";
import {useAppIsLoading} from "../../../hooks/useAppIsLoading";
import {Container} from "../../components/container/Container";
import {usePacksFetch} from "./hooks/usePacksFetch";
import {useModals} from "../../modals/useModals";
import {BasicModal} from "../../modals/modal/BasicModal";
import {PackModal} from "../../modals/modal/packModals/PackModal";


export const Packs = () => {

  const isLoading = useAppIsLoading()

  usePacksFetch()

  const {modalData, isEdit, isAdd, isDelete, closeModal, showModal} = useModals()

  const {name} = modalData

  return (
    <Container>
      <SubHeaderTable
        isLoading={isLoading}
        title={'Pack list'}
        titleButton={'Add pack'}
        onClick={() => showModal("add", {name: "test"})}
      />

      <PacksFilterPanel/>
      <PackTable/>

     <PackModal open={isAdd} closeModal={closeModal} title={"Add new pack"}/>
     <PackModal open={isEdit} closeModal={closeModal} title={"Edit pack"}/>

    </Container>
  )
}