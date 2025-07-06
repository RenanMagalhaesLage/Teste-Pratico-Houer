import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  Alert,
  Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

export default function DeleteModal({ open, onClose, onConfirm, itemName, itemType, itemId }) {
  const [showAlert, setShowAlert] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const handleDelete = async (e) => {
    e.preventDefault();
    if(itemType === "Escola"){
      deleteSchool();
      onClose();
    }else {
      deleteSchoolDependency();
      onClose();
    }
    setOpenModal(false);
  };

  const deleteSchool = async () => {
    await axios.delete("http://localhost:8080/schools",{
      params: {
        id: itemId
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      window.location.reload();
    })
    .catch(error => {
      console.error("Erro:", error);
    });
  };

  const deleteSchoolDependency = async () => {
    await axios.delete("http://localhost:8080/school-dependencies",{
      params: {
        id: itemId
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      window.location.reload();
    })
    .catch(error => {
      console.error("Erro:", error);
    });
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
    >
      <DialogTitle id="delete-dialog-title">
        <DeleteIcon sx={{ mr: 1, color: 'error.main' }} />
        Confirmar Exclusão
      </DialogTitle>

      <DialogContent>
        <DialogContentText id="delete-dialog-description">
          Tem certeza que deseja excluir a {itemType} <strong>{itemName}</strong>? Essa ação não poderá ser desfeita.
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="primary">
          Cancelar
        </Button>
        <Button onClick={handleDelete} variant="contained" color="error">
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
    
  );
}
