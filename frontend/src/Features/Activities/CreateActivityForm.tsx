import { Alert, Box, Button, Paper, TextField, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { activityStore } from "../../App/Stores/ActivityStore";
import type { ActivityFormValues } from "../../App/Models/Activity";
import {
  validateCoordinate,
  validateFutureDate,
  validateRequired,
} from "../../App/Services/validationService";

const initialValues: ActivityFormValues = {
  title: "",
  date: "",
  description: "",
  category: "",
  city: "",
  venue: "",
  latitude: 0,
  longitude: 0,
};

type FieldErrors = Partial<Record<keyof ActivityFormValues, string>>;

function CreateActivityForm() {
  const navigate = useNavigate();
  const [values, setValues] = useState<ActivityFormValues>(initialValues);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange =
    (field: keyof ActivityFormValues) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const isNumeric = field === "latitude" || field === "longitude";
      setValues((prev) => ({
        ...prev,
        [field]: isNumeric ? Number(event.target.value) : event.target.value,
      }));
    };

  const validate = (): FieldErrors => ({
    title: validateRequired(values.title, "Le titre", 100) ?? undefined,
    description: validateRequired(values.description, "La description", 2000) ?? undefined,
    category: validateRequired(values.category, "La catégorie", 50) ?? undefined,
    city: validateRequired(values.city, "La ville", 100) ?? undefined,
    venue: validateRequired(values.venue, "Le lieu", 200) ?? undefined,
    date: validateFutureDate(values.date) ?? undefined,
    latitude: validateCoordinate(values.latitude, -90, 90, "La latitude") ?? undefined,
    longitude: validateCoordinate(values.longitude, -180, 180, "La longitude") ?? undefined,
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitError(null);

    const errors = validate();
    setFieldErrors(errors);
    if (Object.values(errors).some(Boolean)) return;

    setIsSubmitting(true);
    try {
      const id = await activityStore.create({ ...values, date: new Date(values.date).toISOString() });
      navigate(`/activities/${id}`);
    } catch {
      setSubmitError("Impossible de créer l'activité. Vérifie les informations saisies.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Paper sx={{ p: 4, width: "100%", maxWidth: 560 }}>
        <Typography variant="h5" gutterBottom>
          Créer une activité
        </Typography>

        {submitError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {submitError}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Titre"
            fullWidth
            margin="normal"
            value={values.title}
            onChange={handleChange("title")}
            error={!!fieldErrors.title}
            helperText={fieldErrors.title}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            minRows={3}
            margin="normal"
            value={values.description}
            onChange={handleChange("description")}
            error={!!fieldErrors.description}
            helperText={fieldErrors.description}
          />
          <TextField
            label="Catégorie"
            fullWidth
            margin="normal"
            value={values.category}
            onChange={handleChange("category")}
            error={!!fieldErrors.category}
            helperText={fieldErrors.category}
          />
          <TextField
            label="Date et heure"
            type="datetime-local"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={values.date}
            onChange={handleChange("date")}
            error={!!fieldErrors.date}
            helperText={fieldErrors.date}
          />
          <TextField
            label="Ville"
            fullWidth
            margin="normal"
            value={values.city}
            onChange={handleChange("city")}
            error={!!fieldErrors.city}
            helperText={fieldErrors.city}
          />
          <TextField
            label="Lieu"
            fullWidth
            margin="normal"
            value={values.venue}
            onChange={handleChange("venue")}
            error={!!fieldErrors.venue}
            helperText={fieldErrors.venue}
          />
          <TextField
            label="Latitude"
            type="number"
            fullWidth
            margin="normal"
            value={values.latitude}
            onChange={handleChange("latitude")}
            error={!!fieldErrors.latitude}
            helperText={fieldErrors.latitude}
          />
          <TextField
            label="Longitude"
            type="number"
            fullWidth
            margin="normal"
            value={values.longitude}
            onChange={handleChange("longitude")}
            error={!!fieldErrors.longitude}
            helperText={fieldErrors.longitude}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }} disabled={isSubmitting}>
            Créer l'activité
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default observer(CreateActivityForm);
