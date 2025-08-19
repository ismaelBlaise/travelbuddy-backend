import { Travel } from '../models/Travel.js';
import { TravelPhoto } from '../models/TravelPhoto.js';
import { User } from '../models/User.js';
import axios from 'axios';


export const createTravel = async (req, res) => {
  try {
    const { title, description, destination, latitude, longitude, start_date, end_date, photos } = req.body;

    const user = await User.findByPk(req.user.id_user);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    const travel = await Travel.create({
      title,
      description: description || null,
      destination: destination || null,
      latitude: latitude || null,
      longitude: longitude || null,
      start_date: start_date || null,
      end_date: end_date || null,
      id_user: user.id_user
    });

    if (photos && Array.isArray(photos)) {
      const photoRecords = photos.map(url => ({
        id_travel: travel.id_travel,
        url
      }));
      await TravelPhoto.bulkCreate(photoRecords);
    }

    const createdTravel = await Travel.findByPk(travel.id_travel, {
      include: [ { model: TravelPhoto } ]
    });

    res.status(201).json({
      message: 'Voyage publier avec succès',
      travel: createdTravel
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};


export const getDestinations = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ message: 'Paramètre de recherche manquant' });

     
    const apiKey = process.env.OPENCAGE_API_KEY;  
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(q)}&key=${apiKey}&limit=5`;

    const response = await axios.get(url);
    const results = response.data.results.map(item => ({
      name: item.formatted,
      latitude: item.geometry.lat,
      longitude: item.geometry.lng
    }));

    res.json({ destinations: results });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};