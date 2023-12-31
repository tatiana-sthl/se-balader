import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import predefinedTags from '../../data/tags';
import './_placeList.scss';


const PlaceList = () => {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTags, setSelectedTags] = useState([]);
  const [showImageOverlay, setShowImageOverlay] = useState(false);
  const [overlayImageUrl, setOverlayImageUrl] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/places')
      .then(response => {
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
    setShowImageOverlay(true);
    setOverlayImageUrl(`/uploads/${imageUrl}`);
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div>
      <div className='title'>
        <h2 className='title__h2'>On va se promener où ?</h2>
      </div>
      <a><Link to="/add">Ajouter un lieu</Link></a>
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
            <button onClick={() => handleEdit(place._id)}>Modifier</button>
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
