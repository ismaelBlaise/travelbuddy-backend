import validator from 'validator';

export const validateTravel = (req, res, next) => {
  const { title, description, destination, latitude, longitude, start_date, end_date, photos } = req.body;
  const errors = [];

   
  if (!title || typeof title !== 'string' || validator.isEmpty(title.trim())) {
    errors.push('Le titre est obligatoire.');
  } else if (!validator.isLength(title, { max: 100 })) {
    errors.push('Le titre ne doit pas dépasser 100 caractères.');
  }

   
  if (description && typeof description !== 'string') {
    errors.push('La description doit être une chaîne de caractères.');
  }

   
  if (destination && (!validator.isString(destination) || !validator.isLength(destination, { max: 100 }))) {
    errors.push('La destination doit être une chaîne de caractères de maximum 100 caractères.');
  }

   
  if (latitude !== undefined && !validator.isFloat(latitude.toString(), { min: -90, max: 90 })) {
    errors.push('Latitude invalide.');
  }
  if (longitude !== undefined && !validator.isFloat(longitude.toString(), { min: -180, max: 180 })) {
    errors.push('Longitude invalide.');
  }

   
  if (start_date && !validator.isDate(start_date)) {
    errors.push('Date de début invalide.');
  }
  if (end_date && !validator.isDate(end_date)) {
    errors.push('Date de fin invalide.');
  }

   
  if (photos !== undefined) {
    if (!Array.isArray(photos)) {
      errors.push('Photos doit être un tableau.');
    } else {
      photos.forEach((url, index) => {
        if (!validator.isURL(url)) {
          errors.push(`Photo à l'index ${index} n'est pas une URL valide.`);
        }
      });
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: 'Données invalides', errors });
  }

  next();
};
