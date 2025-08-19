import validator from 'validator';


export const validateAddTravelRoutes = (req, res, next) => {
  const { routes } = req.body;
  const errors = [];

  if (!routes || !Array.isArray(routes) || routes.length === 0) {
    return res.status(400).json({ message: 'Aucune route à ajouter' });
  }

  routes.forEach((route, index) => {
    const { destination, latitude, longitude, step_order, description, id_activity } = route;

    if (!destination || typeof destination !== 'string' || validator.isEmpty(destination.trim())) {
      errors.push(`Route ${index}: destination obligatoire et doit être une chaîne non vide.`);
    } else if (!validator.isLength(destination, { max: 100 })) {
      errors.push(`Route ${index}: destination ne doit pas dépasser 100 caractères.`);
    }

    if (latitude === undefined || !validator.isFloat(latitude.toString(), { min: -90, max: 90 })) {
      errors.push(`Route ${index}: latitude invalide.`);
    }

    if (longitude === undefined || !validator.isFloat(longitude.toString(), { min: -180, max: 180 })) {
      errors.push(`Route ${index}: longitude invalide.`);
    }

    if (step_order === undefined || !Number.isInteger(step_order) || step_order <= 0) {
      errors.push(`Route ${index}: step_order doit être un entier positif.`);
    }

    if (description !== undefined && typeof description !== 'string') {
      errors.push(`Route ${index}: description doit être une chaîne de caractères.`);
    }

    if (id_activity !== undefined && (!Number.isInteger(id_activity) || id_activity <= 0)) {
      errors.push(`Route ${index}: id_activity doit être un entier positif.`);
    }
  });

  if (errors.length > 0) {
    return res.status(400).json({ message: 'Données invalides', errors });
  }

  next();
};


export const validateUpdateTravelRoute = (req, res, next) => {
  const { destination, latitude, longitude, step_order, description, id_activity } = req.body;
  const errors = [];

  if (destination !== undefined) {
    if (typeof destination !== 'string' || validator.isEmpty(destination.trim())) {
      errors.push('Destination doit être une chaîne non vide.');
    } else if (!validator.isLength(destination, { max: 100 })) {
      errors.push('Destination ne doit pas dépasser 100 caractères.');
    }
  }

  if (latitude !== undefined && !validator.isFloat(latitude.toString(), { min: -90, max: 90 })) {
    errors.push('Latitude invalide.');
  }

  if (longitude !== undefined && !validator.isFloat(longitude.toString(), { min: -180, max: 180 })) {
    errors.push('Longitude invalide.');
  }

  if (step_order !== undefined && (!Number.isInteger(step_order) || step_order <= 0)) {
    errors.push('step_order doit être un entier positif.');
  }

  if (description !== undefined && typeof description !== 'string') {
    errors.push('Description doit être une chaîne de caractères.');
  }

  if (id_activity !== undefined && (!Number.isInteger(id_activity) || id_activity <= 0)) {
    errors.push('id_activity doit être un entier positif.');
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: 'Données invalides', errors });
  }

  next();
};
