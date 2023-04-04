import React, {useEffect} from 'react';
import {HeadTable} from "../../../components/headTable/HeadTable";
import {TableDataType} from "./PacksTable";
import {HeaderType, Order} from "../../../components/headTable/typesTable";
import {searchPackAC} from "../../packs-reducer";
import {useAppDispatch, useAppSelector} from "../../../../app/store";
import {useSearchParams} from "react-router-dom";
import {appStatusSelector} from "../../../../app/selectors";
const headCells: HeaderType<TableDataType>[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
    sortable:true,
  },
  {
    id: 'cardsCount',
    numeric: true,
    disablePadding: false,
    label: 'cards',
    sortable:true,
  },
  {
    id: 'updated',
    numeric: false,
    disablePadding: false,
    label: 'Last Updated',
    sortable:true,
  },
  {
    id: 'user_name',
    numeric: false,
    disablePadding: false,
    label: 'Created By',
    sortable:true,
  },
  {
    id: 'action',
    numeric: false,
    disablePadding: false,
    label: 'Actions',
    sortable:false,
  },
];
export const PacksHeadTable = () => {
  const dispatch = useAppDispatch();
  const appStatus = useAppSelector(appStatusSelector)

  const [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams();
  const params = Object.fromEntries(searchParams);

  const [order, setOrder] = React.useState<Order>("0");
  const [orderBy, setOrderBy] = React.useState<keyof TableDataType>("updated");

  useEffect(() => {
    const paramsOrder = params.sortPacks?.slice(0,1)
    const paramsOrderBy = params.sortPacks?.replace(paramsOrder,'')

    setOrder(paramsOrder as Order)
    setOrderBy(paramsOrderBy as keyof TableDataType)
  }, [params.sortPacks])

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof TableDataType,
  ) => {
    const isNewOrder = orderBy !== property
    const newOrder = isNewOrder?  '0' : order === '0' ? '1' : '0'
    const sortPacks = newOrder + property

    setOrder(newOrder);
    setOrderBy(property);

    setSearchParams({...params, sortPacks: sortPacks});
    dispatch(searchPackAC({sortPacks:sortPacks}))
  };

  return (
    <HeadTable  headCells={headCells}
                onRequestSort={handleRequestSort}
                order={order}
                orderBy={orderBy}
                disable={appStatus === "loading"}
    />
  );
};
