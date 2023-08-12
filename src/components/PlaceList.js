import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlaceList = () => {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/places')
      .then(response => {
        setPlaces(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('axios', error.response);
        setIsLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/api/places/${id}`)
      .then(response => {
        console.log(response.data);
        // Rechargez simplement la page pour refléter la suppression
        window.location.reload();
      })
      .catch(error => {
        console.error(error);
      });
  };

  if (isLoading) {
    return <p>Chargement en cours...</p>;
  }

  return (
    <div>
      <h2>Liste des lieux de balade</h2>
      <ul>
        {places.map(place => (
          <li key={place._id}>
            {place.name} - {place.time} minutes - {place.tags}
            <button onClick={() => handleDelete(place._id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaceList;
