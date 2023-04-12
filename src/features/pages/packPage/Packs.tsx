import React from "react";
import {PackTable} from "./packTable/PacksTable";
import {PacksFilterPanel} from "./packsFilterPanel/PacksFilterPanel";

import {SubHeaderTable} from "../../components/subHeaderTable/SubHeaderTable";
import {useAppIsLoading} from "../../../hooks/useAppIsLoading";
import {Container} from "../../components/container/Container";
import {usePacksFetch} from "./hooks/usePacksFetch";
import {useModals} from "../../modals/useModals";
import {PackModal} from "../../modals/modal/packModals/PackModal";
import {addPackTC, deletePackTC, updatePackTC} from "./packs-reducer";
import {useAppDispatch} from "../../../app/store";
import {NewPackType, UpdatePackType} from "./packTypes";
import noCover from './../../../assest/imgs/noCover.png'
import {DeleteModal} from "../../modals/modal/DeleteModal";


export const Packs = () => {

  const isLoading = useAppIsLoading()
  const dispatch = useAppDispatch()

  usePacksFetch()

  const {modalData:{_id,deckCover}, isEdit, isAdd, isDelete, showModal} = useModals()
  const removePack = (_id: string) => {
    return () => dispatch(deletePackTC(_id))
  }
  const editPack = (_id: string, deckCover: string) => {
    return (data: UpdatePackType) => {
      dispatch(
        updatePackTC({...data, _id, deckCover}
        )
      )
    }
  }
  const addPack = (deckCover: string) => {
    return (data: NewPackType) => {
      dispatch(
        addPackTC({...data, deckCover}
        )
      )
    }
  }
  return (
    <Container>
      <SubHeaderTable
        isLoading={isLoading}
        title={'Pack list'}
        titleButton={'Add pack'}
        onClick={() => showModal("add", {_id: "", name: "", deckCover: noCover})}
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