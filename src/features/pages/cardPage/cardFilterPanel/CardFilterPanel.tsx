import React, {useEffect} from 'react';
import {FilterContainer} from "../../../components/filterContainer/FilterContainer";
import {SearchInput} from "../../../components/searchInput/SearchInput";
import {useAppDispatch} from "../../../../app/store";
import {searchCardsAC} from "../cards-reducer";
import {useSearchParams} from "react-router-dom";


type CardFilterPanelProps = {
  isLoading : boolean
}
export const CardFilterPanel = ({isLoading}:CardFilterPanelProps) => {

  const dispatch = useAppDispatch()

  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const search = params["cardQuestion"];

  useEffect(() => {
    dispatch(searchCardsAC({ ...params,cardQuestion: search }))
  }, [])
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

