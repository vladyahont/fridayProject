import React from 'react';

import {BackToRouteButton} from "../../components/backToRouteButton/BackToRouteButton";
import {useAppSelector} from "../../../app/store";
import {userIdSelector} from "../../../app/selectors";


import {ImgBox} from "../../components/imgBox/ImgBox";
import {useCardsFetch} from "./hooks/useCardsFetch";
import {CardsTable} from "./cardsTable/CardsTable";

import noCover from "./../../../assest/imgs/noCover.png"
import {PATH} from "../../../app/Path";
import {useAppIsLoading} from "../../../hooks/useAppIsLoading";
import {CardFilterPanel} from "./cardFilterPanel/CardFilterPanel";
import {packNameSelector, packUserIdSelector} from "./cardSelector";
import {SubHeaderTable} from "../../components/subHeaderTable/SubHeaderTable";
import {Container} from "../../components/container/Container";


export const Cards = () => {

  useCardsFetch()
  const isLoading = useAppIsLoading()

  const packUserId = useAppSelector(packUserIdSelector)
  const userId = useAppSelector(userIdSelector)
  const packName = useAppSelector(packNameSelector)
  const isMyPack = userId === packUserId

  return (
    <>
      <BackToRouteButton title={"Back to Packs List"} route={PATH.PACKS}/>
      <Container>
        <SubHeaderTable title={packName}
                        isLoading={isLoading}
                        titleButton={isMyPack ? "Add new card" : "Learn to pack"}
                        onClick={isMyPack ? () => console.log("my") : () => console.log("learn")}
                        disabled={isLoading}/>
        <ImgBox defaultImg={noCover} sx={{alignSelf: "flex-start"}}/>
        <CardFilterPanel/>
        <CardsTable/>
      </Container>
    </>
  );
};

