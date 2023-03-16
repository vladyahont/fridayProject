import React, {useEffect, useState} from 'react';
import {Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";

import {useAppDispatch, useAppSelector} from "../../../../app/store";
import {appStatusSelector, userIdSearchSelector, userIdSelector} from "../../../../app/selectors";
import {setSearchParamsAC} from "../../packs-reducer";

export const ChosePack = () => {

  const userId= useAppSelector(userIdSelector)
  const userIdSearch= useAppSelector(userIdSearchSelector)


  const [switcher, setSwitcher] = useState(false)
  useEffect(() => {
    setSwitcher(!!userIdSearch)
  }, [userIdSearch])


  const dispatch = useAppDispatch();
  const appStatus = useAppSelector(appStatusSelector);

  useEffect(() => {
    if (switcher){
      dispatch(setSearchParamsAC({user_id:userId}))
    }else {
      dispatch(setSearchParamsAC({user_id:null}))
    }
  }, [switcher])

  const onChangeHandler = () => {
    setSwitcher(!switcher)
  }

  return (
    <div>
      <Stack  direction="row" spacing={1} alignItems="center" sx={{marginBottom: '20px'}}>
        <Typography>All</Typography>
        <Switch disabled={appStatus === "loading"}
                checked={switcher}
                onChange={onChangeHandler}
        />
        <Typography>My</Typography>
      </Stack>
    </div>
  );
};
