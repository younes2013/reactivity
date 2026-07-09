import { Alert, Box, Button, Paper, TextField, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { authStore } from "../../App/Stores/AuthStore";
import { validateEmail, validatePassword } from "../../App/Services/validationService";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const errors = {
      email: validateEmail(email) ?? undefined,
      password: validatePassword(password) ?? undefined,
    };
    setFieldErrors(errors);
    if (errors.email || errors.password) return;

    try {
      await authStore.login({ email, password });
      navigate("/");
    } catch {
      // l'erreur est déjà exposée via authStore.error
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Paper sx={{ p: 4, width: "100%", maxWidth: 400 }}>
        <Typography variant="h5" gutterBottom>
          Connexion
        </Typography>

        {authStore.error && <Alert severity="error" sx={{ mb: 2 }}>{authStore.error}</Alert>}

        <Box component="form" onSubmit={handleSubmit} noValidate>
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
            helperText={fieldErrors.password}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={authStore.isLoading}
          >
            Se connecter
          </Button>
        </Box>

        <Typography sx={{ mt: 2 }} variant="body2">
          Pas encore de compte ? <RouterLink to="/register">Créer un compte</RouterLink>
        </Typography>
      </Paper>
    </Box>
  );
}

export default observer(Login);
