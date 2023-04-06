import {useAppDispatch, useAppSelector} from "../../../app/store";
import {
  getCardQuestionParamsSelector,
  getCardsPageCountParamsSelector,
  getCardsPageParamsSelector, getSortCardsParamsSelector
} from "../../../app/selectors";
import {useParams, useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {getCardsTC, setSearchParamsCardsAC} from "./cards-reducer";

export const useCardsFetch = () => {

  const { packId } = useParams<{ packId: string }>()
  const dispatch = useAppDispatch()

  const cardsPageCountParam = useAppSelector(getCardsPageCountParamsSelector)
  const cardsPageParam = useAppSelector(getCardsPageParamsSelector)
  const cardsSearchValueParam = useAppSelector(getCardQuestionParamsSelector)
  const cardsSortParam = useAppSelector(getSortCardsParamsSelector)

  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);


  useEffect(() => {
    dispatch(getCardsTC({ cardsPack_id: packId as string }))
  }, [cardsPageCountParam, cardsPageParam, cardsSearchValueParam, cardsSortParam])

  useEffect(() => {
    dispatch(setSearchParamsCardsAC({ ...params,cardsPack_id: packId as string }))
  }, [])
};

