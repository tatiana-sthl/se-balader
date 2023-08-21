import React, { useState, useEffect } from 'react';
import axios from 'axios';

const predefinedTags = ['Laisse obligatoire', 'Accessible par temps pluvieux', 'Accessible en période de chasse', 'Dans la forêt', 'En plaine', 'Accès à l\'eau'];

const PlaceList = () => {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTags, setSelectedTags] = useState([]);

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

  useEffect(() => {
    const filtered = places.filter(place =>
      selectedTags.every(tag => place.tags.includes(tag.toLowerCase()))
    );
    setFilteredPlaces(filtered);
  }, [selectedTags, places]);

  const handleDelete = (id) => {
    axios.delete(`/api/places/${id}`)
      .then(response => {
        console.log(response.data);
        window.location.reload();
      })
      .catch(error => {
        console.error(error);
      });
  };

  const convertTime = minutes => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
  
    if (hours > 0) {
      return `${hours} h ${remainingMinutes} min`;
    } else {
      return `${remainingMinutes} min`;
    }
  };

  if (isLoading) {
    return <p>Chargement en cours...</p>;
  }

  return (
    <div>
      <h2>Liste des lieux de balade</h2>
      <div>
        <h4>Filtrer par tags:</h4>
        {predefinedTags.map(tag => (
          <div key={tag}>
            <input
              type="checkbox"
              value={tag}
              checked={selectedTags.includes(tag)}
              onChange={e => {
                if (e.target.checked) {
                  setSelectedTags([...selectedTags, tag]);
                } else {
                  setSelectedTags(selectedTags.filter(t => t !== tag));
                }
              }}
            />
            <label>{tag}</label>
          </div>
        ))}
      </div>
      <ul>
        {filteredPlaces.map(place => (
          <li key={place._id}>
            {place.name} - {convertTime(place.time)} - {place.tags.join(', ')}
            <button onClick={() => handleDelete(place._id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaceList;
