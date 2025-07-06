import {useState, useEffect} from 'react'
import SchoolTable from '../components/SchoolTable';
import { useLocation } from 'react-router-dom';
import { Alert } from '@mui/material';
import axios from 'axios';

export default function Home() {
  const token = localStorage.getItem('token');
  const location = useLocation();
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    loadSchools();
  }, []);

  const loadSchools = async () =>{
    const result = await axios.get("http://localhost:8080/schools/all",{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      //console.log("Schools:", response.data);
      setSchools(response.data);
    })
    .catch(error => {
      console.error("Erro:", error);
    });
  };

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
    <div className='container my-5'>
      {showAlert  && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {message}
        </Alert>
      )}
        <h1 className="mb-4 text-center">Listagem de Escolas</h1>
        <SchoolTable data={schools}/>
    </div>
  )
}
