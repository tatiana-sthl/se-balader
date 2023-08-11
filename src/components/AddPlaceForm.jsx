import React, { useState } from 'react';
import axios from 'axios';

const AddPlaceForm = () => {
  const [name, setName] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    const newPlace = { name, time: parseInt(time) };

    axios.post('/api/places', newPlace)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Ajouter un nouveau lieu de balade</h2>
      <form onSubmit={handleSubmit}>
        <label>Nom du lieu:</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />

        <label>Temps de balade:</label>
        <input type="number" value={time} onChange={e => setTime(e.target.value)} />

        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default AddPlaceForm;
