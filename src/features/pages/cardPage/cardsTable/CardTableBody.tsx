import React from 'react';
import {CardTableRow} from "./CardTableRow";
import {useAppSelector} from "../../../../app/store";
import {cardsSelector} from "../cardSelector";

export const CardTableBody = () => {

  const cards = useAppSelector(cardsSelector)

  const cardsRows = cards.map((card) =>
    <CardTableRow key = {card._id}
                  _id={card._id}
                  question={card.question}
                  answer={card.answer}
                  created={card.created}
                  grade={card.grade}/>
  )
  return (
    <>
      {cardsRows}
    </>
  );
};

