import {useState, useEffect} from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Alert
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import SchoolDependencyTable from '../../components/SchoolDependencyTable';

const data = [
  { nome: 'Laboratórios de Informática', quantidade: 2 },
  { nome: 'Bibliotecas', quantidade: 1 },
  { nome: 'Salas de Aula', quantidade: 12 },
  { nome: 'Banheiros', quantidade: 5 },
  { nome: 'Cozinha', quantidade: 2 },
  { nome: 'Sala Professores', quantidade: 1 },
];

export default function ViewSchool() {
  const schoolData = 
  {
    rede: 'Estadual',
    diretoria: 'Diretoria A',
    municipio: 'São Paulo',
    distrito: 'Centro',
    codigo: '123456',
    nome: 'Escola Estadual Central',
    tipo: 'Pública',
    situacao: 'Ativa',
  };

  const location = useLocation();
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (location.state?.successMessage) {
      setMessage(location.state.successMessage);
      setShowAlert(true);

      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000); // 3 segundos

      return () => clearTimeout(timer);
    }
  }, [location.state]);

  return (
    <Container sx={{ mt: 6, pb: 4 }}>
      {showAlert  && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {message}
        </Alert>
      )}
      <Typography variant="h4" gutterBottom textAlign="center">
        Detalhes da Escola
      </Typography>

      <Grid container spacing={4} justifyContent="center">
            <Card
                elevation={4}
                sx={{
                backgroundColor: '#fafafa',
                p: 3,
                width: '100%',
                maxWidth: '100%',
                minHeight: 180,
                }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {schoolData.nome}
                </Typography>

                <Box mb={1}><strong>Rede de Ensino:</strong> {schoolData.rede}</Box>
                <Box mb={1}><strong>Diretoria:</strong> {schoolData.diretoria}</Box>
                <Box mb={1}><strong>Município:</strong> {schoolData.municipio}</Box>
                <Box mb={1}><strong>Distrito:</strong> {schoolData.distrito}</Box>
                <Box mb={1}><strong>Código:</strong> {schoolData.codigo}</Box>
                <Box mb={1}><strong>Tipo da Escola:</strong> {schoolData.tipo}</Box>
                <Box mb={1}><strong>Situação:</strong> {schoolData.situacao}</Box>

                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="warning"
                    size="small"
                    sx={{ mr: 1 }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                  >
                    Deletar
                  </Button>
                </Box>
              </CardContent>
            </Card>
      </Grid>
      <SchoolDependencyTable data={data}/>
    </Container>
  )
}
