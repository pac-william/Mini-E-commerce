import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Rating,
  Chip,
} from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { Product, CartItem } from '../types/product';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const cartItem: CartItem = {
      ...product,
      quantity: 1
    };
    addToCart(cartItem);
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
      }}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <Box sx={{ position: 'relative', paddingTop: '100%' }}>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.title}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            padding: '1rem',
            backgroundColor: '#f8fafc',
          }}
        />
      </Box>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography
          variant="subtitle1"
          component="h2"
          sx={{
            fontWeight: 600,
            mb: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            height: '3.6em',
            lineHeight: '1.2em',
          }}
        >
          {product.title}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Rating
            value={product.rating.rate}
            precision={0.5}
            readOnly
            size="small"
            sx={{ mb: 0.5 }}
          />
          <Typography variant="body2" color="text.secondary">
            {product.rating.count} avaliações
          </Typography>
        </Box>

        <Box sx={{ mt: 'auto' }}>
          <Typography
            variant="h6"
            color="primary"
            sx={{ fontWeight: 700, mb: 2 }}
          >
            R$ {product.price.toFixed(2)}
          </Typography>

          <Chip
            label={product.category}
            size="small"
            sx={{
              mb: 2,
              backgroundColor: 'primary.light',
              color: 'white',
              '&:hover': {
                backgroundColor: 'primary.main',
              },
            }}
          />

          <Button
            variant="contained"
            fullWidth
            startIcon={<ShoppingCart />}
            onClick={handleAddToCart}
            sx={{
              backgroundColor: 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
          >
            Adicionar ao Carrinho
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}; 