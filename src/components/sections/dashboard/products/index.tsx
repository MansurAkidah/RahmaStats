import { fontFamily } from 'theme/typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import location from 'assets/images/Location.png';
//import AWS8 from 'assets/images/AWS8.png';
import Product from './Product';

const shops = [
  {
    id: 1,
    name: 'Harambee',
    imageUrl: location,
    inStock: 524,
    price: '100,099.00',
  },
  // {
  //   id: 2,
  //   name: 'Apple Watch S8',
  //   imageUrl: AWS8,
  //   inStock: 320,
  //   price: '799.00',
  // },
];

const Products = () => {
  return (
    <Stack direction="column" gap={3.75} component={Paper} height={300}>
      <Typography variant="h6" fontWeight={400} fontFamily={fontFamily.workSans}>
        Shops
      </Typography>

      <Stack justifyContent="space-between">
        <Typography variant="caption" fontWeight={400}>
          Shops
        </Typography>
        <Typography variant="caption" fontWeight={400}>
          Revenue
        </Typography>
      </Stack>

      {shops.map((item) => {
        return <Product key={item.id} data={item} />;
      })}
    </Stack>
  );
};

export default Products;
