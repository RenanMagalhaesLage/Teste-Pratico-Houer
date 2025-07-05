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

export default function AddDependency() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        dependencyName: '',
        quantity: 0
    });

    const handleChange = (e) => {
    const { name, value, type } = e.target;

        if (name === 'quantity') {
            const numericValue = parseInt(value, 10);
            if (isNaN(numericValue) || numericValue < 0) return;
        }

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Nova dependencia da escola:', formData);
        navigate('/home', {
            state: { successMessage: 'Dependência adicionada com sucesso!' }
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
                {[
                    { label: 'Nome', name: 'dependencyName', type: 'text' },
                    { label: 'Quantidade', name: 'quantity', type: 'number' },
                    ].map((field) => (
                        <Grid item xs={12} sm={6} key={field.name}>
                            <TextField
                                fullWidth
                                label={field.label}
                                name={field.name}
                                type={field.type}
                                value={formData[field.name]}
                                onChange={handleChange}
                                required
                                {...(field.type === 'number' && {
                                    slotProps: {
                                    input: { min: 0, step: 1,  }
                                    }
                                })}
                            />
                        </Grid>
                    )
                )}
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
