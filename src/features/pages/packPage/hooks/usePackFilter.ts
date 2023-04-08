import {useAppDispatch, useAppSelector} from "../../../../app/store";
import {useSearchParams} from "react-router-dom";
import {searchPackAC} from "../packs-reducer";
import {packNameParamsSelector, userIdParamsSelector} from "../packSelectors";
import {userIdSelector} from "../../../../app/selectors";

export const usePacksFilter = () => {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams();
  const params = Object.fromEntries(searchParams)

  const userId = useAppSelector(userIdSelector)

  const userIdParam = useAppSelector(userIdParamsSelector)



  const packName = useAppSelector(packNameParamsSelector)

  const isMy = !!userIdParam



/*

  useEffect(() => {
    console.log("useEffect")
    console.log({...params})
    dispatch(searchPackAC({...params}))

  }, [])
*/

  const onSearchChange = (searchValue: string) => {
    setSearchParams({...params,packName: searchValue});
    dispatch(searchPackAC({ packName: searchValue }))
  }

  const onAllPacks = () => {
    setSearchParams({...params,user_id: userId});
    dispatch(searchPackAC({ user_id: userId }))
  }

  const onMyPacks  = () => {
    setSearchParams({...params,user_id:''});
    dispatch(searchPackAC({ user_id: '' }))
  }

  const onResetFilter = () => {
    params.user_id = ""
    params.min = "0"
    params.pageCount = "5"
    params.sortPacks = "0updated"
    params.page = "0"
    params.packName = ""
    setSearchParams({...params})
    dispatch(searchPackAC({...params}))
  };
return{
  packName,
  isMy,
  onMyPacks,
  onAllPacks,
  onResetFilter,
  onSearchChange,
}
};

