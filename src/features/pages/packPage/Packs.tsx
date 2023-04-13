import React from "react";
import {PackTable} from "./packTable/PacksTable";
import {PacksFilterPanel} from "./packsFilterPanel/PacksFilterPanel";

import {SubHeaderTable} from "../../components/subHeaderTable/SubHeaderTable";
import {useAppIsLoading} from "../../../hooks/useAppIsLoading";
import {Container} from "../../components/container/Container";
import {usePacksFetch} from "./hooks/usePacksFetch";
import {useModals} from "../../modals/useModals";
import {PackModal} from "../../modals/modal/packModals/PackModal";
import noCover from './../../../assest/imgs/noCover.png'
import {DeleteModal} from "../../modals/modal/DeleteModal";
import {usePacks} from "./hooks/usePacks";


export const Packs = () => {

  const isLoading = useAppIsLoading()

  usePacksFetch()

  const {modalData:{_id,deckCover}, isEdit, isAdd, isDelete, showModal} = useModals()
  const {removePack, editPack, addPack} = usePacks()

  return (
    <Container>
      <SubHeaderTable
        isLoading={isLoading}
        title={'Pack list'}
        titleButton={'Add pack'}
        onClick={showModal("add", {deckCover: noCover})}
      />

      <PacksFilterPanel/>
      <PackTable/>
      <PackModal title={"Edit pack"}
                 open={isEdit}
                 onSubmit={editPack(_id, deckCover)}
      />
      <PackModal title={"Add pack"}
                 open={isAdd}
                 onSubmit={addPack(deckCover)}
      />
      <DeleteModal title={"Delete pack"}
                   open={isDelete}
                   onDelete={removePack(_id)}/>
    </Container>
  )
}