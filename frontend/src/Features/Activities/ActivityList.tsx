import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { activityStore } from "../../App/Stores/ActivityStore";
import { authStore } from "../../App/Stores/AuthStore";

function ActivityList() {
  useEffect(() => {
    activityStore.fetchAll();
  }, []);

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4">Activités</Typography>
        {authStore.isAuthenticated && (
          <Button component={RouterLink} to="/activities/new" variant="contained">
            Créer une activité
          </Button>
        )}
      </Stack>

      {activityStore.isLoading && <CircularProgress />}

      {!activityStore.isLoading && activityStore.activities.length === 0 && (
        <Typography>Aucune activité pour le moment.</Typography>
      )}

      <Stack spacing={2}>
        {activityStore.activities.map((activity) => (
          <Card key={activity.id}>
            <CardActionArea component={RouterLink} to={`/activities/${activity.id}`}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                  <Box>
                    <Typography variant="h6">{activity.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(activity.date).toLocaleDateString("fr-CA", {
                        dateStyle: "long",
                      })}{" "}
                      · {activity.city} — {activity.venue}
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={1} alignItems="center">
                    {activity.isCancelled && <Chip label="Annulée" color="error" size="small" />}
                    <Chip label={activity.category} size="small" />
                  </Stack>
                </Stack>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {activity.inscriptionsCount} inscrit(s)
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Stack>
    </>
  );
}

export default observer(ActivityList);
