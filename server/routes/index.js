const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Place = require('../models/place');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Route pour obtenir la liste des lieux de balade
router.get('/places', async (req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route pour obtenir un lieu de balade par son ID
router.get('/places/:id', async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) {
      return res.status(404).json({ error: 'Place not found' });
    }
    res.json(place);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route pour créer un nouveau lieu de balade
router.post('/places', upload.single('image'), async (req, res) => {
  try {
    const newPlace = new Place({
      name: req.body.name,
      tags: JSON.parse(req.body.tags),
      time: req.body.time,
      imageUrl: req.file ? req.file.path : null // Stockez le chemin de l'image s'il existe
    });
    const savedPlace = await newPlace.save();
    res.json(savedPlace);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
});

// Route pour mettre à jour un lieu de balade par son ID
router.put('/places/:id', async (req, res) => {
  try {
    const place = await Place.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!place) {
      return res.status(404).json({ error: 'Place not found' });
    }
    res.json(place);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
});

// Route pour supprimer un lieu de balade par son ID
router.delete('/places/:id', async (req, res) => {
  try {
    const place = await Place.findByIdAndRemove(req.params.id);
    if (!place) {
      return res.status(404).json({ error: 'Place not found' });
    }
    res.json({ message: 'Place deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
