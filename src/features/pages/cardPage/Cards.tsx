import React from 'react';

import {BackToRouteButton} from "../../components/backToRouteButton/BackToRouteButton";


import {ImgBox} from "../../components/imgBox/ImgBox";
import {useCardsFetch} from "./hooks/useCardsFetch";
import {CardsTable} from "./cardsTable/CardsTable";
import {PATH} from "../../../app/Path";
import {useAppIsLoading} from "../../../hooks/useAppIsLoading";
import {CardFilterPanel} from "./cardFilterPanel/CardFilterPanel";
import {SubHeaderTable} from "../../components/subHeaderTable/SubHeaderTable";
import {Container} from "../../components/container/Container";
import {CardModal} from "../../modals/modal/cardModals/CardModal";
import {useModals} from "../../modals/useModals";
import noCover from "./../../../assest/imgs/noCover.png"
import useCards from "./hooks/useCards";
import {DeleteModal} from "../../modals/modal/DeleteModal";


export const Cards = () => {

  useCardsFetch()

  const isLoading = useAppIsLoading()

  const {packName, packDeckCover, isMy, removeCard, addCard, editCard} = useCards()

  const {modalData:{_id}, isEdit, isAdd, isDelete, closeModal, showModal,setDeckCover} = useModals()

  return (
    <>
      <BackToRouteButton title={"Back to Packs List"} route={PATH.PACKS}/>
      <Container>
        <SubHeaderTable title={packName}
                        isLoading={isLoading}
                        titleButton={isMy ? "Add new card" : "Learn to pack"}
                        onClick={isMy ?showModal("add",{}) : () => console.log("learn")}
                        disabled={isLoading}/>
        <ImgBox defaultImg={noCover}  img ={packDeckCover} height={"250px"} width={"400px"} sx={{alignSelf: "flex-start"}}/>
        <CardFilterPanel/>
        <CardsTable/>
      </Container>
      <CardModal title={"Add new card"} open={isAdd} onSubmit={addCard()} />
      <DeleteModal title={"Delete card"} open={isDelete} onDelete={removeCard(_id)} />
    </>
  );
};

