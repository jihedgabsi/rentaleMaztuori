import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Login from './page/Login';
import CarRentalForm from './page/CarRentalForm';
import SearchClient from './page/SearchClient';
import ModifyClientForm from './page/ModifyClientForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Composant de route protégée
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');
  return token ? children : <Navigate to="/" />;
};

// Composant de redirection basé sur l'authentification
const RedirectBasedOnAuth = () => {
  const token = localStorage.getItem('authToken');
  return token ? <Navigate to="/search-client" /> : <Login />;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    window.location.href = '/';
  };

  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Car Rental Service</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {isAuthenticated ? (
                <>
                  <Nav.Link as={Link} to="/car-rental-form">Enregistrer un client</Nav.Link>
                  <Nav.Link as={Link} to="/search-client">Rechercher un client</Nav.Link>
                </>
              ) : (
                <Nav.Link as={Link} to="/">Se connecter</Nav.Link>
              )}
            </Nav>
            {isAuthenticated && (
              <Button variant="outline-light" onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} /> Déconnexion
              </Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<RedirectBasedOnAuth />} />
          <Route
            path="/car-rental-form"
            element={
              <ProtectedRoute>
                <CarRentalForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/search-client"
            element={
              <ProtectedRoute>
                <SearchClient />
              </ProtectedRoute>
            }
          />
          <Route
            path="/modify-client/:clientId"
            element={
              <ProtectedRoute>
                <ModifyClientForm />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
