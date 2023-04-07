import {useAppDispatch, useAppSelector} from "../../../../app/store";
import {useParams, useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {getCardsTC, searchCardsAC} from "../cards-reducer";
import {
  cardPageCountParamsSelector,
  cardPageParamsSelector,
  cardQuestionParamsSelector,
  cardSortParamsSelector
} from "../cardSelector";

export const useCardsFetch = () => {

  const { packId } = useParams<{ packId: string }>()
  const dispatch = useAppDispatch()

  const cardsPageCountParam = useAppSelector(cardPageCountParamsSelector)
  const cardsPageParam = useAppSelector(cardPageParamsSelector)
  const cardsSearchValueParam = useAppSelector(cardQuestionParamsSelector)
  const cardsSortParam = useAppSelector(cardSortParamsSelector)

  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);


  useEffect(() => {
    dispatch(getCardsTC({ cardsPack_id: packId as string }))
  }, [cardsPageCountParam, cardsPageParam, cardsSearchValueParam, cardsSortParam])

  useEffect(() => {
    dispatch(searchCardsAC({ ...params,cardsPack_id: packId as string }))
  }, [])
};

