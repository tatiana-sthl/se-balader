import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PlaceList = () => {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/places')
      .then(response => {
        setPlaces(response.data);
        setIsLoading(false); // Marquer le chargement comme terminé
      })
      .catch(error => {
        console.error('axios', error.response);
        setIsLoading(false); // Marquer le chargement comme terminé même en cas d'erreur
      });
  }, []);

  useEffect(() => {
    console.log(places); // Affichez les données à chaque fois qu'elles changent
  }, [places]);

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
            <Link to={`/edit/${place._id}`}>
              <button>Modifier</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaceList;
