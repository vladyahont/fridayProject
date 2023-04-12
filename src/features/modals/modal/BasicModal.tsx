import * as React from 'react';
import {FC, ReactNode} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from "@mui/material/Typography";

import CloseIcon from '@mui/icons-material/Close'
import {IconButton} from "@mui/material";
import {containerStyle, headerStyle} from "./basicModal.styles";

type PropsType = {
  open: boolean
  title: string,
  onClose: () => void
  children: ReactNode
}

export const BasicModal: FC<PropsType> = ({open, title, onClose, children}) => {
  return (<Modal
      open={open}
      onClose={onClose}
    >
      <Box sx={containerStyle}>
        <Box sx={headerStyle}>
          <Typography>
            {title}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon/>
          </IconButton>
        </Box>
        {children}
      </Box>
    </Modal>
  );
};