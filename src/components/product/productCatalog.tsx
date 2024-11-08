'use client'

import  { useState, useEffect } from 'react'
import {
//   AppBar,
//   Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  CircularProgress
} from '@mui/material'
import { ShoppingCart, Favorite, Delete, Check } from '@mui/icons-material'
import { ref, get } from 'firebase/database'
import { db } from '../../config/firebase'
import { formatNumber } from 'functions/formatNumber'

interface ProductData {
  id: string
  imageSrc: string
  name: string
  category: string
  subcategory: string
  price: number
  cost: number
  stock: number
}

interface FirebaseProductsData {
  [key: string]: ProductData
}

export default function UtensilsPOS() {
  const [products, setProducts] = useState<ProductData[]>([])
  const [cart, setCart] = useState<ProductData[]>([])
  const [wishlist, setWishlist] = useState<ProductData[]>([])
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [deliveryOption, setDeliveryOption] = useState<'delivery' | 'pickup'>('pickup')
  const [location, setLocation] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const productsSnapshot = await get(ref(db, 'products'))
        const productsRaw = (productsSnapshot.val() || {}) as FirebaseProductsData

        const formattedProducts: ProductData[] = Object.entries(productsRaw)
          .map(([key, value]: [string, ProductData]) => ({
            ...value,
            id: key,
            price: Number(value.price)
          }))

        setProducts(formattedProducts)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const addToCart = (product: ProductData) => {
    setCart([...cart, product])
  }

  const addToWishlist = (product: ProductData) => {
    setWishlist([...wishlist, product])
  }

  const removeFromWishlist = (productId: string) => {
    setWishlist(wishlist.filter(item => item.id !== productId))
  }

  const moveToCart = (product: ProductData) => {
    addToCart(product)
    removeFromWishlist(product.id)
  }

  const clearCart = () => {
    setCart([])
  }

  const handleCheckout = () => {
    setIsCheckingOut(true)
  }

  const completeCheckout = () => {
    alert(`Order placed! ${deliveryOption === 'delivery' ? `Delivery to: ${location}` : 'Pickup from shop'}`)
    clearCart()
    setIsCheckingOut(false)
    setDeliveryOption('pickup')
    setLocation('')
  }

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2)
  }

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    )
  }

  if (error) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography color="error">{error}</Typography>
      </Container>
    )
  }

  return (
    <>
      {/* <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Utensils and Cutleries POS</Typography>
        </Toolbar>
      </AppBar> */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <TextField
          fullWidth
          label="Search products"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 4 }}
        />
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" gutterBottom>Product Catalog</Typography>
            <Grid container spacing={2}>
              {filteredProducts.map(product => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <Card>
                    <CardContent>
                      <img src={product.imageSrc} alt={product.name} style={{ width: '100%', height: 'auto' }} />
                      <Typography variant="h6">{product.name}</Typography>
                      <Typography>${formatNumber(product.price)}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={() => addToCart(product)} startIcon={<ShoppingCart />}>
                        Add to Cart
                      </Button>
                      <Button size="small" onClick={() => addToWishlist(product)} startIcon={<Favorite />}>
                        Wishlist
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ mb: 4 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Cart</Typography>
                <List>
                  {cart.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={item.name} secondary={`$${formatNumber(item.price)}`} />
                    </ListItem>
                  ))}
                </List>
                <Typography variant="h6" align="right" sx={{ mt: 2 }}>
                  Total: ${calculateTotal()}
                </Typography>
              </CardContent>
              <CardActions>
                <Button onClick={clearCart} color="error">Cancel</Button>
                <Button onClick={handleCheckout} variant="contained" color="primary">Checkout</Button>
              </CardActions>
            </Card>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Wishlist</Typography>
                <List>
                  {wishlist.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={item.name} />
                      <Button onClick={() => moveToCart(item)} size="small">
                        <ShoppingCart />
                      </Button>
                      <Button onClick={() => removeFromWishlist(item.id)} size="small">
                        <Delete />
                      </Button>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Dialog open={isCheckingOut} onClose={() => setIsCheckingOut(false)}>
        <DialogTitle>Checkout</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset">
            <FormLabel component="legend">Delivery Option</FormLabel>
            <RadioGroup
              value={deliveryOption}
              onChange={(e) => setDeliveryOption(e.target.value as 'delivery' | 'pickup')}
            >
              <FormControlLabel value="pickup" control={<Radio />} label="Pick up from shop" />
              <FormControlLabel value="delivery" control={<Radio />} label="Delivery" />
            </RadioGroup>
          </FormControl>
          {deliveryOption === 'delivery' && (
            <TextField
              fullWidth
              label="Delivery Location"
              variant="outlined"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              sx={{ mt: 2 }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCheckingOut(false)}>Cancel</Button>
          <Button onClick={completeCheckout} variant="contained" color="primary" startIcon={<Check />}>
            Complete Order
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}