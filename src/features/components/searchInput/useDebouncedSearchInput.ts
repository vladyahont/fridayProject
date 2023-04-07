import {ChangeEvent, useEffect, useState} from "react";
import {useDebounce} from "../../../hooks/useDebounce";



export const useDebouncedSearchInput = (searchValue:string,onChangeSearchValue: (searchValue:string) => void,delay:number) => {
  const [value,setValue] = useState<string>(searchValue)
  const searchDebouncedValue = useDebounce<string>(value, delay);

  useEffect(() => {
    onChangeSearchValue(value)
  }, [searchDebouncedValue])

  const onChangeValueHandler = (event: ChangeEvent<HTMLInputElement>) =>{
    setValue(event.target.value)
  }
  return {
    value,
    onChangeValueHandler
  }
};

