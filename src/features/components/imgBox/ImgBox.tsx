import React from 'react';
import Box from "@mui/material/Box";
import {SxProps} from "@mui/material";

type ImgBoxType = {
  img?: string,
  width?: string,
  height?: string,
  defaultImg:string,
  sx?: SxProps
}

export const ImgBox = ({
                         img,
                         width = "150px",
                         height = "100%",
                         defaultImg,
                         sx,
                       }: ImgBoxType) => {
  return (
    <Box sx={sx}>
      {img?
        <img src={img} style={{height, width, objectFit: 'contain'}} alt="Some image"/>
      :
        <img src={defaultImg} style={{height, width, objectFit: 'contain'}} alt="Default image"/>
      }
    </Box>
  );
};


