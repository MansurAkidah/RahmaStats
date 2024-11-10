'use client'

import  { useState, useMemo } from 'react'
import { 
  AppBar, 
  Box, 
  Button, 
  Card, 
  CardContent, 
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

export default function AboutPage() {
  const [mode, setMode] = useState<'light' | 'dark'>('light')

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
              Elegant Cutlery
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Button color="inherit" href="/">Home</Button>
              <Button color="inherit" href="welcome/#products">Products</Button>
              <Button color="inherit" href="about">About</Button>
              <Button color="inherit" href="welcome/#contact">Contact</Button>
            </Box>
            <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <IconButton color="inherit">
              <ShoppingCartIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Typography variant="h2" component="h1" align="center" gutterBottom>
            About Elegant Cutlery
          </Typography>
          
          <Grid container spacing={4} alignItems="center" sx={{ mb: 8 }}>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://placehold.co/600x400?text=Our+Story"
                alt="Elegant Cutlery Story"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h2" gutterBottom>
                Our Story
              </Typography>
              <Typography variant="body1" paragraph>
                Founded in 2023, Elegant Cutlery was born from a passion for elevating everyday dining experiences. Our journey began when our founder, a culinary enthusiast, realized the profound impact that quality utensils can have on the enjoyment of a meal.
              </Typography>
              <Typography variant="body1" paragraph>
                We started with a simple mission: to provide home cooks and professional chefs alike with cutlery and utensils that are not just tools, but works of art. Each piece in our collection is carefully crafted to blend functionality with aesthetic appeal.
              </Typography>
              <Typography variant="body1">
                Today, we continue to innovate and expand our range, always with an eye for quality, durability, and timeless elegance. We're proud to be a part of countless dining tables around the world, adding a touch of sophistication to every meal.
              </Typography>
            </Grid>
          </Grid>

          <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ mb: 4 }}>
            Our Values
          </Typography>
          <Grid container spacing={4} sx={{ mb: 8 }}>
            {[
              { title: "Quality Craftsmanship", description: "We use only the finest materials and time-honored techniques to create utensils that last a lifetime." },
              { title: "Innovative Design", description: "Our designs blend traditional elegance with modern functionality to suit every dining style." },
              { title: "Customer Satisfaction", description: "We're committed to ensuring our customers have the best possible experience with our products and service." }
            ].map((value, index) => (
              <Grid item key={index} xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {value.title}
                    </Typography>
                    <Typography variant="body2" >{value.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" component="h2" gutterBottom>
              Visit Our Showroom
            </Typography>
            <Typography variant="body1" paragraph>
              Experience the elegance of our cutlery in person. Visit our showroom to see and feel the quality for yourself.
            </Typography>
            <Typography variant="body1" paragraph>
              123 Cutlery Lane, Silvertown, ST 12345<br />
              Open Monday to Saturday, 9am - 6pm
            </Typography>
            <Button variant="contained" color="primary" href="/#contact" size="large">
              Contact Us
            </Button>
          </Box>
        </Container>

        <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6, mt: 8 }}>
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
                  <Button color="inherit" href="/">Home</Button>
                </Typography>
                <Typography variant="body2" component="p">
                  <Button color="inherit" href="/#products">Products</Button>
                </Typography>
                <Typography variant="body2" component="p">
                  <Button color="inherit" href="/about">About Us</Button>
                </Typography>
                <Typography variant="body2" component="p">
                  <Button color="inherit" href="/#contact">Contact</Button>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="h6" color="text.primary" gutterBottom>
                  Contact Us
                </Typography>
                <Typography variant="body2" component="p">
                  123 Cutlery Lane, Silvertown, ST 12345
                </Typography>
                <Typography variant="body2" component="p">
                  Email: info@elegantcutlery.com
                </Typography>
                <Typography variant="body2" component="p">
                  Phone: (555) 123-4567
                </Typography>
              </Grid>
            </Grid>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ pt: 4 }}>
              © 2023 Elegant Cutlery. All rights reserved.
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  )
}