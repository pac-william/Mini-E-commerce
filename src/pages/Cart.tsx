import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Divider,
  Paper,
} from '@mui/material';
import { Add, Remove, Delete, ShoppingCart, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, total } = useCart();

  if (items.length === 0) {
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
            textAlign: 'center',
            borderRadius: 4,
            backgroundColor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <ShoppingCart sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Seu carrinho está vazio
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Adicione produtos ao seu carrinho para continuar comprando
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/')}
            sx={{
              py: 1.5,
              px: 4,
              backgroundColor: 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
          >
            Continuar Comprando
          </Button>
        </Paper>
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

      <Typography variant="h4" component="h1" gutterBottom>
        Carrinho de Compras
      </Typography>

      <Box sx={{ 
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 3
      }}>
        <Box sx={{ flex: 2 }}>
          {items.map((item) => (
            <Card 
              key={item.id} 
              sx={{ 
                mb: 2,
                borderRadius: 2,
                '&:last-child': { mb: 0 }
              }}
            >
              <CardContent>
                <Box sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2
                }}>
                  <Box sx={{ 
                    width: '25%',
                    backgroundColor: '#f8fafc',
                    borderRadius: 1,
                    p: 1,
                  }}>
                    <CardMedia
                      component="img"
                      image={item.image}
                      alt={item.title}
                      sx={{ 
                        height: 100,
                        objectFit: 'contain',
                      }}
                    />
                  </Box>
                  <Box sx={{ width: '35%' }}>
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        fontWeight: 600,
                        mb: 0.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography 
                      variant="h6" 
                      color="primary"
                      sx={{ fontWeight: 700 }}
                    >
                      R$ {item.price.toFixed(2)}
                    </Typography>
                  </Box>
                  <Box sx={{ width: '25%' }}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 1,
                      backgroundColor: '#f8fafc',
                      borderRadius: 1,
                      p: 0.5,
                    }}>
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        sx={{ color: 'primary.main' }}
                      >
                        <Remove />
                      </IconButton>
                      <Typography sx={{ minWidth: 32, textAlign: 'center' }}>
                        {item.quantity}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        sx={{ color: 'primary.main' }}
                      >
                        <Add />
                      </IconButton>
                    </Box>
                  </Box>
                  <Box sx={{ width: '15%', display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton
                      color="error"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Box sx={{ flex: 1 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              backgroundColor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Resumo do Pedido
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography>Subtotal</Typography>
              <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                R$ {total.toFixed(2)}
              </Typography>
            </Box>
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={() => alert('Funcionalidade de checkout em desenvolvimento!')}
              sx={{
                mb: 2,
                py: 1.5,
                backgroundColor: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              }}
            >
              Finalizar Compra
            </Button>
            <Button
              variant="outlined"
              fullWidth
              size="large"
              onClick={() => navigate('/')}
              sx={{
                py: 1.5,
                borderColor: 'primary.main',
                color: 'primary.main',
                '&:hover': {
                  borderColor: 'primary.dark',
                  backgroundColor: 'primary.light',
                  color: 'white',
                },
              }}
            >
              Continuar Comprando
            </Button>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}; 