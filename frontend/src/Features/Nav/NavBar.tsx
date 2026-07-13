import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { authStore } from "../../App/Stores/AuthStore";

function NavBar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authStore.logout();
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{ color: "inherit", textDecoration: "none", mr: 3 }}
        >
          Reactivity
        </Typography>
        <Button color="inherit" component={RouterLink} to="/activities">
          Activités
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: "flex", gap: 1 }}>
          {authStore.isAuthenticated ? (
            <>
              <Button color="inherit" component={RouterLink} to="/my-inscriptions">
                Mes inscriptions
              </Button>
              <Typography sx={{ alignSelf: "center", mr: 1 }}>
                {authStore.user?.displayName}
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                Déconnexion
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/login">
                Connexion
              </Button>
              <Button color="inherit" component={RouterLink} to="/register">
                Créer un compte
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default observer(NavBar);
