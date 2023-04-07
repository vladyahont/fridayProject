import {Grid, SxProps} from "@mui/material";
import React, {PropsWithChildren} from "react";

const ContainerStyles: SxProps = {
  width: "80%",
  flexDirection: "column",
  flexWrap: "nowrap",
  justifyContent: 'center',
  alignItems: 'center',
  padding: 3,
  marginBottom: 3,
  margin: "40px auto",
}
export const Container = ({children}: PropsWithChildren) => <Grid
  sx = {ContainerStyles}
  container
>
  {children}
</Grid>

