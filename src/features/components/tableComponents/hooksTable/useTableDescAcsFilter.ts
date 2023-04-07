import {useAppDispatch} from "../../../../app/store";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {searchCardsAC} from "../../../packs/cards/cards-reducer";
import {searchPackAC} from "../../../packs/packs-reducer";


type Order = 'asc' | 'desc'

type SetSearchParamACType =
  typeof searchCardsAC  |
  typeof searchPackAC
export const useTableDescAcsFilter = <D>(sortSearchParams:string,
                                         setSearchParamAC:SetSearchParamACType) =>{
  const dispatch = useAppDispatch()
  const [order, setOrder] = useState<Order>("asc")
  const [orderBy, setOrderBy] = useState<keyof D>("" as keyof D)
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);

  useEffect(() => {
    const paramsOrder = params[sortSearchParams]?.slice(0, 1);
    const paramsOrderBy = params[sortSearchParams]?.substring(1);
    setOrder(paramsOrder === "0" ? 'asc' :  'desc'as Order)
    setOrderBy(paramsOrderBy as keyof D)
  }, [])
  const handleRequestSort = (property: keyof D) => {
    const newOrder = orderBy === String(property) && order === 'desc' ? 'asc' : 'desc';
    const sortCards = `${newOrder === 'asc' ? '0' : '1'}${String(property)}`;
    setOrder(newOrder);
    setOrderBy(property);
    setSearchParams({...params, [sortSearchParams]: sortCards});
    dispatch(setSearchParamAC({[sortSearchParams]:sortCards}))
  }
  return {
    order,
    orderBy,
    handleRequestSort
  }
}