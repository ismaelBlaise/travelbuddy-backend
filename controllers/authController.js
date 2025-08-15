import { User } from '../models/User.js';
import { Role } from '../models/Role.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const register = async (req, res) => {
  try {
    const { name, email, password, bio, photo_url } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'Email déjà utilisé' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const userRole = await Role.findOne({ where: { name: 'user' } });
    if (!userRole) return res.status(500).json({ message: 'Rôle utilisateur non trouvé' });

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      bio: bio || null,
      photo_url: photo_url || null,
      id_role: userRole.id_role
    });

    res.status(201).json({ 
      message: 'Utilisateur créé', 
      user: { 
        id_user: newUser.id_user, 
        name: newUser.name,
        email: newUser.email,
        bio: newUser.bio,
        photo_url: newUser.photo_url,
        role: userRole.name
      } 
    });

  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

     
    const user = await User.findOne({ 
      where: { email },
      include: [{ model: Role, attributes: ['name'] }]  
    });
    if (!user) return res.status(400).json({ message: 'Utilisateur non trouvé' });

     
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: 'Mot de passe incorrect' });

     
    const token = jwt.sign(
      { id_user: user.id_user, id_role: user.id_role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

     
    res.json({ 
      message: 'Connexion réussie', 
      token, 
      user: {
        id_user: user.id_user,
        name: user.name,
        email: user.email,
        role: user.Role.name // le nom du rôle
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id_user, { 
      attributes: ['id_user', 'name', 'email', 'bio', 'photo_url', 'points'], 
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};


export const logout = (req, res) => {
  res.json({ message: 'Déconnexion réussie' });
};