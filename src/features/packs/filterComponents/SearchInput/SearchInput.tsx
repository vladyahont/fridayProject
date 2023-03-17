import React, {DetailedHTMLProps, InputHTMLAttributes, useEffect, useState} from 'react';
import {useSearchParams} from "react-router-dom";
import {appStatusSelector} from "../../../../app/selectors";
import {useAppSelector} from "../../../../app/store";
import {useDebounce} from "../../../../hooks/useDebounce";
import SuperInputText from "../../../../superComponents/c1-SuperInputText/SuperInputText";


type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type SearchInputPropsType = Omit<DefaultInputPropsType, "type"> & {

}
export const SearchInput:React.FC<SearchInputPropsType> = ({
                                                      ...restProps
                                                    }) => {

  const appStatus = useAppSelector(appStatusSelector);
  const [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams();

  const [searchValue,setSearchValue] = useState<string>(searchParams.get("packName") || '')
  const params = Object.fromEntries(searchParams)

  useEffect(() => {
    setSearchValue(searchParams.get("packName") || '')
    }
  , [searchParams])

  const searchDebouncedValue = useDebounce<string>(searchValue, 800);
  useEffect(() => {
    if (!!searchDebouncedValue) {
      setSearchParams({...params, packName: searchValue});
    } else {
      delete params.packName
      setSearchParams(params)
    }
  }, [searchDebouncedValue])
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

