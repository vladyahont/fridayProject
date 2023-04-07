import React from 'react';

import {BackToRouteButton} from "../../components/backToRouteButton/BackToRouteButton";
import {useAppSelector} from "../../../app/store";
import {packNameSelector, packUserIdSelector, userIdSelector} from "../../../app/selectors";

import {SubHeader} from "../../components/subHeader/SubHeader";
import {ImgBox} from "../../components/imgBox/ImgBox";
import {useCardsFetch} from "./useCardsFetch";
import {CardsTable} from "./cardsTable/CardsTable";

import noCover from "./../../../assest/imgs/noCover.png"
import {PATH} from "../../../app/Path";
import {useAppIsLoading} from "../../../hooks/useAppIsLoading";
import {CardFilterPanel} from "./cardFilterPanel/CardFilterPanel";

export const Cards = () => {


  const packUserId = useAppSelector(packUserIdSelector)
  const userId = useAppSelector(userIdSelector)
  const packName = useAppSelector(packNameSelector)

  const isLoading = useAppIsLoading()
  useCardsFetch()

  const isMyPack = userId === packUserId


  return (
    <>
      <BackToRouteButton title={"Back to Packs List"} route={PATH.PACKS}/>
      <SubHeader title={packName}
                   isLoading={isLoading}
                   titleButton={isMyPack ? "Add new card" : "Learn to pack"}
                   onClick={isMyPack ? () => console.log("my") : () => console.log("learn")} disabled={false}/>
      <ImgBox  defaultImg={noCover} sx = { {alignSelf:"flex-start"}} />
      <CardFilterPanel isLoading={isLoading}/>
      <CardsTable />
    </>

  );
};

