'use client'

import { useState } from 'react';
import { Add, Remove, ShoppingCart, Close } from '@mui/icons-material';
import { 
  Button, 
  Card, 
  CardContent, 
  CardHeader,
  Typography,
  TextField,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Grid,
  IconButton,
  Container,
  Stack
} from '@mui/material';

// Sample product data
const products = [
  { id: 1, name: 'T-Shirt', price: 19.99 },
  { id: 2, name: 'Jeans', price: 49.99 },
  { id: 3, name: 'Sneakers', price: 79.99 },
  { id: 4, name: 'Hat', price: 14.99 },
  { id: 5, name: 'Socks', price: 9.99 },
]

type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
}

export default function POSPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false)

  const addToCart = (product: typeof products[0]) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === product.id)
      if (existingItem) {
        return currentCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...currentCart, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCart(currentCart => currentCart.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCart(currentCart =>
      currentCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
  }

  const handleCheckout = () => {
    setIsCheckoutModalOpen(true)
  }

  const completeTransaction = () => {
    setCart([])
    setIsCheckoutModalOpen(false)
  }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6">POS System</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Products</CardTitle>
//             <CardDescription>Select products to add to the cart</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <ScrollArea className="h-[400px]">
//               <div className="grid grid-cols-2 gap-4">
//                 {products.map(product => (
//                   <Button
//                     key={product.id}
//                     variant="outline"
//                     className="h-20 flex flex-col items-start p-2"
//                     onClick={() => addToCart(product)}
//                   >
//                     <span className="font-semibold">{product.name}</span>
//                     <span>${product.price.toFixed(2)}</span>
//                   </Button>
//                 ))}
//               </div>
//             </ScrollArea>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Cart</CardTitle>
//             <CardDescription>Review and update your selections</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <ScrollArea className="h-[300px]">
//               {cart.map(item => (
//                 <div key={item.id} className="flex justify-between items-center mb-2">
//                   <span className="font-semibold">{item.name}</span>
//                   <div className="flex items-center">
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       className="h-8 w-8"
//                       onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                     >
//                       <Minus className="h-4 w-4" />
//                     </Button>
//                     <Input
//                       type="number"
//                       value={item.quantity}
//                       onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
//                       className="w-16 mx-2 text-center"
//                     />
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       className="h-8 w-8"
//                       onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                     >
//                       <Plus className="h-4 w-4" />
//                     </Button>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       className="h-8 w-8 ml-2"
//                       onClick={() => removeFromCart(item.id)}
//                     >
//                       <X className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </div>
//               ))}
//             </ScrollArea>
//           </CardContent>
//           <CardFooter className="flex justify-between">
//             <div className="text-lg font-bold">Total: ${getTotalPrice()}</div>
//             <Button onClick={handleCheckout} disabled={cart.length === 0}>
//               <ShoppingCart className="mr-2 h-4 w-4" /> Checkout
//             </Button>
//           </CardFooter>
//         </Card>
//       </div>

//       <Dialog open={isCheckoutModalOpen} onOpenChange={setIsCheckoutModalOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Complete Transaction</DialogTitle>
//             <DialogDescription>
//               Review your order and confirm the transaction.
//             </DialogDescription>
//           </DialogHeader>
//           <div className="py-4">
//             <h3 className="font-semibold mb-2">Order Summary:</h3>
//             {cart.map(item => (
//               <div key={item.id} className="flex justify-between">
//                 <span>{item.name} x{item.quantity}</span>
//                 <span>${(item.price * item.quantity).toFixed(2)}</span>
//               </div>
//             ))}
//             <div className="font-bold mt-4">Total: ${getTotalPrice()}</div>
//           </div>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setIsCheckoutModalOpen(false)}>Cancel</Button>
//             <Button onClick={completeTransaction}>Complete Purchase</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
        POS System
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader 
              title="Products"
              subheader="Select products to add to the cart"
            />
            <CardContent>
              <Box sx={{ height: 400, overflow: 'auto' }}>
                <Grid container spacing={2}>
                  {products.map(product => (
                    <Grid item xs={6} key={product.id}>
                      <Button
                        variant="outlined"
                        sx={{
                          height: 80,
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          p: 2
                        }}
                        onClick={() => addToCart(product)}
                      >
                        <Typography fontWeight="600">{product.name}</Typography>
                        <Typography>${product.price.toFixed(2)}</Typography>
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader 
              title="Cart"
              subheader="Review and update your selections"
            />
            <CardContent>
              <Box sx={{ height: 300, overflow: 'auto' }}>
                <Stack spacing={2}>
                  {cart.map(item => (
                    <Box
                      key={item.id}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <Typography fontWeight="600">{item.name}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                          size="small"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Remove />
                        </IconButton>
                        <TextField
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                          sx={{ 
                            width: 60,
                            mx: 1,
                            '& input': { textAlign: 'center' }
                          }}
                          size="small"
                        />
                        <IconButton
                          size="small"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Add />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => removeFromCart(item.id)}
                          sx={{ ml: 1 }}
                        >
                          <Close />
                        </IconButton>
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </CardContent>
            <CardContent sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              borderTop: 1,
              borderColor: 'divider'
            }}>
              <Typography variant="h6" fontWeight="bold">
                Total: ${getTotalPrice()}
              </Typography>
              <Button 
                variant="contained"
                startIcon={<ShoppingCart />}
                onClick={handleCheckout}
                disabled={cart.length === 0}
              >
                Checkout
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog 
        open={isCheckoutModalOpen} 
        onClose={() => setIsCheckoutModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Complete Transaction</DialogTitle>
        <DialogContent>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Review your order and confirm the transaction.
          </Typography>
          
          <Typography fontWeight="600" sx={{ mb: 1 }}>
            Order Summary:
          </Typography>
          
          <Stack spacing={1} sx={{ mb: 2 }}>
            {cart.map(item => (
              <Box 
                key={item.id}
                sx={{ 
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <Typography>{item.name} x{item.quantity}</Typography>
                <Typography>${(item.price * item.quantity).toFixed(2)}</Typography>
              </Box>
            ))}
          </Stack>
          
          <Typography fontWeight="bold" sx={{ mt: 2 }}>
            Total: ${getTotalPrice()}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            variant="outlined" 
            onClick={() => setIsCheckoutModalOpen(false)}
          >
            Cancel
          </Button>
          <Button 
            variant="contained"
            onClick={completeTransaction}
          >
            Complete Purchase
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}