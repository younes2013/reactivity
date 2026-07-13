import { Alert, Box, Button, Chip, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { activityStore } from "../../App/Stores/ActivityStore";
import { authStore } from "../../App/Stores/AuthStore";

function ActivityDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [actionError, setActionError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) activityStore.fetchById(id);
  }, [id]);

  const handleRegister = async () => {
    if (!id) return;
    setActionError(null);
    setIsSubmitting(true);
    try {
      await activityStore.register(id);
    } catch {
      setActionError("Impossible de s'inscrire à cette activité.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUnregister = async () => {
    if (!id) return;
    setActionError(null);
    setIsSubmitting(true);
    try {
      await activityStore.unregister(id);
    } catch {
      setActionError("Impossible de se désinscrire de cette activité.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (activityStore.isLoading) return <CircularProgress />;

  if (!activityStore.currentActivity) {
    return <Alert severity="error">{activityStore.error ?? "Activité introuvable."}</Alert>;
  }

  const activity = activityStore.currentActivity;
  const isOwner = authStore.user?.id === activity.ownerId;

  return (
    <Paper sx={{ p: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Typography variant="h4" gutterBottom>
            {activity.title}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <Chip label={activity.category} size="small" />
            {activity.isCancelled && <Chip label="Annulée" color="error" size="small" />}
            {isOwner && <Chip label="Votre activité" color="primary" size="small" />}
          </Stack>
        </Box>
        <Button variant="outlined" onClick={() => navigate("/activities")}>
          Retour à la liste
        </Button>
      </Stack>

      <Typography variant="body1" sx={{ mb: 2 }}>
        {activity.description}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        {new Date(activity.date).toLocaleString("fr-CA", { dateStyle: "long", timeStyle: "short" })}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {activity.venue}, {activity.city}
      </Typography>

      <Typography variant="body2" sx={{ mb: 2 }}>
        {activity.inscriptionsCount} inscrit(s)
      </Typography>

      {actionError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {actionError}
        </Alert>
      )}

      {authStore.isAuthenticated && !isOwner && !activity.isCancelled && (
        <Button
          variant="contained"
          color={activityStore.isRegisteredToCurrent ? "error" : "primary"}
          disabled={isSubmitting}
          onClick={activityStore.isRegisteredToCurrent ? handleUnregister : handleRegister}
        >
          {activityStore.isRegisteredToCurrent ? "Se désinscrire" : "S'inscrire"}
        </Button>
      )}

      {!authStore.isAuthenticated && (
        <Alert severity="info">Connecte-toi pour t'inscrire à cette activité.</Alert>
      )}
    </Paper>
  );
}

export default observer(ActivityDetails);
