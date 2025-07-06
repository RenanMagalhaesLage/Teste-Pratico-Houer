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
import SaveIcon from '@mui/icons-material/Save';

export default function EditSchool() {
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [schoolTypes, setSchoolTypes] = useState([]);
  const [schoolType, setSchoolType] = useState("");
  const [newType, setNewType] = useState("");
  const [formData, setFormData] = useState({
    id: id,
    name: '',
    schoolNetwork: '',
    educationBoard: '',
    city: '',
    district: '',
    code: '',
    type: '',
    schoolStatus: '',
  });


  useEffect(() => {
    loadSchool();
    loadSchoolTypes();
  }, []);

  const loadSchoolTypes = async () =>{
    await axios.get("http://localhost:8080/school-types/all", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setSchoolTypes(response.data);
    })
    .catch(error => {
      if (error.response?.status === 403) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      console.error("Erro:", error);
    });
  };

  const loadSchool = async () =>{
    await axios.get("http://localhost:8080/schools", {
      params: {
        id: id
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setSchoolType(response.data.type.description);
      setFormData(response.data);
    })
    .catch(error => {
      if (error.response?.status === 403) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      console.error("Erro:", error);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
     if (name === 'type') {
      setSchoolType(value);
      setFormData((prev) => ({
        ...prev,
        type: {
          description: value
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const schoolType = newType.trim() !== "" ? newType.trim() : formData.type.description;
    const dto = {
      id: id,
      name: formData.name,
      schoolNetwork: formData.schoolNetwork,
      educationBoard: formData.educationBoard,
      city: formData.city,
      district: formData.district,
      code: formData.code,
      type: schoolType,
      schoolStatus: formData.schoolStatus,
    };
    await axios.put("http://localhost:8080/schools", dto,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      navigate('/home', {
        state: { successMessage: 'Escola atualizada com sucesso!' }
      });
    })
    .catch(error => {
      if (error.response?.status === 403) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      console.error("Erro:", error);
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
              { label: 'Rede de Ensino', name: 'schoolNetwork' },
              { label: 'Diretoria', name: 'educationBoard' },
              { label: 'Município', name: 'city' },
              { label: 'Distrito', name: 'district' },
              { label: 'Código', name: 'code' },
              { label: 'Nome da Escola', name: 'name' },
              { label: 'Situação da Escola', name: 'schoolStatus' },
            ].map((field) => (
              <Grid size={{ xs: 12, sm: 6 }} key={field.name}>
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
            <Box width="48%" minWidth="225px" mb={2}>
              <TextField
                select
                fullWidth
                label="Tipo da Escola"
                name="type"
                value={schoolType}
                onChange={handleChange}
                required
                disabled={!!newType} // Desativa o select se "Novo tipo" estiver preenchido
              >
                {schoolTypes.map((type) => (
                  <MenuItem key={type.id} value={type.description}>
                    {type.description}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            <Box width="48%" minWidth="225px" mb={2}>
              <TextField
                fullWidth
                label="Novo tipo de Escola"
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                name="newType"
                placeholder="Digite um novo tipo"
              />
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
        </Box>
      </Paper>
    </Container>
  );
}
