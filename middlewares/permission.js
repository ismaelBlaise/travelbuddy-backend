import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import validator from 'validator';
import { Role } from '../models/Role.js';


export const authorizeRoles = (...allowedRoles) => {
  return async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Non authentifié' });
    }

    const role= await Role.findOne({ where: { id_role: req.user.id_role } });
    if (!role) {    
        return res.status(403).json({ message: 'Rôle non trouvé' });
        }
    req.user.role = role;  
    // console.log(`Rôle de l'utilisateur: ${req.user.role.name}`);
    if (!allowedRoles.includes(req.user.role.name)) {
      return res.status(403).json({ message: 'Accès refusé' });
    }

    next();
  };
};
