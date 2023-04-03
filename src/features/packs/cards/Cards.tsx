import React, {useEffect} from 'react';
import s from "../Packs.module.css";
import {PATH} from "../../../app/Path";
import {BackToRouteButton} from "../../components/backToRouteButton/BackToRouteButton";
import {getCardsTC, setSearchParamsCardsAC} from "./cards-reducer";
import {useParams} from "react-router-dom";
import {store, useAppDispatch, useAppSelector} from "../../../app/store";
import {
  getCardsPack_idParamsSelector,
  packNameSelector,
  packUserIdSelector,
  userIdSelector
} from "../../../app/selectors";
import {PageTitle} from "../../components/pageTitle/PageTitle";
import {SubHeader} from "../../components/subHeader/SubHeader";

export const Cards = () => {
  const params = useParams<"packId">()
  const dispatch = useAppDispatch()

  const cardsPack_id = useAppSelector(getCardsPack_idParamsSelector)

  const packUserId = useAppSelector(packUserIdSelector)

  const userId = useAppSelector(userIdSelector)

  const packName = useAppSelector(packNameSelector)

  useEffect(() => {
    dispatch(setSearchParamsCardsAC({cardsPack_id:params.packId }))
    dispatch(getCardsTC())
}, [])


  const isMyPack = userId === packUserId
  return (
    <div>
      <BackToRouteButton title={"Back to Packs List"} route={PATH.PACKS}/>
      <div className={s.componentContainer}>
        <div className={s.headContainer}>

         {/* {userId === packUserId ?
            :
          }*/}
          <SubHeader title={"res"} isLoading={true}  titleButton = { isMyPack ?"My":"No"} onClick={isMyPack ?() => console.log("my"): () =>console.log("no")} disabled={false}/>

        </div>

      </div>
    </div>

  );
};

