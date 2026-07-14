import {
  Alert,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { activityStore } from "../../App/Stores/ActivityStore";

function MyInscriptions() {
  useEffect(() => {
    activityStore.fetchMyInscriptions();
  }, []);

  return (
    <>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Mes inscriptions
      </Typography>

      {activityStore.error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {activityStore.error}
        </Alert>
      )}

      {activityStore.isLoading && <CircularProgress />}

      {!activityStore.isLoading && !activityStore.error && activityStore.myInscriptions.length === 0 && (
        <Typography>Tu n'es inscrit à aucune activité pour le moment.</Typography>
      )}

      <Stack spacing={2}>
        {activityStore.myInscriptions.map((inscription) => (
          <Card key={inscription.inscriptionId}>
            <CardActionArea component={RouterLink} to={`/activities/${inscription.activityId}`}>
              <CardContent>
                <Typography variant="h6">{inscription.activityTitle}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date(inscription.activityDate).toLocaleDateString("fr-CA", {
                    dateStyle: "long",
                  })}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Inscrit le{" "}
                  {new Date(inscription.registeredAt).toLocaleDateString("fr-CA", {
                    dateStyle: "medium",
                  })}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Stack>
    </>
  );
}

export default observer(MyInscriptions);
