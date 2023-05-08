import * as React from 'react';
import { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker, DateRange } from '@mui/x-date-pickers-pro/DateRangePicker';

export default function CustomDateRangePicker() {
  const [value, setValue] = React.useState<DateRange<Dayjs>>([null, null]);

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      localeText={{ start: 'จากวันที่', end: 'ถึงวันที่' }}
    >
      <DateRangePicker
        value={value}
        format="DD-MM-YYYY"
        slotProps={{ textField: { size: 'small' } }}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(startProps:any, endProps:any) => (
          <React.Fragment>
            <TextField {...startProps} size='small' />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} size='small' />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
  );
}