import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import validator from 'validator';


export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Non authentifié' });
    }

    if (!allowedRoles.includes(req.user.role.name)) {
      return res.status(403).json({ message: 'Accès refusé' });
    }

    next();
  };
};
