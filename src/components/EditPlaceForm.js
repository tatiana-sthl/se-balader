import React, { useState } from 'react';
import axios from 'axios';

const EditPlaceForm = ({ place }) => {
  const [name, setName] = useState(place.name);
  const [time, setTime] = useState(place.time);
  const [tags, setTags] = useState(place.tags);

  const handleSubmit = event => {
    event.preventDefault();

    const updatedPlace = { name, time: parseInt(time), tags };

    axios.put(`/api/places/${place._id}`, updatedPlace)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Modifier le lieu de balade</h2>
      <form onSubmit={handleSubmit}>
        <label>Nom du lieu:</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />

        <label>Temps de balade:</label>
        <input type="number" value={time} onChange={e => setTime(e.target.value)} />

        <label>Tags:</label>
        <input type="text" value={tags} onChange={e => setTags(e.target.value)} />

        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
};

export default EditPlaceForm;
