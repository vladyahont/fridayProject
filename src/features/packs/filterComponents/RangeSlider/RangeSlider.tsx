import {appStatusSelector, maxCardsCountSelector, minCardsCountSelector} from "../../../../app/selectors";
import {useAppDispatch, useAppSelector} from "../../../../app/store";
import {SyntheticEvent, useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {getPackssTC} from "../../packs-reducer";
import {Slider} from "@mui/material";

export const RangeSlider = () => {
  const minCardsCount = useAppSelector(minCardsCountSelector);
  const maxCardsCount = useAppSelector(maxCardsCountSelector);
  const appStatus = useAppSelector(appStatusSelector);

  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams();
  const searchParamsObject = Object.fromEntries(searchParams);
  const userID = searchParams.get("user_id");

  useEffect(() => {
    setValues([
      /*searchParams.has("min")? Number(searchParams.get("min")) : minCardsCount,
      searchParams.has("max")? Number(searchParams.get("max")) : maxCardsCount*/
      minCardsCount,maxCardsCount
    ]);
  }, [minCardsCount, maxCardsCount]);

  const minDistance = 5;

  const [values, setValues] = useState<number[]>([minCardsCount, maxCardsCount]);

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
      dispatch(getPackssTC({ ...searchParamsObject, ...params }));
      setSearchParams({ ...searchParamsObject, ...params });
    }
  };

  const disabled = appStatus === "loading"

  return (
    <span>
      <span>{values[0]}</span>
      <Slider
        min={0}
        max={maxCardsCount}
        value={values}
        onChange={changeSliderValues}
        onChangeCommitted={onChangeCommittedHandler}
        disableSwap
        disabled={disabled}
      />
      <span>{values[1]}</span>
    </span>
  );
};

