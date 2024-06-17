import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();
      
      // Save the token to localStorage
      localStorage.setItem('authToken', token);
      
      alert('Connexion réussie!');
      window.location.href = '/search-client';
      navigate('/search-client'); // Redirige vers la page SearchClient
    } catch (error) {
      console.error("Erreur de connexion: ", error);
      setError(error.message);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <h2 className="mb-4">Connexion</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Entrez votre email"
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Entrez votre mot de passe"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Se connecter
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
