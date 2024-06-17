import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';


const ModifyClientForm = ({ onSave }) => {
  const { clientId } = useParams();
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

  useEffect(() => {
    const fetchClient = async () => {
      if (clientId) {
        const clientRef = doc(db, 'clients', clientId);
        const clientSnap = await getDoc(clientRef);
        if (clientSnap.exists()) {
          setClient({ id: clientId, ...clientSnap.data() });
        } else {
          console.error("Client non trouvé!");
        }
      }
    };
    fetchClient();
  }, [clientId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (client.id) {
        const clientRef = doc(db, 'clients', client.id);
        await updateDoc(clientRef, client);
        alert('Client mis à jour avec succès!');
      } else {
        alert('Erreur : ID du client manquant!');
      }
      onSave(); // Callback pour rafraîchir la liste des clients
    } catch (error) {
      console.error("Erreur lors de la mise à jour du client: ", error);
    
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nom:
        <input type="text" name="nom" value={client.nom} onChange={handleChange} required />
      </label>
      <label>
        Prénom:
        <input type="text" name="prenom" value={client.prenom} onChange={handleChange} required />
      </label>
      <label>
        Lieu:
        <input type="text" name="lieu" value={client.lieu} onChange={handleChange} required />
      </label>
      <label>
        Numéro de Permis:
        <input type="text" name="numeroPermis" value={client.numeroPermis} onChange={handleChange} required />
      </label>
      <label>
        Date de Permis:
        <input type="date" name="datePermis" value={client.datePermis} onChange={handleChange} required />
      </label>
      <label>
        Lieu de Permis:
        <input type="text" name="lieuPermis" value={client.lieuPermis} onChange={handleChange} required />
      </label>
      <label>
        Tel:
        <input type="text" name="tel" value={client.tel} onChange={handleChange} required />
      </label>
      <label>
        CIN:
        <input type="text" name="cin" value={client.cin} onChange={handleChange} required />
      </label>
      <label>
        Date de CIN:
        <input type="date" name="dateCin" value={client.dateCin} onChange={handleChange} required />
      </label>
      <button type="submit">Mettre à jour</button>
    </form>
  );
};

export default ModifyClientForm;
