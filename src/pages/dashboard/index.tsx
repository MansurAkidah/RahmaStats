import Grid from '@mui/material/Grid';
import TopCards from 'components/sections/dashboard/top-cards';
// import WebsiteVisitors from 'components/sections/dashboard/website-visitors';
// import RevenueByCustomer from 'components/sections/dashboard/revenue-by-customer';
import Products from 'components/sections/dashboard/products';
import CompletedTask from 'components/sections/dashboard/completed-task';
import OrdersStatus from 'components/sections/dashboard/orders-status';
import ProductsStatus from 'components/sections/dashboard/product-status';
import UtensilsPOS from 'components/product/productCatalog'

const Dashboard = () => {
  return (
    <Grid container spacing={{ xs: 2.5, sm: 3, lg: 3.75 }}>
      <Grid item xs={12}>
        <TopCards />
      </Grid>

      {/* <Grid item xs={12} xl={4}>
        <WebsiteVisitors />
      </Grid>

      <Grid item xs={12} xl={8}>
        <RevenueByCustomer />
      </Grid> */}

      <Grid item xs={12} xl={4}>
        <Products />
      </Grid>

      <Grid item xs={12} xl={8}>
        <CompletedTask />
      </Grid>
      
      <Grid item xs={12}>
        <ProductsStatus />
      </Grid>

      <Grid item xs={12}>
        <OrdersStatus />
      </Grid>

      {/* <Grid item xs={12}>
        <POSPage />
      </Grid> */}

      <Grid item xs={12}>
        <UtensilsPOS />
      </Grid>

    </Grid>
  );
};

export default Dashboard;
