import React, {PropsWithChildren} from 'react';
import Typography from '@mui/material/Typography'
import {Skeleton, SxProps} from "@mui/material";

type PageTitleProps = {
  isLoading?: boolean,
  sx?: SxProps
}

export const PageTitle = ({isLoading,children,sx}: PageTitleProps & PropsWithChildren) => {
  return  ( <Typography sx={sx} variant={'h2'} fontSize={22} fontWeight={600}>
  {isLoading ? (
      <Skeleton
        sx={sx}
        variant={'text'}
      />
    ) : (
      children
    )}
  </Typography>)
};

