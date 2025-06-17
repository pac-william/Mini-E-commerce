import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Product, CartItem } from '../types/product';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      ...product,
      quantity: 1
    };
    addToCart(cartItem);
  };

  return (
    <Card sx={{ 
      maxWidth: 345, 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'scale(1.02)',
      }
    }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.title}
        sx={{ objectFit: 'contain', p: 2 }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {product.title}
        </Typography>
        <Typography variant="h5" color="primary" sx={{ mt: 'auto', mb: 2 }}>
          R$ {product.price.toFixed(2)}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button 
            variant="contained" 
            fullWidth
            onClick={() => navigate(`/produto/${product.id}`)}
          >
            Ver detalhes
          </Button>
          <Button 
            variant="outlined" 
            fullWidth
            onClick={handleAddToCart}
          >
            Adicionar
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}; 