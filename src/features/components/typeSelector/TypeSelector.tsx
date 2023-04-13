import React, {FC} from "react";
import {MenuItem, Select, SelectChangeEvent} from "@mui/material";
import Typography from "@mui/material/Typography";

export type VariantType = 'text' | 'picture'

type TypeSelectType = {
  type: VariantType
  setType: (type: VariantType) => void
}

export const TypeSelector: FC<TypeSelectType> = ({ type, setType }) => {
  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as VariantType)
  }

  return (
    <>
      <Typography>
        Choose a question format
      </Typography>
      <Select
        size={'small'}
        value={type}
        onChange={handleChange}
      >
        <MenuItem value={'text'}>Text</MenuItem>
        <MenuItem value={'picture'}>Picture</MenuItem>
      </Select>
    </>
  )
}

