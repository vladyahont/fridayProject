import React from 'react';
import {useAppSelector} from "../../../../app/store";
import {packsSelector} from "../packSelectors";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {ImgBox} from "../../../components/imgBox/ImgBox";
import noCover from "../../../../assest/imgs/noCover.png";
import {useNavigate} from "react-router-dom";
import {useModals} from "../../../modals/useModals";

export const PackTableBody = () => {
  const packs = useAppSelector(packsSelector)
  const navigate = useNavigate()

  const {showModal} = useModals()

  const packRows = packs.map((pack) =>
    <TableRow key={pack._id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
      <TableCell
        style={{cursor: 'pointer', width: '350px'}}
        onClick={() => navigate(`/packs/${pack._id}`)}
        component="th"
        scope="row"
      >
        <ImgBox img={pack.deckCover}
                defaultImg={noCover}
                width={'100px'}
                height={'40px'}
                sx={{alignSelf: "flex-start"}}/>
        {pack.name}
      </TableCell>
      <TableCell align="left">{pack.cardsCount}</TableCell>
      <TableCell align="left">{pack.updated.substring(0, 10)}</TableCell>
      <TableCell align="left">{pack.user_name}</TableCell>
      <TableCell align="left">
        <div onClick={() => showModal("delete",{name:pack.name})}>
          Delete
        </div>
        <div onClick={() => showModal("edit",{name:pack.name})}>
          Edit
        </div>
      </TableCell>
    </TableRow>)
  return (<>
      {packRows}
    </>
  );
};
