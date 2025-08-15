import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import validator from 'validator';

export const validatePassword = (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  if (  !oldPassword || !newPassword) {
    return res.status(400).json({ message: ' Ancien et nouveau mot de passe sont obligatoires' });
  }

   
  

   
  if (!validator.isStrongPassword(oldPassword, { 
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

  if (!validator.isStrongPassword(newPassword, { 
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


export const validateProfile = (req, res, next) => {
  const { name, email, bio } = req.body;

  

   
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: 'Email invalide' });
  }

   
  

  next();
};

