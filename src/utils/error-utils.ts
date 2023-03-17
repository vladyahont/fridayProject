import {setAppErrorAC, setAppErrorACActionType} from "../app/app-reducer";
import {Dispatch} from "redux";
import axios, {AxiosError} from "axios";
export const errorUtils = (e: Error | AxiosError<{error: string}>, dispatch:ErrorUtilsDispatchType) => {
  const err = e as Error | AxiosError<{ error: string }>
  if (axios.isAxiosError(err)) {
    const error = err.response?.data ? err.response.data.error : err.message
    dispatch(setAppErrorAC(error))
    console.log(error)
  } else {
    dispatch(setAppErrorAC(`Native error ${err.message}`))
  }
}

type ErrorUtilsDispatchType = Dispatch<setAppErrorACActionType>
