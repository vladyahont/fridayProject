import React from 'react';
import {useAppSelector} from "../../../../app/store";
import {cardsSelector, packUserIdSelector} from "../cardSelector";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {IconButton} from "@mui/material";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined'
import {userIdSelector} from "../../../../app/selectors";
import {useModals} from "../../../modals/useModals";

export const CardTableBody = () => {

  const cards = useAppSelector(cardsSelector)
  const packUserId = useAppSelector(packUserIdSelector)
  const _id = useAppSelector(userIdSelector)
  const isMe = packUserId === _id

  const {showModal} = useModals()

  const cardsRows = cards.map((card) =>
    <TableRow key={card._id}>
      <TableCell>{card.question} </TableCell>
      <TableCell>{card.answer} </TableCell>
      <TableCell>{card.created} </TableCell>
      <TableCell>
        <div>
          {isMe && (
            <span>
              <IconButton
                onClick={showModal('edit', {
                  _id: card._id,
                  answer: card.answer,
                  question: card.question,
                  questionImg:card.questionImg,
                  answerImg:card.answerImg,
                })}
              >
                <BorderColorOutlinedIcon/>
              </IconButton>
              <IconButton onClick={showModal('delete', {_id: card._id})}>
                <DeleteOutlinedIcon/>
              </IconButton>
            </span>
          )}
        </div>
      </TableCell>
    </TableRow>
  )
  return (
    <>
      {cardsRows}
    </>
  );
};

