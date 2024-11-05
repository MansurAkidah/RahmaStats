import Grid from '@mui/material/Grid';
import TopCard from './TopCard';
import { useMemo } from 'react';
import useFirebaseData from '../../../firebase/firebasedata';
import { CircularProgress } from '@mui/material';




const TopCards = () => {
  const { 
    monthlyReport, 
    productCount, 
    dailyReport,
    loading, 
    error 
  } = useFirebaseData();

  const cardsData = useMemo(() => {
    // Calculate month-over-month growth rates
    const calculateGrowthRate = (current: number, previous: number) => {
      if (!previous) return 0;
      return Number(((current - previous) / previous * 100).toFixed(1));
    };

    // Format number to K format if >= 1000
    const formatValue = (value: number) => {
      return value >= 1000 
        ? `${(value / 1000).toFixed(1)}K`
        : value.toString();
    };

    return [
      {
        id: 1,
        title: 'Monthly Sales',
        value: monthlyReport ? formatValue(monthlyReport.total_sales) : '0',
        rate: monthlyReport ? `${calculateGrowthRate(
          monthlyReport.total_sales,
          monthlyReport.total_sales * 0.9 // Example: comparing with previous month
        )}%` : '0%',
        isUp: true, // You might want to calculate this based on the growth rate
        icon: 'healthicons:money-bag',
      },
      {
        id: 2,
        title: 'Products in Stock',
        value: formatValue(productCount),
        rate: '0%', // You might want to calculate this based on historical data
        isUp: true,
        icon: 'solar:bag-bold',
      },
      {
        id: 3,
        title: 'Products Sold',
        value: monthlyReport ? formatValue(monthlyReport.transaction_count) : '0',
        rate: monthlyReport ? `${calculateGrowthRate(
          monthlyReport.transaction_count,
          monthlyReport.transaction_count * 0.9 // Example: comparing with previous month
        )}%` : '0%',
        isUp: true,
        icon: 'ph:bag-simple-fill',
      },
      {
        id: 4,
        title: 'Average Revenue',
        value: dailyReport 
          ? formatValue(dailyReport.total_sales / dailyReport.transaction_count)
          : '0',
        rate: dailyReport ? `${calculateGrowthRate(
          dailyReport.total_sales / dailyReport.transaction_count,
          (dailyReport.total_sales * 0.9) / (dailyReport.transaction_count * 0.9) // Example: comparing with previous day
        )}%` : '0%',
        isUp: true,
        icon: 'healthicons:coins',
      },
    ];
  }, [monthlyReport, productCount, dailyReport]);

  if (loading) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '30px' }}>
        <CircularProgress />
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '30px' }}>
        <div>Error loading dashboard data: {error}</div>
      </Grid>
    );
  }


  return (
    <Grid container spacing={{ xs: 2.5, sm: 3, lg: 3.75 }}>
      {cardsData.map((item) => {
        return (
          <TopCard
            key={item.id}
            title={item.title}
            value={item.value}
            rate={item.rate}
            isUp={item.isUp}
            icon={item.icon}
          />
        );
      })}
    </Grid>
  );
};

export default TopCards;
