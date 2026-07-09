import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "../../Features/Footer/Footer";
import NavBar from "../../Features/Nav/NavBar";

function MainLayout() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <NavBar />
      <Container component="main" sx={{ flex: 1, py: 4 }}>
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
}

export default MainLayout;
