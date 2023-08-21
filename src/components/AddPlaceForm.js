import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const predefinedTags = ['Laisse obligatoire', 'Accessible par temps pluvieux', 'Accessible en période de chasse', 'Dans la forêt', 'En plaine', 'Accès à l\'eau'];

const AddPlaceForm = () => {
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [tags, setTags] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();
  
    const newPlace = { name, time: parseInt(time), tags };
  
    const formData = new FormData();
    formData.append('name', newPlace.name);
    formData.append('time', newPlace.time);
    formData.append('tags', JSON.stringify(newPlace.tags));
    formData.append('image', selectedImage);
  
    axios.post('/api/places', formData)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  
    navigate('/');
  };
  

  return (
    <div>
      <h2>Ajouter un nouveau lieu de balade</h2>
      <form onSubmit={handleSubmit}>
        <label>Nom du lieu:</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />

        <label>Temps de balade:</label>
        <input type="number" value={time} onChange={e => setTime(e.target.value)} />

        <label>Image:</label>
        <input type="file" onChange={e => setSelectedImage(e.target.files[0])} />

        {selectedImage && (
          <div>
            <h4>Aperçu de l'image:</h4>
            <img src={URL.createObjectURL(selectedImage)} alt="Aperçu de l'image" style={{ maxWidth: '100px' }} />
          </div>
        )}

        <label>Tags:</label>
        {predefinedTags.map(tag => (
          <div key={tag}>
            <input
              type="checkbox"
              value={tag}
              checked={tags.includes(tag)}
              onChange={e => {
                if (e.target.checked) {
                  setTags([...tags, tag]);
                } else {
                  setTags(tags.filter(t => t !== tag));
                }
              }}
            />
            <label>{tag}</label>
          </div>
        ))}

        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default AddPlaceForm;
