import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

type Props = {
  fieldName: string;
  defaultValue: string;
  data: {
    id: number;
    label: string;
  }[];
};

const SelectDropdow = (props: Props) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{props.fieldName}</InputLabel>

      <Select label={props.defaultValue}>
        {props.data.map((prop) => (
          <MenuItem value={prop.id}>{prop.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectDropdow;
