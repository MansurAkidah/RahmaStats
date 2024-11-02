import Grid from '@mui/material/Grid';
import TopCard from './TopCard';

const cardsData = [
  {
    id: 1,
    title: 'Monthly Sales',
    value: '50.8K',
    rate: '28.4%',
    isUp: true,
    icon: 'healthicons:money-bag',
  },
  {
    id: 2,
    title: 'Products in Stock',
    value: '23.6K',
    rate: '12.6%',
    isUp: false,
    icon: 'solar:bag-bold',
  },
  {
    id: 3,
    title: 'Products sold',
    value: '756',
    rate: '3.1%',
    isUp: true,
    icon: 'ph:bag-simple-fill',
  },
  {
    id: 4,
    title: 'Average Revenue',
    value: '2.3K',
    rate: '11.3%',
    isUp: true,
    icon: 'healthicons:coins',
  },
];

const TopCards = () => {
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
