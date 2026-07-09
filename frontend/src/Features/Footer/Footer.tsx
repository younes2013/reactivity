import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box component="footer" sx={{ py: 2, textAlign: "center", mt: "auto" }}>
      <Typography variant="body2" color="text.secondary">
        Reactivity — gestion d'activités de loisir
      </Typography>
    </Box>
  );
}

export default Footer;
