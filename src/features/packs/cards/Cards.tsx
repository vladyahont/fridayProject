import React, {useEffect} from 'react';
import s from "../Packs.module.css";
import {PATH} from "../../../app/Path";
import {BackToRouteButton} from "../../components/backToRouteButton/BackToRouteButton";
import {getCardsTC, setSearchParamsCardsAC} from "./cards-reducer";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {
  appStatusSelector,
  getCardsPack_idParamsSelector,
  packNameSelector,
  packUserIdSelector,
  userIdSelector
} from "../../../app/selectors";
import noCover from "./../../../assest/imgs/noCover.png"
import {SubHeader} from "../../components/subHeader/SubHeader";
import {ImgBox} from "../../components/imgBox/ImgBox";

export const Cards = () => {
  const params = useParams<"packId">()
  const dispatch = useAppDispatch()

  const cardsPack_id = useAppSelector(getCardsPack_idParamsSelector)
  const appStatus = useAppSelector(appStatusSelector)

  const packUserId = useAppSelector(packUserIdSelector)

  const userId = useAppSelector(userIdSelector)

  const packName = useAppSelector(packNameSelector)

  useEffect(() => {
    dispatch(setSearchParamsCardsAC({cardsPack_id: params.packId}))
    dispatch(getCardsTC())
  }, [])


  const isMyPack = userId === packUserId


  const isLoading = appStatus === "loading"
  return (
    <div>
      <BackToRouteButton title={"Back to Packs List"} route={PATH.PACKS}/>
      <div className={s.componentContainer}>
        <SubHeader title={packName}
                   isLoading={isLoading}
                   titleButton={isMyPack ? "Add new card" : "Learn to pack"}
                   onClick={isMyPack ? () => console.log("my") : () => console.log("no")} disabled={false}/>
        <ImgBox defaultImg={noCover} sx = { {alignSelf:"flex-start"}} />
      </div>
    </div>

  );
};

