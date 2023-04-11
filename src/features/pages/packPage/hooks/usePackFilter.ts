import {useAppDispatch, useAppSelector} from "../../../../app/store";
import {useSearchParams} from "react-router-dom";
import {searchPackAC} from "../packs-reducer";
import {
  maxCardsCountSelector,
  minCardsCountSelector, packMaxParamsSelector, packMinParamsSelector,
  packNameParamsSelector,
  userIdParamsSelector
} from "../packSelectors";
import {userIdSelector} from "../../../../app/selectors";
import {useEffect, useState} from "react";

export const usePacksFilter = () => {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams();
  const params = Object.fromEntries(searchParams)

  const userId = useAppSelector(userIdSelector)
  const userIdParam = useAppSelector(userIdParamsSelector)
  const packName = useAppSelector(packNameParamsSelector)

  const min = useAppSelector(packMinParamsSelector)
  const max = useAppSelector(packMaxParamsSelector)

  const minCardsCount = useAppSelector(minCardsCountSelector)
  const maxCardsCount = useAppSelector(maxCardsCountSelector)

  const isMy = !!userIdParam

  const [valuesSlider, setValuesSlider] = useState<[number, number]>([minCardsCount,maxCardsCount]);


  useEffect(() => {
    setValuesSlider([min,max])
  }, [])

  useEffect(() => {
    setValuesSlider([minCardsCount,maxCardsCount])
  }, [minCardsCount,maxCardsCount])




  const onSearchChange = (searchValue: string) => {
    setSearchParams({...params,packName: searchValue, page: 0});
    dispatch(searchPackAC({ packName: searchValue ,page: 0 }))
  }

  const onAllPacks = () => {
    setSearchParams({...params,user_id: userId,min: minCardsCount, max:maxCardsCount, page: 0});
    dispatch(searchPackAC({ user_id: userId,min: minCardsCount, max:maxCardsCount, page: 0 }))
  }

  const onMyPacks  = () => {
    setSearchParams({...params,user_id:'',min: minCardsCount, max:maxCardsCount});
    dispatch(searchPackAC({ user_id: '',min: minCardsCount, max:maxCardsCount }))
  }
  const onSliderChange = (min:number,max:number) => {
    setSearchParams({...params,min,max, page: 0});
    dispatch(searchPackAC({min,max, page: 0}))
  }
  const onResetFilter = () => {
    setValuesSlider([minCardsCount,maxCardsCount])
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
  minCardsCount,
  maxCardsCount,
  valuesSlider,
  setValuesSlider,
  onMyPacks,
  onAllPacks,
  onResetFilter,
  onSearchChange,
  onSliderChange,
}
};

