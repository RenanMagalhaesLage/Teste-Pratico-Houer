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
  const navigate = useNavigate();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/auth/login", formData);
      const token = response.data.token; 
      localStorage.setItem('token', token);
      navigate('/home');

    } catch (error) {
      console.error("Erro:", error);
      setError('Não foi possível realizar o login.');
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleRegister = () => {
    navigate(`/registrar`);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={4} sx={{ p: 5, mt: 10, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
          Login
        </Typography>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Instalações Escolares
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
              sx={{ mr: 2 }}
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
            <Button
              variant="outlined"
              color="primary"
              size="large"
              disabled={loading}
              onClick={() => handleRegister()}
            >
              Registrar
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
