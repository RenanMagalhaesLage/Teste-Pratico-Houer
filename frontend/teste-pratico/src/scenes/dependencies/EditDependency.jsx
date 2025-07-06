import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
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

export default function EditDependency() {
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: id,
    name: '',
    quantity: 0,
    school: ''
  });

  useEffect(() => {
    loadSchoolDependency();
  }, []);

  const loadSchoolDependency = async () =>{
    await axios.get("http://localhost:8080/school-dependencies", {
      params: {
        id: id
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setFormData(response.data);
    })
    .catch(error => {
      console.error("Erro:", error);
    }); 
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dto = {
      id: id,
      name: formData.name,
      quantity: formData.quantity,
      schoolId: formData.school.id
    };
    await axios.put("http://localhost:8080/school-dependencies", dto, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      navigate(`/escola/${formData.school.id}`, {
        state: { successMessage: 'Dependência atualizada com sucesso!' }
      });
    })
    .catch(error => {
      console.error("Erro:", error);
    });
    console.log('Dependência atualizada:', formData);
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
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Nome da Dependência"
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
