import React from 'react';
import s from "../Packs.module.css";
import {PATH} from "../../../app/Path";
import {BackToRouteButton} from "../../components/backToRouteButton/BackToRouteButton";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {appStatusSelector, packNameSelector, packUserIdSelector, userIdSelector} from "../../../app/selectors";
import noCover from "./../../../assest/imgs/noCover.png"
import {SubHeaderTable} from "../../components/subHeaderTable/SubHeaderTable";
import {ImgBox} from "../../components/imgBox/ImgBox";
import {useCardsFetch} from "./useCardsFetch";
import {CardsTable} from "./cardsTable/CardsTable";

export const Cards = () => {

  const dispatch = useAppDispatch()

  const appStatus = useAppSelector(appStatusSelector)
  const packUserId = useAppSelector(packUserIdSelector)
  const userId = useAppSelector(userIdSelector)
  const packName = useAppSelector(packNameSelector)


  useCardsFetch()

  const isMyPack = userId === packUserId
  const isLoading = appStatus === "loading"

  return (
    <div>
      <BackToRouteButton title={"Back to Packs List"} route={PATH.PACKS}/>
      <div className={s.componentContainer}>
        <SubHeaderTable title={packName}
                        isLoading={isLoading}
                        titleButton={isMyPack ? "Add new card" : "Learn to pack"}
                        onClick={isMyPack ? () => console.log("my") : () => console.log("learn")} disabled={false}/>
        <ImgBox defaultImg={noCover} sx = { {alignSelf:"flex-start"}} />
      </div>
      <CardsTable />
    </div>

  );
};

