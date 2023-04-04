import React from 'react';
import {useDebouncedSearchInput} from "./useDebouncedSearchInput";
import {Grid, SxProps, TextField} from "@mui/material";


type SearchInputPropsType =  {
  disabled:boolean,
  searchValue: string,
  onChangeSearchValue: (searchValue: string) => void
  sx?: SxProps,
}
export const SearchInput:React.FC<SearchInputPropsType> = ({
                                                             searchValue,
                                                             onChangeSearchValue,
                                                             disabled,
                                                             sx
                                                    }) => {
  const {value,onChangeValueHandler} = useDebouncedSearchInput(searchValue,onChangeSearchValue,600)
  return (<Grid flex={'0 0 auto'}>
      <TextField
        disabled={disabled}
        onChange={onChangeValueHandler}
        value={value}
        sx={ sx? sx:{ minWidth: '400px' }}
        placeholder={'Search'}
      />
    </Grid>
  );
};

