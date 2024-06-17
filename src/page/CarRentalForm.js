import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './CarRentalForm.css'; // Importer le fichier CSS pour le formulaire

const CarRentalForm = () => {
  const [client, setClient] = useState({
    nom: '',
    prenom: '',
    lieu: '',
    numeroPermis: '',
    datePermis: '',
    lieuPermis: '',
    tel: '',
    cin: '',
    dateCin: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'clients'), client);
      alert('Client enregistré avec succès!');
      setClient({
        nom: '',
        prenom: '',
        lieu: '',
        numeroPermis: '',
        datePermis: '',
        lieuPermis: '',
        tel: '',
        cin: '',
        dateCin: ''
      });
      
    } catch (error) {
      console.error("Erreur lors de l'enregistrement du client: ", error);
      alert("Erreur lors de l'enregistrement du client: " + error.message);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <h2 className="mb-4">Enregistrer un client</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNom" className="mb-3">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                name="nom"
                value={client.nom}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPrenom" className="mb-3">
              <Form.Label>Prénom</Form.Label>
              <Form.Control
                type="text"
                name="prenom"
                value={client.prenom}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formLieu" className="mb-3">
              <Form.Label>Lieu</Form.Label>
              <Form.Control
                type="text"
                name="lieu"
                value={client.lieu}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formNumeroPermis" className="mb-3">
              <Form.Label>Numéro de Permis</Form.Label>
              <Form.Control
                type="text"
                name="numeroPermis"
                value={client.numeroPermis}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDatePermis" className="mb-3">
              <Form.Label>Date de Permis</Form.Label>
              <Form.Control
                type="date"
                name="datePermis"
                value={client.datePermis}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formLieuPermis" className="mb-3">
              <Form.Label>Lieu de Permis</Form.Label>
              <Form.Control
                type="text"
                name="lieuPermis"
                value={client.lieuPermis}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formTel" className="mb-3">
              <Form.Label>Tel</Form.Label>
              <Form.Control
                type="text"
                name="tel"
                value={client.tel}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formCin" className="mb-3">
              <Form.Label>CIN</Form.Label>
              <Form.Control
                type="text"
                name="cin"
                value={client.cin}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDateCin" className="mb-3">
              <Form.Label>Date de CIN</Form.Label>
              <Form.Control
                type="date"
                name="dateCin"
                value={client.dateCin}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">Enregistrer</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CarRentalForm;
