import { Button, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Link as RouterLink } from "react-router-dom";
import { authStore } from "../../App/Stores/AuthStore";

function HomePage() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Bienvenue sur Reactivity
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {authStore.isAuthenticated
          ? `Content de te revoir, ${authStore.user?.displayName}.`
          : "Connecte-toi pour créer ou rejoindre des activités de loisir."}
      </Typography>
      <Button component={RouterLink} to="/activities" variant="contained">
        Voir les activités
      </Button>
    </>
  );
}

export default observer(HomePage);
