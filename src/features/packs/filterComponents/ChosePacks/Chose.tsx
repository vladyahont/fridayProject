import React, {useEffect, useState} from 'react';
import {Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import {getPackssTC} from "../../packs-reducer";
import {useAppDispatch, useAppSelector} from "../../../../app/store";
import {useSearchParams} from "react-router-dom";
import {appStatusSelector, userIdSelector} from "../../../../app/selectors";

export const ChosePack = () => {
  const [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams();
  const params = Object.fromEntries(searchParams)

  //const [switcher, setSwitcher] = useState(!!searchParams.get("user_id"))
  const [switcher, setSwitcher] = useState(!!searchParams.get("user_id"))

  useEffect(() => {
      setSwitcher(searchParams.has("user_id"))
    }, [searchParams])

  const dispatch = useAppDispatch();

  const userID = useAppSelector(userIdSelector);
  const appStatus = useAppSelector(appStatusSelector);



  useEffect(() => {
    if (switcher) {
      /*dispatch(getPackssTC( {...params, user_id: userID } ));*/
      setSearchParams({ ...params, user_id: userID });
    } else {
      delete params.user_id
      setSearchParams(params);
/*      dispatch(getPackssTC(params))*/
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
