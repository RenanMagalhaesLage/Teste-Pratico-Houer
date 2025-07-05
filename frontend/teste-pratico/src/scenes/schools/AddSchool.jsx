import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

export default function AddSchool() {
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Nova escola:', formData);
        navigate('/home', {
            state: { successMessage: 'Escola adicionada com sucesso!' }
        });
    };

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Paper elevation={4} sx={{ p: 5, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Adicionar Escola
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

                {/* Tipo da Escola como SELECT */}

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
              startIcon={<AddCircleIcon />}
              sx={{ px: 4, py: 1.5 }}
            >
              Salvar Escola
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
