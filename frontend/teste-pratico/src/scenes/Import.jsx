import React, { useState } from 'react';
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

export default function Import() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

  const handleSubmit = () => {
    if (file) {
      console.log('Enviando:', file);
      setSuccess('Upload realizado com sucesso!');
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
            disabled={!file}
          >
            Enviar
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
}
