import { Alert, Box, Button, Paper, TextField, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { authStore } from "../../App/Stores/AuthStore";
import {
  validateDisplayName,
  validateEmail,
  validatePassword,
} from "../../App/Services/validationService";

function Register() {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    displayName?: string;
    email?: string;
    password?: string;
  }>({});

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const errors = {
      displayName: validateDisplayName(displayName) ?? undefined,
      email: validateEmail(email) ?? undefined,
      password: validatePassword(password) ?? undefined,
    };
    setFieldErrors(errors);
    if (errors.displayName || errors.email || errors.password) return;

    try {
      await authStore.register({ displayName, email, password });
      navigate("/");
    } catch {
      // l'erreur est déjà exposée via authStore.error
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Paper sx={{ p: 4, width: "100%", maxWidth: 400 }}>
        <Typography variant="h5" gutterBottom>
          Créer un compte
        </Typography>

        {authStore.error && <Alert severity="error" sx={{ mb: 2 }}>{authStore.error}</Alert>}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Nom affiché"
            fullWidth
            margin="normal"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            error={!!fieldErrors.displayName}
            helperText={fieldErrors.displayName}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!fieldErrors.email}
            helperText={fieldErrors.email}
          />
          <TextField
            label="Mot de passe"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!fieldErrors.password}
            helperText={fieldErrors.password ?? "8 caractères minimum"}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={authStore.isLoading}
          >
            Créer mon compte
          </Button>
        </Box>

        <Typography sx={{ mt: 2 }} variant="body2">
          Déjà inscrit ? <RouterLink to="/login">Se connecter</RouterLink>
        </Typography>
      </Paper>
    </Box>
  );
}

export default observer(Register);
