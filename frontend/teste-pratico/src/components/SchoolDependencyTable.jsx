import { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, TextField, Box, TablePagination, Button 
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useParams } from 'react-router-dom';
import DeleteModal from './DeleteModal';

export default function SchoolDependencyTable({data}) {
  const { id } = useParams();
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const rowsPerPage = 5;

  const filteredData = data.filter(item =>
    Object.values(item).some(value =>
      value.toString().toLowerCase().includes(filter.toLowerCase())
    )
  );

  const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = (event, newPage) => {
      setPage(newPage);
  };

  // Reseta a página para 0 quando o filtro mudar, para evitar página inválida
  useEffect(() => {
      setPage(0);
  }, [filter]);

  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/dependencia/editar/${id}`);
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', mt: 4 }}>
      <Box sx={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2, 
        }}>
        {/* Campo de pesquisa */}
        <TextField
          variant="outlined"
          fullWidth
          value={filter}
          onChange={e => setFilter(e.target.value)}
          placeholder="Digite para filtrar..."
          size="small"
          sx={{ width: '300px' }}
        />

        {/* Botão adicionar */}
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ textTransform: 'none', fontWeight: 'bold' }}
          onClick={() => navigate(`/dependencia/adicionar/${id}`)}
        >
          Adicionar Dependência
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table aria-label="table with filter and pagination">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#343a40' }}>
                <TableCell sx={{ color: 'white' }}>Nome da Dependência</TableCell>
                <TableCell sx={{ color: 'white' }}>Quantidade</TableCell>
              <TableCell sx={{ color: 'white' }} align="center">Ações</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedData.map((row, index) => (
              <TableRow key={index} hover>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell align="center">
                  <IconButton color="warning" aria-label="editar" onClick={() => handleEdit(row.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    aria-label="deletar"
                    onClick={() => setItemToDelete(row)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  {itemToDelete && (
                  <DeleteModal
                    open={Boolean(itemToDelete)}
                    onClose={() => setItemToDelete(null)}
                    onConfirm={() => {
                      setItemToDelete(null);
                    }}
                    itemName={itemToDelete.name}
                    itemType={"Dependência"}
                    itemId={itemToDelete.id}
                  />
                )}
                </TableCell>
              </TableRow>
            ))}
            {paginatedData.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  Nenhum registro encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Paginação */}
        <TablePagination
          rowsPerPageOptions={[]} // só mostra as opções de página padrão (nenhuma)
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </TableContainer>
    </Box>
  )
}
