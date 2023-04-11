import {useEffect} from 'react';

import {getPacksTC, searchPackAC} from "../packs-reducer";
import {useSearchParams} from "react-router-dom";
import {useAppDispatch} from "../../../../app/store";

export const usePacksFetch = () => {

  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams();
  const searchParamsObject = Object.fromEntries(searchParams);

  useEffect(() => {
    dispatch(searchPackAC({...searchParamsObject}))
  }, [])

  useEffect(() => {
    console.log({...searchParamsObject})
    dispatch(getPacksTC())
  }, [searchParams])


};

