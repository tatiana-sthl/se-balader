import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlaceList = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('/api/places')
      .then(response => {
        console.log(response.data); // Vérifiez la réponse renvoyée par le serveur
        setPlaces(response.data);
      })
      .catch(error => {
        console.error('axios', error.response); // Affichez les détails de l'erreur
      });
  }, []);

  return (
    <div>
      <h2>Liste des lieux de balade</h2>
      <ul>
        {places.map(place => (
          <li key={place._id}>{place.name} - {place.time} minutes - {place.tags}</li>
        ))}
      </ul>
    </div>
  );
};

export default PlaceList;
