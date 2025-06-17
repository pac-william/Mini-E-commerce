import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Rating,
  CircularProgress,
  Paper,
} from '@mui/material';
import { getProduct } from '../services/api';
import { Product } from '../types/product';
import { useCart } from '../contexts/CartContext';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        const data = await getProduct(parseInt(id));
        setProduct(data);
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
      addToCart({ ...product, quantity: 1 });
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
      <Container>
        <Typography variant="h5" color="error">
          Produto não encontrado
        </Typography>
        <Button onClick={() => navigate('/')} sx={{ mt: 2 }}>
          Voltar para a lista
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button onClick={() => navigate('/')} sx={{ mb: 4 }}>
        ← Voltar para a lista
      </Button>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ 
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4
        }}>
          <Box sx={{ flex: 1 }}>
            <Box
              component="img"
              src={product.image}
              alt={product.title}
              sx={{
                width: '100%',
                height: 'auto',
                maxHeight: 400,
                objectFit: 'contain',
              }}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {product.title}
            </Typography>
            
            <Typography variant="h5" color="primary" gutterBottom>
              R$ {product.price.toFixed(2)}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={product.rating.rate} precision={0.5} readOnly />
              <Typography variant="body2" sx={{ ml: 1 }}>
                ({product.rating.count} avaliações)
              </Typography>
            </Box>

            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              Categoria: {product.category}
            </Typography>

            <Button
              variant="contained"
              size="large"
              onClick={handleAddToCart}
              sx={{ mt: 2 }}
            >
              Adicionar ao Carrinho
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}; 