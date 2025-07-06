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
import { useLocation, useParams} from 'react-router-dom';
import SchoolDependencyTable from '../../components/SchoolDependencyTable';
import axios from 'axios';

export default function ViewSchool() {
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const location = useLocation();
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [school, setSchool] = useState([]);
  const [schoolType, setSchoolType] = useState([]);
  const [schoolDependencies, setSchoolDependencies] = useState([]);

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

  useEffect(() => {
    loadSchool();
  }, []);
  
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
      //console.log("Schools:", response.data);
      setSchool(response.data);
      setSchoolType(response.data.type);
      loadSchoolDependencies(response.data.id);
    })
    .catch(error => {
      console.error("Erro:", error);
    });
  };

  const loadSchoolDependencies = async (schoolId) =>{
    await axios.get('http://localhost:8080/school-dependencies/by-school', {
      params: {
        schoolId: schoolId
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      //console.log("Dependencies:", response.data);
      setSchoolDependencies(response.data);
    })
    .catch(error => {
      console.error("Erro:", error);
    });
  };

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
                  {school.name}
                </Typography>

                <Box mb={1}><strong>Rede de Ensino:</strong> {school.schoolNetwork}</Box>
                <Box mb={1}><strong>Diretoria:</strong> {school.educationBoard}</Box>
                <Box mb={1}><strong>Município:</strong> {school.city}</Box>
                <Box mb={1}><strong>Distrito:</strong> {school.district}</Box>
                <Box mb={1}><strong>Código:</strong> {school.code}</Box>
                <Box mb={1}><strong>Tipo da Escola:</strong> {schoolType.description}</Box>
                <Box mb={1}><strong>Situação:</strong> {school.schoolStatus}</Box>

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
      <SchoolDependencyTable data={schoolDependencies}/>
    </Container>
  )
}
