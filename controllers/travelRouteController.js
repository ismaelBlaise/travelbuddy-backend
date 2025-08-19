import { Travel } from '../models/Travel.js';
import { TravelRoute } from '../models/TravelRoute.js';

export const addTravelRoutes = async (req, res) => {
  try {
    const { id } = req.params;  
    const { routes } = req.body; 
    
    const travel = await Travel.findByPk(id);
    if (!travel) return res.status(404).json({ message: 'Voyage non trouvé' });

    if (travel.id_user !== req.user.id_user) {
      return res.status(403).json({ message: 'Action non autorisée' });
    }

    if (!routes || !Array.isArray(routes) || routes.length === 0) {
      return res.status(400).json({ message: 'Aucune route à ajouter' });
    }

    const routeRecords = routes.map(route => ({
      id_travel: travel.id_travel,
      id_activity: route.id_activity || null,
      destination: route.destination,
      latitude: route.latitude,
      longitude: route.longitude,
      step_order: route.step_order,
      description: route.description || null
    }));

    await TravelRoute.bulkCreate(routeRecords);

    const updatedTravel = await Travel.findByPk(travel.id_travel, {
      include: [{ model: TravelRoute }]
    });

    res.status(200).json({
      message: 'Routes ajoutées avec succès',
      travel: updatedTravel
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};


export const updateTravelRoute = async (req, res) => {
  try {
    const { id_route } = req.params;
    const { destination, latitude, longitude, step_order, description, id_activity } = req.body;

    const route = await TravelRoute.findByPk(id_route, { include: Travel });
    if (!route) return res.status(404).json({ message: 'Route non trouvée' });

     
    if (route.Travel.id_user !== req.user.id_user) {
      return res.status(403).json({ message: 'Action non autorisée' });
    }

    if (destination !== undefined) route.destination = destination;
    if (latitude !== undefined) route.latitude = latitude;
    if (longitude !== undefined) route.longitude = longitude;
    if (step_order !== undefined) route.step_order = step_order;
    if (description !== undefined) route.description = description;
    if (id_activity !== undefined) route.id_activity = id_activity;

    await route.save();

    res.status(200).json({ message: 'Route mise à jour', route });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};


export const deleteTravelRoute = async (req, res) => {
  try {
    const { id_route } = req.params;

    const route = await TravelRoute.findByPk(id_route, { include: Travel });
    if (!route) return res.status(404).json({ message: 'Route non trouvée' });

     
    if (route.Travel.id_user !== req.user.id_user) {
      return res.status(403).json({ message: 'Action non autorisée' });
    }

    await route.destroy();

    res.status(200).json({ message: 'Route supprimée avec succès' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

