'use client'

import { useState, useMemo } from 'react'
import { 
  AppBar, 
  Box, 
  Button, 
  Card, 
  CardContent, 
  CardMedia, 
  Container, 
  Grid, 
  IconButton, 
  Toolbar, 
  Typography, 
  useMediaQuery,
  CssBaseline
} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import MenuIcon from '@mui/icons-material/Menu'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [mode, setMode] = useState<'light' | 'dark'>('light')

  
  const auth = getAuth();
  const navigate = useNavigate();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#9c27b0',
          },
          secondary: {
            main: '#f50057',
          },
        },
      }),
    [mode],
  )

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
  }
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/authentication/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const products = [
    { id: 1, name: 'Luxury Knife Set', price: 'Ksh 199.99 - Ksh 299.99', category: 'knives', image: 'https://placehold.co/300x200?text=Luxury+Knife+Set' },
    { id: 2, name: 'Gold-Plated Cutlery', price: 'Ksh 299.99 - Ksh 399.99', category: 'cutlery', image: 'https://placehold.co/300x200?text=Gold-Plated+Cutlery' },
    { id: 3, name: 'Modern Serving Spoons', price: 'Ksh 49.99 - Ksh 89.99', category: 'utensils', image: 'https://placehold.co/300x200?text=Modern+Serving+Spoons' },
    { id: 4, name: 'Chef\'s Choice Pans', price: 'Ksh 159.99 - Ksh 259.99', category: 'cookware', image: 'https://placehold.co/300x200?text=Chef\'s+Choice+Pans' },
  ]

  const filteredProducts = activeTab === 'all' ? products : products.filter(product => product.category === activeTab)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <AppBar position="static" color="default" elevation={1}>
          <Toolbar>
            {isMobile && (
              <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Rahmas Cutlery
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Button color="inherit" href="#products">Products</Button>
              <Button color="inherit" href="about">About</Button>
              <Button color="inherit" href="#contact">Contact</Button>
            </Box>
            <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <IconButton color="inherit">
              <ShoppingCartIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box sx={{
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          py: 8,
          backgroundImage: 'linear-gradient(45deg, #9c27b0 30%, #f50057 90%)',
        }}>
          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="h2" component="h1" gutterBottom>
                  Elevate Your Dining Experience
                </Typography>
                <Typography variant="h5" paragraph>
                  Discover our exquisite collection of premium cutlery and utensils.
                </Typography>
                <Button variant="contained" color="secondary" size="large" onClick={()=> handleLogout()}>
                  Shop Now
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  component="img"
                  src="https://placehold.co/600x400?text=Elegant+Cutlery"
                  alt="Elegant Cutlery Set"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 2,
                    boxShadow: 3,
                  }}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Container maxWidth="lg" sx={{ py: 8 }} id="products">
          <Typography variant="h3" component="h2" align="center" gutterBottom>
            Our Featured Products
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            {['all', 'knives', 'cutlery', 'utensils', 'cookware'].map((tab) => (
              <Button
                key={tab}
                onClick={() => setActiveTab(tab)}
                variant={activeTab === tab ? 'contained' : 'outlined'}
                sx={{ mx: 1 }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Button>
            ))}
          </Box>
          <Grid container spacing={4}>
            {filteredProducts.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={3}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image}
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.price}
                    </Typography>
                    <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                      View More
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
          <Container maxWidth="lg">
            <Typography variant="h3" component="h2" align="center" gutterBottom>
              Why Choose Us?
            </Typography>
            <Grid container spacing={4}>
              {[
                { title: 'Premium Quality', description: 'Our products are crafted from the finest materials for lasting durability.' },
                { title: 'Elegant Designs', description: 'Each piece is designed to add sophistication to your dining experience.' },
                { title: 'Exceptional Service', description: 'Our team is dedicated to providing you with the best customer service.' }
              ].map((benefit, index) => (
                <Grid item key={index} xs={12} md={4}>
                  <Card>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {benefit.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {benefit.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        <Box sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', py: 8 }}>
          <Container maxWidth="sm">
            <Typography variant="h3" component="h2" align="center" gutterBottom>
              Ready to Elevate Your Dining?
            </Typography>
            <Typography variant="h6" align="center" paragraph>
              Join our mailing list and get 10% off your first order!
            </Typography>
            <Box component="form" sx={{ display: 'flex', justifyContent: 'center' }}>
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  padding: '10px',
                  marginRight: '10px',
                  borderRadius: '4px',
                  border: 'none',
                  flexGrow: 1,
                }}
              />
              <Button variant="contained" color="secondary" type="submit">
                Subscribe
              </Button>
            </Box>
          </Container>
        </Box>

        <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
          <Container maxWidth="lg">
            <Grid container spacing={4} justifyContent="space-evenly">
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="h6" color="text.primary" gutterBottom>
                  Elegant Cutlery
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Elevating your dining experience since 2023.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="h6" color="text.primary" gutterBottom>
                  Quick Links
                </Typography>
                <Typography variant="body2" component="p">
                  <Button color="inherit" href="#">Home</Button>
                </Typography>
                <Typography variant="body2" component="p">
                  <Button color="inherit" href="/pages/about">About Us</Button>
                </Typography>
                <Typography variant="body2" component="p">
                  <Button color="inherit" href="#contact">Contact</Button>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="h6" color="text.primary" gutterBottom>
                  Contact Us
                </Typography>
                <Typography variant="body2" component="p">
                  Harambee Town, Bungoma, Kenya
                </Typography>
                <Typography variant="body2" component="p">
                  Email: akidahmansur@gmail.com
                </Typography>
                <Typography variant="body2" component="p">
                  Phone: (+254) 7 45 65 55 63
                </Typography>
              </Grid>
            </Grid>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ pt: 4 }}>
              © 2023 Rahmas Cutlery. All rights reserved.
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  )
}