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


export const Packs = () => {

  const isLoading = useAppIsLoading()
  const dispatch = useAppDispatch()

  usePacksFetch()

  const {modalData, isEdit, isAdd, isDelete, closeModal, showModal} = useModals()
  const {_id,name} = modalData

  const removePack = (_id: string) => {
    return () => dispatch(deletePackTC(_id))
  }
  const editPack = (_id: string, name: string) => {
    return (data: UpdatePackType) => {
      dispatch(
        updatePackTC({...data, _id, name: "edited"}
        )
      )
    }
  }
  const addPack = () => {
    return (data: NewPackType) => {
      dispatch(
        addPackTC({...data, name:"added"}
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
        onClick={() => showModal("add", {_id:"",name:""})}
      />

      <PacksFilterPanel/>
      <PackTable/>

      <PackModal open={isDelete} closeModal={closeModal} title={"Delete pack"} onSubmit={removePack(_id)}/>
      <PackModal open={isEdit} closeModal={closeModal} title={"Edit pack"} onSubmit={editPack(_id,"")}/>
      <PackModal open={isAdd} closeModal={closeModal} title={"Add pack"} onSubmit={addPack()}/>

    </Container>
  )
}