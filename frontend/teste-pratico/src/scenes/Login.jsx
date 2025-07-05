import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
} from '@mui/material';
import ClipLoader from "react-spinners/ClipLoader";

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={4} sx={{ p: 5, mt: 10, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
          Login
        </Typography>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Infraestrutura Escolar
        </Typography>

        <Box component="form" onSubmit={handleSubmit} mt={3}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <TextField
            label="Senha"
            name="password"
            fullWidth
            margin="normal"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Box textAlign="center" mt={4}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
              {loading && (
                <ClipLoader
                    color="#1976d2" 
                    loading={loading}
                    size={20}
                    aria-label="Loading Spinner"
                />
                )}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
