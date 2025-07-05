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

export default function DeleteModal({ open, onClose, onConfirm, itemName, itemType, itemId }) {
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const handleDelete = (e) => {
    e.preventDefault();
    console.log('Exclusão feita com sucesso:');
    if(itemType === "Escola"){
      navigate('/home', {
        state: { successMessage: 'Escola excluida!' }
      });
      onClose();
    }else {
      navigate(`/escola/${itemId}`, {
        state: { successMessage: 'Dependência excluida!' }
      });
      onClose();
    }
  };
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
