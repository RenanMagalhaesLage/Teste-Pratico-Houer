import {useState, useEffect} from 'react'
import SchoolTable from '../components/SchoolTable';
import { useLocation } from 'react-router-dom';
import { Alert } from '@mui/material';

const mockData = [
  { redeEnsino: 'Municipal', diretoria: 'Diretoria Central', municipio: 'São Paulo', distrito: 'Centro', codigo: '10001', nomeEscola: 'Escola Municipal A', tipoEscola: 'Fundamental', situacaoEscola: 'Ativa' },
  { redeEnsino: 'Estadual', diretoria: 'Diretoria Sul', municipio: 'Campinas', distrito: 'Distrito 1', codigo: '10002', nomeEscola: 'Escola Estadual B', tipoEscola: 'Médio', situacaoEscola: 'Ativa' },
  { redeEnsino: 'Federal', diretoria: 'Diretoria Norte', municipio: 'Ribeirão Preto', distrito: 'Distrito 2', codigo: '10003', nomeEscola: 'Escola Federal C', tipoEscola: 'Técnico', situacaoEscola: 'Inativa' },
  { redeEnsino: 'Municipal', diretoria: 'Diretoria Leste', municipio: 'Sorocaba', distrito: 'Distrito 3', codigo: '10004', nomeEscola: 'Escola Municipal D', tipoEscola: 'Fundamental', situacaoEscola: 'Ativa' },
  { redeEnsino: 'Estadual', diretoria: 'Diretoria Oeste', municipio: 'São José dos Campos', distrito: 'Distrito 4', codigo: '10005', nomeEscola: 'Escola Estadual E', tipoEscola: 'Médio', situacaoEscola: 'Ativa' },
  { redeEnsino: 'Federal', diretoria: 'Diretoria Central', municipio: 'Bauru', distrito: 'Distrito 5', codigo: '10006', nomeEscola: 'Escola Federal F', tipoEscola: 'Técnico', situacaoEscola: 'Ativa' },
  { redeEnsino: 'Municipal', diretoria: 'Diretoria Sul', municipio: 'Piracicaba', distrito: 'Distrito 6', codigo: '10007', nomeEscola: 'Escola Municipal G', tipoEscola: 'Fundamental', situacaoEscola: 'Inativa' },
  { redeEnsino: 'Estadual', diretoria: 'Diretoria Norte', municipio: 'Jundiaí', distrito: 'Distrito 7', codigo: '10008', nomeEscola: 'Escola Estadual H', tipoEscola: 'Médio', situacaoEscola: 'Ativa' },
  { redeEnsino: 'Federal', diretoria: 'Diretoria Leste', municipio: 'Franca', distrito: 'Distrito 8', codigo: '10009', nomeEscola: 'Escola Federal I', tipoEscola: 'Técnico', situacaoEscola: 'Ativa' },
  { redeEnsino: 'Municipal', diretoria: 'Diretoria Oeste', municipio: 'São Carlos', distrito: 'Distrito 9', codigo: '10010', nomeEscola: 'Escola Municipal J', tipoEscola: 'Fundamental', situacaoEscola: 'Ativa' },
  { redeEnsino: 'Estadual', diretoria: 'Diretoria Central', municipio: 'Marília', distrito: 'Distrito 10', codigo: '10011', nomeEscola: 'Escola Estadual K', tipoEscola: 'Médio', situacaoEscola: 'Inativa' },
  { redeEnsino: 'Federal', diretoria: 'Diretoria Sul', municipio: 'Presidente Prudente', distrito: 'Distrito 11', codigo: '10012', nomeEscola: 'Escola Federal L', tipoEscola: 'Técnico', situacaoEscola: 'Ativa' },
  { redeEnsino: 'Municipal', diretoria: 'Diretoria Norte', municipio: 'São Vicente', distrito: 'Distrito 12', codigo: '10013', nomeEscola: 'Escola Municipal M', tipoEscola: 'Fundamental', situacaoEscola: 'Ativa' },
  { redeEnsino: 'Estadual', diretoria: 'Diretoria Leste', municipio: 'Taubaté', distrito: 'Distrito 13', codigo: '10014', nomeEscola: 'Escola Estadual N', tipoEscola: 'Médio', situacaoEscola: 'Ativa' },
  { redeEnsino: 'Federal', diretoria: 'Diretoria Oeste', municipio: 'Mogi das Cruzes', distrito: 'Distrito 14', codigo: '10015', nomeEscola: 'Escola Federal O', tipoEscola: 'Técnico', situacaoEscola: 'Ativa' },
];


export default function Home() {
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
    <div className='container my-5'>
      {showAlert  && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {message}
        </Alert>
      )}
        <h1 className="mb-4 text-center">Listagem de Escolas</h1>
        <SchoolTable data={mockData}/>
    </div>
  )
}
