import { useMemo } from 'react';
import { fontFamily } from 'theme/typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import location from 'assets/images/Location.png';
import Product from './Product';
import useFirebaseData from '../../../firebase/firebasedata';
import CircularProgress from '@mui/material/CircularProgress';

// Define interface for shop data
// interface ShopData {
//   id: number;
//   name: string;
//   imageUrl: string;
//   inStock: number;
//   price: string;
// }

// Static shop data
const staticShops = [
  {
    id: 1,
    name: 'Harambee',
    imageUrl: location,
    inStock: 524,
  },
];

const Products = () => {
  const { productCount, monthlyReport, loading, error } = useFirebaseData();

  const shops = useMemo(() => {
    if (!monthlyReport || !monthlyReport.transaction_count) {
      return staticShops.map(shop => ({
        ...shop,
        price: '0.00',
        inStock:'0'
      }));
    }

    // Calculate average revenue per shop
    const averageRevenue = monthlyReport.total_sales / monthlyReport.transaction_count;
    
    // Format the price with commas and two decimal places
    const formattedPrice = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(averageRevenue);

    // Combine static data with dynamic revenue
    return staticShops.map(shop => ({
      ...shop,
      price: formattedPrice,
      inStock:productCount || '0'
    }));
  }, [monthlyReport]);

  if (loading) {
    return (
      <Stack
        direction="column"
        gap={3.75}
        component={Paper}
        height={300}
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Stack>
    );
  }

  if (error) {
    return (
      <Stack
        direction="column"
        gap={3.75}
        component={Paper}
        height={300}
        justifyContent="center"
        alignItems="center"
      >
        <Typography color="error">Error loading data</Typography>
      </Stack>
    );
  }

  return (
    <Stack direction="column" gap={3.75} component={Paper} height={300}>
      <Typography variant="h6" fontWeight={400} fontFamily={fontFamily.workSans}>
        Shops
      </Typography>

      <Stack direction="row" justifyContent="space-between">
        <Typography variant="caption" fontWeight={400}>
          Shops
        </Typography>
        <Typography variant="caption" fontWeight={400}>
          Revenue
        </Typography>
      </Stack>

      {shops.map((item) => (
        <Product key={item.id} data={item} />
      ))}
    </Stack>
  );
};

export default Products;