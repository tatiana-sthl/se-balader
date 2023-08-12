import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const predefinedTags = ['Laisse obligatoire', 'Accessible par temps pluvieux', 'Accessible en période de chasse', 'Dans la forêt', 'En plaine', 'Accès à l\'eau'];

const AddPlaceForm = () => {
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [tags, setTags] = useState('');

  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();

    const newPlace = { name, time: parseInt(time), tags };

    axios.post('/api/places', newPlace)
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
