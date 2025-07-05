import { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
  Divider,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate } from 'react-router-dom';

export default function EditDependency() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    dependecyName: '',
    quantity: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const mockDependency = {
        dependecyName: 'Laboratório de Informática',
        quantity: 2,
      };
      setFormData(mockDependency);
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'number') {
      const parsed = parseInt(value, 10);
      if (isNaN(parsed) || parsed < 0) return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Dependência atualizada:', formData);
    navigate('/home', {
      state: { successMessage: 'Dependência atualizada com sucesso!' }
    });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6, mb: 6 }}>
      <Paper elevation={4} sx={{ p: 5, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Editar Dependência
        </Typography>

        <Divider sx={{ mb: 4 }} />

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nome da Dependência"
                name="dependecyName"
                value={formData.dependecyName}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Quantidade"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                slotProps={{ input: { min: 0, step: 1 } }}
              />
            </Grid>
          </Grid>

          <Box mt={5} textAlign="center">
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              startIcon={<SaveIcon />}
              sx={{ px: 4, py: 1.5 }}
            >
              Salvar Alterações
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
