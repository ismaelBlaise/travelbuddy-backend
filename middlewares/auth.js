import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import validator from 'validator';

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Token manquant' });

  const token = authHeader.split(' ')[1]; // "Bearer TOKEN"

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    console.log(req.user);// id_user et id_role
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalide', error: error.message });
  }
};


export const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Nom, email et mot de passe sont obligatoires' });
  }

   
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: 'Email invalide' });
  }

   
  if (!validator.isStrongPassword(password, { 
    minLength: 6, 
    minLowercase: 1, 
    minUppercase: 0, 
    minNumbers: 1, 
    minSymbols: 0 
  })) {
    return res.status(400).json({ 
      message: 'Mot de passe trop faible. Il doit contenir au moins 6 caractères, dont au moins une lettre et un chiffre.' 
    });
  }

  next();
};


export const validateLogin = (req, res, next) => {
  const { name, email, password } = req.body;

  if (  !email || !password) {
    return res.status(400).json({ message: ' email et mot de passe sont obligatoires' });
  }

   
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: 'Email invalide' });
  }

   
  if (!validator.isStrongPassword(password, { 
    minLength: 6, 
    minLowercase: 1, 
    minUppercase: 0, 
    minNumbers: 1, 
    minSymbols: 0 
  })) {
    return res.status(400).json({ 
      message: 'Mot de passe trop faible. Il doit contenir au moins 6 caractères, dont au moins une lettre et un chiffre.' 
    });
  }

  next();
};


