import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  Button,
  Alert,
  Card,
  CardContent,
  CardActions,
  Divider,
  Stack
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DescriptionIcon from '@mui/icons-material/Description';
import ClipLoader from "react-spinners/ClipLoader";

export default function Import() {
  const token = localStorage.getItem('token');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setError('');
    setSuccess('');

    if (selectedFile) {
      const fileType = selectedFile.type;
      const fileName = selectedFile.name;

      if (fileType === 'text/csv' || fileName.toLowerCase().endsWith('.csv')) {
        setFile(selectedFile);
        setSuccess('Arquivo CSV válido selecionado!');
      } else {
        setFile(null);
        setError('Por favor, selecione um arquivo do tipo CSV.');
      }
    }
  };

  const handleSubmit = async () => {
    if (file) {
      const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);     
      setSuccess('');
      setError('');

      const response = await axios.post('http://localhost:8080/upload-csv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      setSuccess('Upload do arquivo CSV realizado com sucesso!');
    } catch (err) {
      if (err.response?.status === 403) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      setError('Erro ao enviar o arquivo.');
      console.error(err);
    } finally {
      setLoading(false);
      navigate('/home', {
        state: { successMessage: 'Arquivo CSV importado com sucesso!' }
      });
    }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Card elevation={6}>
        <CardContent>
          <Stack spacing={2} alignItems="center">
            <CloudUploadIcon sx={{ fontSize: 50, color: 'primary.main' }} />
            <Typography variant="h5" fontWeight={600}>
              Importar Arquivo CSV
            </Typography>

            <Button
              variant="outlined"
              component="label"
              startIcon={<DescriptionIcon />}
            >
              Selecionar CSV
              <input
                type="file"
                hidden
                accept=".csv"
                onChange={handleFileChange}
              />
            </Button>

            {file && (
              <Typography variant="body2" color="text.secondary">
                Arquivo selecionado: <strong>{file.name}</strong>
              </Typography>
            )}

            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
          </Stack>
        </CardContent>

        <Divider />

        <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!file || loading}
          >
            {loading ? 'Enviando...' : 'Enviar'}
            {loading && (
              <ClipLoader
                color="#1976d2" 
                loading={loading}
                size={20}
                aria-label="Loading Spinner"
              />
            )}
          </Button>
        </CardActions>
      </Card>
      
    </Container>
  );
}
