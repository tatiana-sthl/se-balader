import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlaceList = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('/api/places')
      .then(response => {
        setPlaces(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h2>Liste des lieux de balade</h2>
      <ul>
        {places.map(place => (
          <li key={place._id}>{place.name} - {place.time} minutes</li>
        ))}
      </ul>
    </div>
  );
};

export default PlaceList;
