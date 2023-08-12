import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditPlaceForm = () => {
  const { id } = useParams(); // Obtient l'ID du lieu depuis l'URL
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    axios.get(`/api/places/${id}`)
      .then(response => {
        const placeData = response.data;
        setName(placeData.name || '');
        setTime(placeData.time || '');
        setTags(placeData.tags || '');
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();

    const updatedPlace = { name, time: parseInt(time), tags };

    axios.put(`/api/places/${id}`, updatedPlace)
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
