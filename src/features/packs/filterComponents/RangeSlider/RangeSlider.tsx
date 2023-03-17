import {appStatusSelector, maxCardsCountSelector, minCardsCountSelector} from "../../../../app/selectors";
import {useAppDispatch, useAppSelector} from "../../../../app/store";
import {SyntheticEvent, useEffect, useState} from "react";
import {setSearchParamsAC} from "../../packs-reducer";
import {Slider} from "@mui/material";
import s from"../RangeSlider/rangeSlider.module.css"

export const RangeSlider = () => {
  const minCardsCount = useAppSelector(minCardsCountSelector);
  const maxCardsCount = useAppSelector(maxCardsCountSelector);
  const appStatus = useAppSelector(appStatusSelector);

  const dispatch = useAppDispatch();

  /*const [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams();
  const searchParamsObject = Object.fromEntries(searchParams);
  const userID = searchParams.get("user_id");*/

  const minDistance = 5;
  const [values, setValues] = useState<[number,number]>([0, 0]);


  useEffect(() => {
    setValues([
      minCardsCount,maxCardsCount
    ]);
  }, [minCardsCount, maxCardsCount]);

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
      dispatch(setSearchParamsAC({min,max}))
    }
  };

  const disabled = appStatus === "loading"

  return (
    <div className = {s.container}>
      <span className = {s.value}>{values[0]}</span>
      <Slider
        min={minCardsCount}
        max={maxCardsCount}
        value={values}
        onChange={changeSliderValues}
        onChangeCommitted={onChangeCommittedHandler}
        disabled={disabled}
      />
      <span className = {s.value}>{values[1]}</span>
    </div>
  );
};

