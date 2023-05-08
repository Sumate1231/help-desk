import * as React from "react";
import { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers";

export default function CustomDatePicker(props: any) {
  const [value, setValue] = React.useState<Dayjs | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="TH">
      <DesktopDatePicker
        label={props.name}
        value={value}
        format="DD-MM-YYYY"
        // views={['day','month','year']}
        // inputFormat="DD-MM-YYYY"
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params: any) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
