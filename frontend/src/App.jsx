import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import { createTheme, ThemeProvider, CssBaseline, Box } from "@mui/material";
import { AuthProvider } from "./context/AuthContext";
import { MovieProvider } from "./context/MovieContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Search from "./pages/Search";
import MovieForm from "./pages/Admin/MovieForm";
import ProtectedRoute from "./components/ProtectedRoute";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#000000',
      paper: '#121212',
    },
    primary: {
      main: '#f5c518',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AuthProvider>
        <MovieProvider>
          <Router>
            <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
              <Navbar />
              <Box component="main" sx={{ flexGrow: 1 }}>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/search" element={<Search />} />

                  {/* Admin Routes */}
                  <Route 
                    path="/admin/add" 
                    element={
                      <ProtectedRoute adminOnly>
                        <MovieForm />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/edit/:id" 
                    element={
                      <ProtectedRoute adminOnly>
                        <MovieForm />
                      </ProtectedRoute>
                    } 
                  />
                </Routes>
              </Box>
            </Box>
          </Router>
        </MovieProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
