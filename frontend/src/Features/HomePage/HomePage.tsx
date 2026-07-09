import { Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { authStore } from "../../App/Stores/AuthStore";

function HomePage() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Bienvenue sur Reactivity
      </Typography>
      <Typography variant="body1">
        {authStore.isAuthenticated
          ? `Content de te revoir, ${authStore.user?.displayName}.`
          : "Connecte-toi pour créer ou rejoindre des activités de loisir."}
      </Typography>
    </>
  );
}

export default observer(HomePage);
