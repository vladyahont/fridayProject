import React, {useEffect, useState} from 'react';
import {Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";

type ChosePropsType =  {
  disabled:boolean,

  initValue:boolean,
  onFirstClick: () => void
  onSecondClick: () => void
}
export const Chose = ({
                        disabled,
                        initValue,
                        onFirstClick,
                        onSecondClick
}:ChosePropsType) => {

  const [switcher, setSwitcher] = useState(initValue)

  useEffect(() => {
    if (switcher) {
      onFirstClick()
    } else {
      onSecondClick()
    }
  }, [switcher])
  const onChangeHandler = () => {
    setSwitcher(!switcher)
  }

  return (
      <Stack  direction="row" spacing={1} alignItems="center" sx={{marginBottom: '20px'}}>
        <Typography>All</Typography>
        <Switch disabled={disabled}
                checked={switcher}
                onChange={onChangeHandler}
        />
        <Typography>My</Typography>
      </Stack>
  );
};
