//import React from 'react';
import { useState, ChangeEvent, Dispatch, SetStateAction } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

interface ProductFormModalProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
  }

const ProductFormModal : React.FC<ProductFormModalProps> = ({ open, setOpen }) => {
  //const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    price: '',
    inStock: true,
    volume: ''
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Handle form submission here
    console.log('Form submitted:', formData);
    setOpen(false);
    // Reset form
    setFormData({
      productName: '',
      category: '',
      price: '',
      inStock: true,
      volume: ''
    });
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Product</DialogTitle>
      <DialogContent>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <InputLabel htmlFor="productName">Product Name</InputLabel>
            <Input
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              placeholder="Enter product name"
              fullWidth
            />
          </div>
          <div className="grid gap-2">
            <FormControl fullWidth>
              <InputLabel htmlFor="category">Category</InputLabel>
              <Select
                label="Category"
                value={formData.category}
                onChange={(event) =>
                  setFormData(prev => ({ ...prev, category: event.target.value }))
                }
              >
                <MenuItem value="electronics">Electronics</MenuItem>
                <MenuItem value="clothing">Clothing</MenuItem>
                <MenuItem value="food">Food</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="grid gap-2">
            <InputLabel htmlFor="price">Price</InputLabel>
            <Input
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Enter price"
              fullWidth
            />
          </div>
          <div className="grid gap-2">
            <InputLabel htmlFor="volume">Volume</InputLabel>
            <Input
              id="volume"
              name="volume"
              type="number"
              value={formData.volume}
              onChange={handleInputChange}
              placeholder="Enter volume"
              fullWidth
            />
          </div>
          <div className="flex items-center gap-2">
            <InputLabel htmlFor="inStock">In Stock</InputLabel>
            <Switch
              id="inStock"
              checked={formData.inStock}
              onChange={(event) =>
                setFormData(prev => ({ ...prev, inStock: event.target.checked }))
              }
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save Product
        </Button>
      </DialogActions>
    </Dialog>
  );  
};

export default ProductFormModal;