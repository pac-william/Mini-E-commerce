import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  CircularProgress,
  Rating,
  Chip,
  Divider,
  Paper,
} from '@mui/material';
import { ShoppingCart, ArrowBack } from '@mui/icons-material';
import { Product, CartItem } from '../types/product';
import { getProduct } from '../services/api';
import { useCart } from '../contexts/CartContext';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          const data = await getProduct(parseInt(id));
          setProduct(data);
        }
      } catch (error) {
        console.error('Erro ao carregar produto:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      const cartItem: CartItem = {
        ...product,
        quantity: 1
      };
      addToCart(cartItem);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" color="error">
          Produto não encontrado
        </Typography>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Voltar para a lista
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/')}
        sx={{ mb: 4 }}
      >
        Voltar
      </Button>

      <Paper 
        elevation={0}
        sx={{ 
          p: 4,
          borderRadius: 4,
          backgroundColor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box sx={{ 
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4
        }}>
          <Box sx={{ 
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f8fafc',
            borderRadius: 2,
            p: 4,
          }}>
            <Box
              component="img"
              src={product.image}
              alt={product.title}
              sx={{
                maxWidth: '100%',
                maxHeight: 400,
                objectFit: 'contain',
              }}
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {product.title}
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Rating
                value={product.rating.rate}
                precision={0.5}
                readOnly
                sx={{ mb: 1 }}
              />
              <Typography variant="body2" color="text.secondary">
                {product.rating.count} avaliações
              </Typography>
            </Box>

            <Chip
              label={product.category}
              sx={{
                mb: 3,
                backgroundColor: 'primary.light',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'primary.main',
                },
              }}
            />

            <Typography
              variant="h3"
              color="primary"
              sx={{ fontWeight: 700, mb: 3 }}
            >
              R$ {product.price.toFixed(2)}
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Descrição
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4 }}
            >
              {product.description}
            </Typography>

            <Button
              variant="contained"
              size="large"
              fullWidth
              startIcon={<ShoppingCart />}
              onClick={handleAddToCart}
              sx={{
                py: 1.5,
                backgroundColor: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              }}
            >
              Adicionar ao Carrinho
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}; 