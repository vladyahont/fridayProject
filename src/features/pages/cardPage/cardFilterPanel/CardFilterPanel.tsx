import React from 'react';
import {FilterContainer} from "../../../components/filterContainer/FilterContainer";
import {SearchInput} from "../../../components/searchInput/SearchInput";
import {useAppDispatch, useAppSelector} from "../../../../app/store";
import {searchCardsAC} from "../cards-reducer";
import {useSearchParams} from "react-router-dom";
import {useAppIsLoading} from "../../../../hooks/useAppIsLoading";
import {cardQuestionParamsSelector} from "../cardSelector";


export const CardFilterPanel = () => {

  const dispatch = useAppDispatch()
  const isLoading = useAppIsLoading()

  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const search = useAppSelector(cardQuestionParamsSelector);

  const onSearchChange = (search: string) => {
    setSearchParams({...params,cardQuestion: search});
    dispatch(searchCardsAC({ ...params,cardQuestion: search }))
  }
  return (
    <FilterContainer>
      <SearchInput disabled={isLoading} searchValue={search} onChangeSearchValue={onSearchChange}/>
    </FilterContainer>
  );
};

