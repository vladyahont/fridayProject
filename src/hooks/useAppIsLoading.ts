import {useAppSelector} from "../app/store";
import {appStatusSelector} from "../app/selectors";

export const useAppIsLoading = () => {
  const appStatus = useAppSelector(appStatusSelector)
  return appStatus === "loading"
};