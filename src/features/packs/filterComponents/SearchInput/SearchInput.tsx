import React, {DetailedHTMLProps, InputHTMLAttributes, useEffect, useState} from 'react';
import {appStatusSelector, packNameSearchSelector} from "../../../../app/selectors";
import {useAppDispatch, useAppSelector} from "../../../../app/store";
import {useDebounce} from "../../../../hooks/useDebounce";
import SuperInputText from "../../../../superComponents/c1-SuperInputText/SuperInputText";
import {setSearchParamsAC} from "../../packs-reducer";

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
  const packNameSearch = useAppSelector(packNameSearchSelector)

  const [searchValue,setSearchValue] = useState<string>("")
  useEffect(() => {
    setSearchValue(packNameSearch? packNameSearch: '')
  }, [packNameSearch])


  const searchDebouncedValue = useDebounce<string>(searchValue, 800);
  useEffect(() => {
    dispatch(setSearchParamsAC({packName:searchDebouncedValue}))
  }, [searchDebouncedValue])

  const onChangeHandler = (value:string) =>{
    setSearchValue(value)
  }

  return (
      <SuperInputText
        disabled={appStatus === "loading"}
        value={searchValue}
        onChangeText={onChangeHandler}
        placeholder={"Search"}
        {...restProps}
      />
  );
};

