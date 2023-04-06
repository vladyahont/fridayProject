import {ChangeEvent, useEffect, useState} from "react";
import {useDebounce} from "../hooks/useDebounce";
import {useAppSelector} from "./store";
import {appStatusSelector} from "./selectors";

export const useAppIsLoading = () => {
  const appStatus = useAppSelector(appStatusSelector)
  return appStatus === "loading"
};