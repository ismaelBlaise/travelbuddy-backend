
import { Travel } from '../models/Travel.js';
import { TravelPhoto } from '../models/TravelPhoto.js';


export const addTravelPhotos = async (req, res) => {
  try {
    const { id } = req.params; 
    const { photos } = req.body; 
    const travel = await Travel.findByPk(id);
    if (!travel) return res.status(404).json({ message: 'Voyage non trouvé' });

    if (travel.id_user !== req.user.id_user) {
      return res.status(403).json({ message: 'Action non autorisée' });
    }

    if (!photos || !Array.isArray(photos) || photos.length === 0) {
      return res.status(400).json({ message: 'Aucune photo à ajouter' });
    }

    const photoRecords = photos.map(url => ({
      id_travel: travel.id_travel,
      url
    }));

    await TravelPhoto.bulkCreate(photoRecords);

    const updatedTravel = await Travel.findByPk(travel.id_travel, {
      include: [{ model: TravelPhoto }]
    });

    res.status(200).json({
      message: 'Photos ajoutées avec succès',
      travel: updatedTravel
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

export const updateTravelPhoto = async (req, res) => {
  try {
    const { id_photo } = req.params; 
    const { url } = req.body;

    const photo = await TravelPhoto.findByPk(id_photo, { include: Travel });
    if (!photo) return res.status(404).json({ message: 'Photo non trouvée' });

    if (photo.Travel.id_user !== req.user.id_user) {
      return res.status(403).json({ message: 'Action non autorisée' });
    }

    if (!url) return res.status(400).json({ message: 'Nouvelle URL obligatoire' });

    photo.url = url;
    await photo.save();

    res.status(200).json({ message: 'Photo mise à jour', photo });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};


export const deleteTravelPhoto = async (req, res) => {
  try {
    const { id_photo } = req.params;

    const photo = await TravelPhoto.findByPk(id_photo, { include: Travel });
    if (!photo) return res.status(404).json({ message: 'Photo non trouvée' });

    if (photo.Travel.id_user !== req.user.id_user) {
      return res.status(403).json({ message: 'Action non autorisée' });
    }

    await photo.destroy();

    res.status(200).json({ message: 'Photo supprimée avec succès' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};
