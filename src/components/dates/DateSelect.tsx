import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const DateSelect = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        views={['month', 'year']}
        defaultValue={dayjs('Jan-2024')}
        format="MMM YYYY"
        sx={(theme) => ({
          p: 0,
          border: 0,
          boxShadow: 0,
          bgcolor: 'info.dark',
          '& .MuiIconButton-edgeEnd': {
            color: 'text.secondary',
            '& .MuiSvgIcon-fontSizeMedium': {
              fontSize: theme.typography.subtitle1.fontSize,
            },
          },
          '& .MuiOutlinedInput-input': {
            p: 0,
            pl: theme.spacing(1),
            color: 'text.secondary',
            fontSize: theme.typography.caption.fontSize,
            fontWeight: theme.typography.subtitle2.fontWeight,
            height: 30,
            width: 64,
          },
          '& .MuiOutlinedInput-root': {
            pr: theme.spacing(0.75),

            '& .MuiOutlinedInput-notchedOutline': {
              borderWidth: 0,
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderWidth: 0,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderWidth: 0,
            },
          },
        })}
      />
    </LocalizationProvider>
  );
};

export default DateSelect;
