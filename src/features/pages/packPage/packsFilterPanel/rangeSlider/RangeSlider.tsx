import {SyntheticEvent} from "react";
import {Slider} from "@mui/material";

type RangeSliderProps = {
  min: number,
  max: number,
  current: [number, number],
  onChangeCurrent:([]:[number, number]) => void
  minDistance: number,
  onChangeCommitted:(min:number,max:number) => void
  disabled: boolean,
}


export const RangeSlider = ({ min,
                              max,
                              minDistance,
                              disabled,
                              current,
                              onChangeCommitted,
                              onChangeCurrent}: RangeSliderProps) => {
  const changeSliderValues = (e: Event, value: number | number[], activeThumb: number) => {
    if (Array.isArray(value)) {
      if (activeThumb === 0) {
        onChangeCurrent([Math.min(value[0], current[1] - minDistance), current[1]])
      } else {
        onChangeCurrent([current[0], Math.max(value[1], current[0] + minDistance)])
      }
    }
  };

  const onChangeCommittedHandler = (e: Event | SyntheticEvent, value: number | number[]) => {
    if (Array.isArray(value)) {
      onChangeCommitted(value[0],value[1])
    }
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "row",
      gap: "10px",
      width: "400px"
    }}>
      <div>{current[0]}</div>
      <Slider
        min={min}
        max={max}
        value={current}
        onChange={changeSliderValues}
        onChangeCommitted={onChangeCommittedHandler}
        disableSwap
        disabled={disabled || current[0] === current[1]}
      />
      <div>{current[1]}</div>
    </div>
  );
};

