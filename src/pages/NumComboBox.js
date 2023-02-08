import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function NumComboBox() {
  return (
    <Autocomplete
      disablePortal
      labelId="demo-simple-select-required-label"
      id="demo-simple-select-required"
      options={num}
      //isOptionEqualToValue={(option, value) => option.name === value.name || value === ""}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="학번 *" size="small"
       />}
    />
  );
}

const num = [
  { label: '23' },
  { label: '22' },
  { label: '21' },
  { label: '20' },
  { label: '19' },
  { label: "18" },
  { label: '17' },
  { label: '16' },
  { label: '15' },
  { label: '14' },
  { label: '13' },
  { label: '12' },
  { label: '11' },
  { label: '10' },
  { label: '09' },
  { label: "08" },
  { label: '07' },
  { label: '06' },
  { label: '05' },
  { label: '04' },
  { label: '03' },
  { label: '02' },
  { label: '01' },
  { label: "00" },
  { label: '99' },
  { label: '98' },
  { label: '97' },
  { label: '96' },
  { label: '95' },
  { label: '94' },
];