import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Alert,
} from '@mui/material';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password, confirmPassword } = formData;

    if (!username || !email || !password || !confirmPassword) {
      setError('Preencha todos os campos.');
      setSuccess('');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      setSuccess('');
      return;
    }

    // Chamada da API
    console.log('Dados de registro:', formData);
    const dto = {
      username: formData.username,
      email: formData.username,
      password: formData.password,
      role: "USER"
    };
    try {
      await axios.post("http://localhost:8080/auth/register", dto);
      navigate('/login', {
        state: { successMessage: 'Cadastro realizado com sucesso!' }
      });
    } catch (error) {
      console.error("Erro:", error);
      setError('Não foi possível realizar o cadastro.');
    }

  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={4} sx={{ p: 4, mt: 8, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
          Criar Conta
        </Typography>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Instalações Escolar
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Usuário"
            name="username"
            margin="normal"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="E-mail"
            name="email"
            type="email"
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Senha"
            name="password"
            type="password"
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Confirmar Senha"
            name="confirmPassword"
            type="password"
            margin="normal"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            Registrar
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
