import React from 'react';
import {Grid} from "@mui/material";
import Button from '@mui/material/Button'
import {PageTitle} from "../pageTitle/PageTitle";
import {subHeaderBtnStyles, subHeaderTitleStyles} from "./subHeaderTitle.styles";


type SubHeaderProps = {
  title: string,
  titleButton?: string,
  onClick?: () => void | undefined,
  isLoading?: boolean,
  disabled?: boolean,
}

export const SubHeaderTable = ({
                     title,
                     titleButton,
                     onClick,
                     isLoading,
                     disabled,
                   }: SubHeaderProps
) => {
  return (
    <Grid container justifyContent={"space-between"} alignItems={"center"}>
      <PageTitle sx={subHeaderTitleStyles} isLoading={isLoading} >
        {title}
      </PageTitle>
      {titleButton && (
        <Button onClick={onClick} disabled={disabled? disabled:isLoading} variant={"contained"} sx = {subHeaderBtnStyles}>
          {titleButton}
        </Button>
      )}
    </Grid>
  );
};