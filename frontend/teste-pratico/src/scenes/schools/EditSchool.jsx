import { useState, useEffect } from 'react';
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
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate } from 'react-router-dom';

export default function EditSchool() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    rede: '',
    diretoria: '',
    municipio: '',
    distrito: '',
    codigo: '',
    nome: '',
    tipo: '',
    situacao: '',
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
    const mockData = {
      rede: 'Estadual',
      diretoria: 'Diretoria Regional 3',
      municipio: 'Cidade Exemplo',
      distrito: 'Distrito Central',
      codigo: 'ESC12345',
      nome: 'Escola Exemplo',
      tipo: 'Pública',
      situacao: 'Ativa',
    };

    setFormData(mockData);
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Escola editada:', formData);
    navigate('/home', {
      state: { successMessage: 'Escola atualizada com sucesso!' }
    });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Paper elevation={4} sx={{ p: 5, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Editar Escola
        </Typography>

        <Divider sx={{ mb: 4 }} />

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {[
              { label: 'Rede de Ensino', name: 'rede' },
              { label: 'Diretoria', name: 'diretoria' },
              { label: 'Município', name: 'municipio' },
              { label: 'Distrito', name: 'distrito' },
              { label: 'Código', name: 'codigo' },
              { label: 'Nome da Escola', name: 'nome' },
              { label: 'Situação da Escola', name: 'situacao' },
            ].map((field) => (
              <Grid item xs={12} sm={6} key={field.name}>
                <TextField
                  fullWidth
                  label={field.label}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                />
              </Grid>
            ))}

            <Box width="50%" minWidth="225px" mb={2}>
              <TextField
                select
                fullWidth
                label="Tipo da Escola"
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                required
              >
                <MenuItem value="Pública">Pública</MenuItem>
                <MenuItem value="Privada">Privada</MenuItem>
                <MenuItem value="Filantrópica">Filantrópica</MenuItem>
              </TextField>
            </Box>
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

          {submitted && (
            <Alert severity="success" sx={{ mt: 4 }}>
              Escola atualizada com sucesso!
            </Alert>
          )}
        </Box>
      </Paper>
    </Container>
  );
}
