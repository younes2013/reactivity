import { Paper, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { authStore } from "../../App/Stores/AuthStore";

function Profile() {
  return (
    <Paper sx={{ p: 4, maxWidth: 400 }}>
      <Typography variant="h5" gutterBottom>
        Mon profil
      </Typography>
      <Typography>Nom : {authStore.user?.displayName}</Typography>
      <Typography>Email : {authStore.user?.email}</Typography>
    </Paper>
  );
}

export default observer(Profile);
