import React from 'react';
import {addCardTC, deleteCardTC, updateCardTC} from "../cards-reducer";
import {UpdateCardType} from "../../packPage/packTypes";
import {useAppDispatch, useAppSelector} from "../../../../app/store";
import {packDeckCoverSelector, packNameSelector, packUserIdSelector} from "../cardSelector";
import {userIdSelector} from "../../../../app/selectors";

const UseCards = () => {
  const dispatch = useAppDispatch()

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
        addCardTC({...data}
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

export default UseCards;