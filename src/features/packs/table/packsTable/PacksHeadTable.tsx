import React from 'react';
import {HeadTable} from "../HeadTable";
import {TableDataType} from "./PacksTable";
import {HeaderType, Order} from "../typesTable";
import {searchPackAC} from "../../packs-reducer";
import {useAppDispatch} from "../../../../app/store";
import {useSearchParams} from "react-router-dom";
const headCells: HeaderType<TableDataType>[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'cardsCount',
    numeric: true,
    disablePadding: false,
    label: 'cards',
  },
  {
    id: 'updated',
    numeric: false,
    disablePadding: false,
    label: 'Last Updated',
  },
  {
    id: 'user_name',
    numeric: false,
    disablePadding: false,
    label: 'Created By',
  },
  {
    id: 'action',
    numeric: false,
    disablePadding: false,
    label: 'Actions',
  },
];


type Props = {
  order:Order,
  orderBy:keyof TableDataType,
  setOrder:(order:Order) =>void,
  setOrderBy:(orderBy:keyof TableDataType) => void,
}
const PacksHeadTable = ({order,
                          orderBy,
                          setOrder,
                          setOrderBy}:Props) => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams();
  const params = Object.fromEntries(searchParams);



  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof TableDataType,
  ) => {
    const isAsc = orderBy === property && order === '0';
    const sortPacks = order + orderBy

    dispatch(searchPackAC({sortPacks:params.sortPacks}))
    setSearchParams({...params, sortPacks: sortPacks});

    setOrder(isAsc ? '1' : '0');
    setOrderBy(property);
  };

  return (
    <HeadTable  headCells={headCells}
                onRequestSort={handleRequestSort}
                order={order}
                orderBy={orderBy}
    />
  );
};


export default PacksHeadTable;