import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

type Props = {
  fieldName: string;
  defaultValue?: string;
  onChange: (value: number | "") => void;
  data: {
    id: number;
    label: string;
  }[];
};

const SelectDropdown = (props: Props) => {
  // Encontrar o id correspondente ao label do valor padrão (se houver)
  const initialId = props.defaultValue
    ? props.data.find((item) => item.label === props.defaultValue)?.id
    : undefined;

  const [selectedValue, setSelectedValue] = useState<number | "">(
    initialId ?? ""
  );

  const handleChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setSelectedValue(value === "" ? "" : Number(value));
    props.onChange(value === "" ? "" : Number(value));
  };

  return (
    <FormControl fullWidth>
      <InputLabel id={`${props.fieldName}-label`}>{props.fieldName}</InputLabel>
      <Select
        labelId={`${props.fieldName}-label`}
        value={selectedValue === "" ? "" : selectedValue.toString()}
        onChange={handleChange}
        displayEmpty
      >
        {props.data.map((prop) => (
          <MenuItem key={prop.id} value={prop.id.toString()}>
            {prop.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectDropdown;
