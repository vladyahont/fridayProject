import React from 'react';

import {BackToRouteButton} from "../../components/backToRouteButton/BackToRouteButton";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {
  appStatusSelector,
  getCardQuestionParamsSelector,
  packNameSelector,
  packUserIdSelector,
  userIdSelector
} from "../../../app/selectors";

import {SubHeader} from "../../components/subHeader/SubHeader";
import {ImgBox} from "../../components/imgBox/ImgBox";
import {useCardsFetch} from "./useCardsFetch";
import {CardsTable} from "./cardsTable/CardsTable";
import {SearchInput} from "../../components/searchInput/SearchInput";
import {setSearchParamsCardsAC} from "./cards-reducer";

import noCover from "./../../../assest/imgs/noCover.png"
import {PATH} from "../../../app/Path";
import {FilterContainer} from "../../components/filterContainer/FilterContainer";
export const Cards = () => {

  const dispatch = useAppDispatch()


  const packUserId = useAppSelector(packUserIdSelector)
  const userId = useAppSelector(userIdSelector)
  const packName = useAppSelector(packNameSelector)


  useCardsFetch()

  const isMyPack = userId === packUserId
  const appStatus = useAppSelector(appStatusSelector)
  const isLoading = appStatus === "loading"

  const searchValue = useAppSelector(getCardQuestionParamsSelector)
  const onSearchChange = (search: string) => {
    dispatch(setSearchParamsCardsAC({ cardQuestion: search }))
  }
  return (
    <>
      <BackToRouteButton title={"Back to Packs List"} route={PATH.PACKS}/>
      <SubHeader title={packName}
                   isLoading={isLoading}
                   titleButton={isMyPack ? "Add new card" : "Learn to pack"}
                   onClick={isMyPack ? () => console.log("my") : () => console.log("learn")} disabled={false}/>
      <ImgBox defaultImg={noCover} sx = { {alignSelf:"flex-start"}} />
      <FilterContainer>
        <SearchInput disabled={isLoading} searchValue={searchValue} onChangeSearchValue={onSearchChange}/>
      </FilterContainer>
      <CardsTable />
    </>

  );
};

