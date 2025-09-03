import { User } from '../models/User.js';
import { Role } from '../models/Role.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const updateProfile = async (req, res) => {
  try {
    const { name, email, bio } = req.body;
    const user = await User.findByPk(req.user.id_user);

    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    if (name) user.name = name;
    if (email) user.email = email;
    if (bio) user.bio = bio;
    

    await user.save();

    res.json({
      message: 'Profil mis à jour avec succès',
      user: {
        id_user: user.id_user,
        name: user.name,
        email: user.email,
        bio: user.bio
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};



export const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findByPk(req.user.id_user);

    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

     
    const isValid = await bcrypt.compare(oldPassword, user.password);
    if (!isValid) return res.status(401).json({ message: 'Ancien mot de passe incorrect' });

    
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: 'Mot de passe mis à jour avec succès' });

  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};



export const updatePhoto = async (req, res) => {
  try {
    const { photo_url } = req.body;
    const user = await User.findByPk(req.user.id_user);

    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    if (!photo_url) return res.status(400).json({ message: 'Photo URL obligatoire' });

    user.photo_url = photo_url;
    await user.save();

    res.json({
      message: 'Photo de profil mise à jour avec succès',
      photo_url: user.photo_url
    });

  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

