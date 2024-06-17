import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Form, Table, Button, Container, Row, Col } from 'react-bootstrap';
import './SearchClient.css';

const SearchClient = () => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchNom, setSearchNom] = useState('');
  const [searchPrenom, setSearchPrenom] = useState('');
  const navigate = useNavigate();

  const fetchClients = async () => {
    const clientsRef = collection(db, 'clients');
    try {
      const querySnapshot = await getDocs(clientsRef);
      const clientsData = [];
      querySnapshot.forEach((doc) => {
        clientsData.push({ id: doc.id, ...doc.data() });
      });
      setClients(clientsData);
      setFilteredClients(clientsData);
    } catch (error) {
      console.error("Erreur lors du chargement des clients: ", error);
      alert("Erreur lors du chargement des clients: " + error.message);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    const filtered = clients.filter((client) => {
      const nomMatch = client.nom.toLowerCase().includes(searchNom.toLowerCase());
      const prenomMatch = client.prenom.toLowerCase().includes(searchPrenom.toLowerCase());
      return nomMatch && prenomMatch;
    });
    setFilteredClients(filtered);
  }, [clients, searchNom, searchPrenom]);

  const handleChangeNom = (e) => {
    setSearchNom(e.target.value);
  };

  const handleChangePrenom = (e) => {
    setSearchPrenom(e.target.value);
  };

  const handleDeleteClient = async (clientId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce client ?")) {
      try {
        await deleteDoc(doc(db, 'clients', clientId));
        setClients(clients.filter(client => client.id !== clientId));
        setFilteredClients(filteredClients.filter(client => client.id !== clientId));
        alert("Client supprimé avec succès");
      } catch (error) {
        console.error("Erreur lors de la suppression du client: ", error);
        alert("Erreur lors de la suppression du client: " + error.message);
      }
    }
  };

  const handleEditClient = (clientId) => {
    navigate(`/modify-client/${clientId}`);
  };

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group controlId="searchNom">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control type="text" value={searchNom} onChange={handleChangeNom} placeholder="Rechercher par nom" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="searchPrenom">
                  <Form.Label>Prénom</Form.Label>
                  <Form.Control type="text" value={searchPrenom} onChange={handleChangePrenom} placeholder="Rechercher par prénom" />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Liste des clients</h2>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Lieu</th>
                <th>Numéro de Permis</th>
                <th>Date du Permis</th>
                <th>Lieu du Permis</th>
                <th>Tel</th>
                <th>CIN</th>
                <th>Date CIN</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client.id}>
                  <td>{client.nom}</td>
                  <td>{client.prenom}</td>
                  <td>{client.lieu}</td>
                  <td>{client.numeroPermis}</td>
                  <td>{client.datePermis}</td>
                  <td>{client.lieuPermis}</td>
                  <td>{client.tel}</td>
                  <td>{client.cin}</td>
                  <td>{client.dateCin}</td>
                  <td>
                    <Button variant="warning" className="me-2" onClick={() => handleEditClient(client.id)}>Modifier</Button>
                    <Button variant="danger" onClick={() => handleDeleteClient(client.id)}>Supprimer</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchClient;
