import validator from 'validator';

export const validateBadgeData = (req, res, next) => {
  const { name, description, points_required, photo_url } = req.body;
  const errors = [];

  if (!name || validator.isEmpty(name)) {
    errors.push({ field: 'name', message: 'Le nom est obligatoire' });
  }
  if (name && !validator.isLength(name, { max: 50 })) {
    errors.push({ field: 'name', message: 'Le nom ne doit pas dépasser 50 caractères' });
  }
  if (points_required !== undefined && !validator.isInt(points_required.toString(), { min: 0 })) {
    errors.push({ field: 'points_required', message: 'Les points doivent être un entier positif' });
  }
  if (photo_url && !validator.isURL(photo_url)) {
    errors.push({ field: 'photo_url', message: 'L\'URL doit être valide' });
  }

  if (errors.length > 0) return res.status(400).json({ errors });
  next();
};
