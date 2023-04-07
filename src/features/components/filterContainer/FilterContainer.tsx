import React, {PropsWithChildren} from 'react';
import {Grid, SxProps} from "@mui/material";

const FilterContainerStyles: SxProps = {
  justifyContent: 'space-between',
  alignItems: "center",
  padding: 3,
  marginBottom: 3,
}
export const FilterContainer = ({children}: PropsWithChildren) => <Grid
  container
  sx={FilterContainerStyles}
>
  {children}
</Grid>

