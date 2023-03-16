import React, {DetailedHTMLProps, InputHTMLAttributes, useEffect, useState} from 'react';
import {useSearchParams} from "react-router-dom";
import {appStatusSelector} from "../../../../app/selectors";
import {useAppDispatch, useAppSelector} from "../../../../app/store";
import {useDebounce} from "../../../../hooks/useDebounce";
import SuperInputText from "../../../../superComponents/c1-SuperInputText/SuperInputText";
import {getPackssTC} from "../../packs-reducer";
type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;


type SearchInputPropsType = Omit<DefaultInputPropsType, "type"> & {

}
export const SearchInput:React.FC<SearchInputPropsType> = ({
                                                      ...restProps
                                                    }) => {

  const dispatch = useAppDispatch();
  const appStatus = useAppSelector(appStatusSelector);

  const [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams();
  const searchParamsObject = Object.fromEntries(searchParams);

  const [searchValue,setSearchValue] = useState<string>(searchParams.get("packName") || '')
  const searchDebouncedValue = useDebounce<string>(searchValue, 800);


  useEffect(() => {
      dispatch(getPackssTC( {...searchParamsObject, packName: searchValue} ));
      setSearchParams({ ...searchParamsObject, packName: searchValue });
  }, [searchDebouncedValue]);
  const onChangeHandler = (value:string) =>{
    setSearchValue(value)
  }

  return (
    <div>
      <SuperInputText
        disabled={appStatus === "loading"}
        value={searchValue}
        onChangeText={onChangeHandler}
        placeholder={"Search"}
        {...restProps}
      />
    </div>
  );
};

