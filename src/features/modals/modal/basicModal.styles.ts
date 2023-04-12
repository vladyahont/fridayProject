import {SxProps} from "@mui/material";

export const containerStyle: SxProps = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  outline: 0,
  padding: "5px 10px",
  boxShadow: 24,
 /* p: 4,*/
}
export const headerStyle:SxProps={
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center",
  borderBottom: "1px solid black"
}