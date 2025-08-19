import validator from 'validator';

export const validateAddPhotos = (req, res, next) => {
  const { photos } = req.body;

  if (!photos || !Array.isArray(photos) || photos.length === 0) {
    return res.status(400).json({ message: 'Aucune photo à ajouter' });
  }

  const errors = [];

  photos.forEach((url, index) => {
    if (!validator.isURL(url)) {
      errors.push(`Photo à l'index ${index} n'est pas une URL valide`);
    }
  });

  if (errors.length > 0) {
    return res.status(400).json({ message: 'URLs invalides', errors });
  }

  next();
};

export const validateUpdatePhoto = (req, res, next) => {
  const { url } = req.body;

  if (!url || !validator.isURL(url)) {
    return res.status(400).json({ message: 'URL invalide ou manquante' });
  }

  next();
};
