import React, {useEffect, useState} from 'react';
import {appStatusSelector} from "app/selectors";
import {useAppSelector} from "app/store";
import {useDebounce} from "hooks/useDebounce";
import SuperInputText from "../../../../superComponents/c1-SuperInputText/SuperInputText";


type SearchInputPropsType =  {
  searchValue: string
  onChangeValue: (searchValue: string) => void
}
export const SearchInput:React.FC<SearchInputPropsType> = ({
                                                             searchValue,
                                                             onChangeValue
                                                    }) => {

  const appStatus = useAppSelector(appStatusSelector);
  const [value,setValue] = useState<string>(searchValue)
  const searchDebouncedValue = useDebounce<string>(value, 800);

  useEffect(() => {
    setValue(searchValue)
  }, [searchValue])

  useEffect(() => {
    onChangeValue(value)
  }, [searchDebouncedValue])

  const onChangeHandler = (value:string) =>{
    setValue(value)
  }
  return (
    <div>
      <SuperInputText
        disabled={appStatus === "loading"}
        value={searchValue}
        onChangeText={onChangeHandler}
        placeholder={"Search"}
        autoFocus
      />
    </div>
  );
};

