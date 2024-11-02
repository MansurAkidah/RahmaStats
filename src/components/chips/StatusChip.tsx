import Chip from '@mui/material/Chip';
import IconifyIcon from 'components/base/IconifyIcon';

interface StatusChipProps {
  status: 'in_stock' | 'out_of_stock' | 'low_stock' | 'delivered' | 'cancelled' | 'pending';
}

const StatusChip = ({ status }: StatusChipProps) => {
  return (
    <Chip
      variant="outlined"
      size="small"
      icon={
        <IconifyIcon
          icon="radix-icons:dot-filled"
          sx={(theme) => ({
            color:
              (status === 'in_stock' || status === 'delivered')
                ? `${theme.palette.success.main} !important`
                : (status === 'low_stock' || status === 'pending')
                  ? `${theme.palette.warning.main} !important`
                  : `${theme.palette.error.main} !important`,
          })}
        />
      }
      label={status}
      sx={{
        pr: 0.65,
        width: 80,
        justifyContent: 'center',
        color:
        (status === 'in_stock' || status === 'delivered')
            ? 'success.main'
            : (status === 'low_stock' || status === 'pending')
              ? 'warning.main'
              : 'error.main',
        letterSpacing: 0.5,
        bgcolor:
        (status === 'in_stock' || status === 'delivered')
            ? 'transparent.success.main'
            : (status === 'low_stock' || status === 'pending')
              ? 'transparent.warning.main'
              : 'transparent.error.main',
        borderColor:
        (status === 'in_stock' || status === 'delivered')
            ? 'transparent.success.main'
            : (status === 'low_stock' || status === 'pending')
              ? 'transparent.warning.main'
              : 'transparent.error.main',
      }}
    />
  );
};

export default StatusChip;
