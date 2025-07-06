import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  TextField,
  Typography,
  Box,
  Button,
  MenuItem,
  Grid,
  Alert,
  Paper,
  Divider,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function AddDependency() {
  const token = localStorage.getItem('token');
  const { schoolId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    quantity: 0,
    schoolId: schoolId
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/school-dependencies", formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      navigate(`/escola/${schoolId}`, {
        state: { successMessage: 'Dependência adicionada com sucesso!' }
      });
    })
    .catch(error => {
      console.error("Erro:", error);
    });

  };

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Paper elevation={4} sx={{ p: 5, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Adicionar Dependência da Escola
        </Typography>

        <Divider sx={{ mb: 4 }} />

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Nome"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Quantidade"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === '-' || e.key === 'e' || e.key === '+') {
                    e.preventDefault(); // bloqueia -, e, +
                  }
                }}
                required
              />
            </Grid>
          </Grid>

          <Box mt={5} textAlign="center">
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              startIcon={<AddCircleIcon />}
              sx={{ px: 4, py: 1.5 }}
            >
              Salvar Dependência
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
