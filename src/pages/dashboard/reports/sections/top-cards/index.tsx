import { Grid } from '@mui/material';
import TopCard from './TopCard';

const cardsData = [
  {
    title: 'Save Products',
    value: '50.8K',
    rate: '28.4%',
    isUp: true,
    icon: 'carbon:favorite-filled',
  },
  {
    title: 'Stock Products',
    value: '23.6K',
    rate: '12.6%',
    isUp: false,
    icon: 'solar:bag-bold',
  },
  {
    title: 'Sale Products',
    value: '756',
    rate: '3.1%',
    isUp: true,
    icon: 'ph:bag-simple-fill',
  },
  {
    title: 'Average Revenue',
    value: '2.3K',
    rate: '11.3%',
    isUp: true,
    icon: 'mingcute:currency-dollar-2-line',
  },
];

const TopCards = () => {
  return (
    <Grid container spacing={{ xs: 2.5, sm: 3, lg: 3.75 }}>
      {cardsData.map((item, index) => {
        return (
          <Grid item xs={12} sm={6} xl={3} key={index}>
            <TopCard
              title={item.title}
              value={item.value}
              rate={item.rate}
              isUp={item.isUp}
              icon={item.icon}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default TopCards;