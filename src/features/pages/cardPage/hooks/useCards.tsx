import React from 'react';
import {addCardTC, deleteCardTC, updateCardTC} from "../cards-reducer";
import {UpdateCardType} from "../../packPage/packTypes";
import {useAppDispatch, useAppSelector} from "../../../../app/store";
import {packDeckCoverSelector, packNameSelector, packUserIdSelector} from "../cardSelector";
import {userIdSelector} from "../../../../app/selectors";
import {useParams} from "react-router-dom";

const useCards = () => {
  const dispatch = useAppDispatch()

  const { packId } = useParams<{ packId: string }>()

  const packUserId = useAppSelector(packUserIdSelector)
  const userId = useAppSelector(userIdSelector)
  const packName = useAppSelector(packNameSelector)
  const packDeckCover = useAppSelector(packDeckCoverSelector)
  const isMy = userId === packUserId
  const removeCard = (_id: string) => {
    return () => dispatch(deleteCardTC(_id))
  }
  const editCard = (_id: string) => {
    return (data: UpdateCardType) => {
      dispatch(
        updateCardTC({...data, _id}
        )
      )
    }
  }
  const addCard = () => {
    return (data: any) => {
      dispatch(
        addCardTC({
            cardsPack_id: packId as string,
            answer: data.answer || undefined,
            question: data.question || undefined,
          }
        )
      )
    }
  }

  return (
    {
      packName,
      packDeckCover,
      isMy,
      removeCard,
      addCard,
      editCard
    }
  );
};

export default useCards;