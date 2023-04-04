import {useAppDispatch, useAppSelector} from "../../../app/store";
import {
  getCardQuestionParamsSelector,
  getCardsPageCountParamsSelector,
  getCardsPageParamsSelector, getSortCardsParamsSelector
} from "../../../app/selectors";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {getCardsTC, setSearchParamsCardsAC} from "./cards-reducer";

export const useCardsFetch = () => {

  const { packId } = useParams<{ packId: string }>()
  const dispatch = useAppDispatch()

  const cardsPageCountParam = useAppSelector(getCardsPageCountParamsSelector)
  const cardsPageParam = useAppSelector(getCardsPageParamsSelector)
  const cardsSearchValueParam = useAppSelector(getCardQuestionParamsSelector)
  const cardsSortParam = useAppSelector(getSortCardsParamsSelector)



  useEffect(() => {
    dispatch(getCardsTC({ cardsPack_id: packId as string }))
  }, [cardsPageCountParam, cardsPageParam, cardsSearchValueParam, cardsSortParam])

  useEffect(() => {
    dispatch(setSearchParamsCardsAC({ cardsPack_id: packId as string }))
  }, [])
};

