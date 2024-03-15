import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import { useState } from 'react';


const SettingAlert = ({snackbarMessage}) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };



  return (
    <div>
      
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert elevation={6} variant='filled'  onClose={handleSnackbarClose} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SettingAlert;

