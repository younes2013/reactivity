import { Button, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function NotFound() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Page introuvable
      </Typography>
      <Typography sx={{ mb: 2 }}>Cette page n'existe pas ou a été déplacée.</Typography>
      <Button component={RouterLink} to="/" variant="contained">
        Retour à l'accueil
      </Button>
    </>
  );
}

export default NotFound;
