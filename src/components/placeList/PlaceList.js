import React, { useState, useEffect } from 'react';
import axios from 'axios';

const predefinedTags = ['Laisse obligatoire', 'Accessible par temps pluvieux', 'Accessible en période de chasse', 'Dans la forêt', 'En plaine', 'Accès à l\'eau'];

const PlaceList = () => {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTags, setSelectedTags] = useState([]);
  const [showImageOverlay, setShowImageOverlay] = useState(false);
  const [overlayImageUrl, setOverlayImageUrl] = useState('');

  useEffect(() => {
    axios.get('/api/places')
      .then(response => {
        // Ajouter une propriété imageUrl à chaque lieu de balade
        setPlaces(response.data.map(place => ({ ...place, imageUrl: place.imageUrl || null })));
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

  const openImageOverlay = imageUrl => {
    console.log(imageUrl);
    setShowImageOverlay(true);
    setOverlayImageUrl(imageUrl);
  };

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
            {place.imageUrl && (
              <button onClick={() => openImageOverlay(place.imageUrl)}>Afficher l'image</button>
            )}
          </li>
        ))}
      </ul>
      {showImageOverlay && (
        <div className="image-overlay">
          <div className="overlay-content">
            <img src={`http://localhost:5000${places.imageUrl}`} alt="Plan de la promenade" />
            <button onClick={() => setShowImageOverlay(false)}>Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceList;
