import {LinearProgress} from "@mui/material";
import React from "react";
import Box from "@mui/material/Box";
export const Loading = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress />
    </Box>
  );
};
