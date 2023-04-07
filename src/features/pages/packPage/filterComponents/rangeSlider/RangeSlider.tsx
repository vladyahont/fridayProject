import {
  appStatusSelector,

} from "app/selectors";
import {useAppDispatch, useAppSelector} from "app/store";
import {SyntheticEvent, useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {Slider} from "@mui/material";
import {changeMinMaxCountAC} from "../../packs-reducer";
import {
  maxCardsCountSelector,
  minCardsCountSelector,
  packMaxParamsSelector,
  packMinParamsSelector
} from "../../packSelectors";




export const RangeSlider = () => {
  const minCardsCount = useAppSelector(minCardsCountSelector);
  const maxCardsCount = useAppSelector(maxCardsCountSelector);
  const appStatus = useAppSelector(appStatusSelector);

  const min = useAppSelector(packMinParamsSelector)
  const max = useAppSelector(packMaxParamsSelector)


  const dispatch = useAppDispatch()

  const [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams();
  const searchParamsObject = Object.fromEntries(searchParams);
  const userID = searchParams.get("user_id");

  useEffect(() => {
    if(searchParams.get('max')) {
      setValues([Number(searchParams.get("min")) || min, Number(searchParams.get("max")) || max])
      //dispatch(changeMinMaxCountAC(Number(searchParams.get("min")),Number(searchParams.get("max"))))
    }else {
      setValues([minCardsCount,maxCardsCount]);
    }
  }, [min, max,minCardsCount,maxCardsCount]);


  const minDistance = 5;
  const [values, setValues] = useState<[number,number]>([minCardsCount, maxCardsCount]);


  const changeSliderValues = (e: Event, value: number | number[], activeThumb: number) => {
    if (Array.isArray(value)) {
      if (activeThumb === 0) {

        setValues([Math.min(value[0], values[1] - minDistance), values[1]]);
      } else {

        setValues([values[0], Math.max(value[1], values[0] + minDistance)]);
      }
    }
  };

  const onChangeCommittedHandler = (e: Event | SyntheticEvent, value: number | number[]) => {
    if (Array.isArray(value)) {
      let min = value[0];
      let max = value[1];
      const params = userID ? { user_id: userID, min, max } : { min, max };
      dispatch(changeMinMaxCountAC(values[0],values[1]))
      setSearchParams({ ...searchParamsObject, ...params});
    }
  };

  const disabled = appStatus === "loading" || values[0] === values[1]

  return (
    <div style={ {display:"flex",
      flexDirection:"row",
      gap: "10px",
      width:"400px"}}>
      <div>{values[0]}</div>
      <Slider
        min={minCardsCount}
        max={maxCardsCount}
        value={values}
        onChange={changeSliderValues}
        onChangeCommitted={onChangeCommittedHandler}
        disableSwap
        disabled={disabled}
      />
      <div>{values[1]}</div>
    </div>
  );
};

