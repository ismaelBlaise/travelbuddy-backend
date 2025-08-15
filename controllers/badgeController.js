import { Badge } from '../models/Badge.js';
import { User } from '../models/User.js';
import { UserBadge } from '../models/UserBadge.js'; 


export const getUserBadges = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id_user, {
      attributes: ['id_user', 'name', 'email'],
      include: [{
        model: Badge,
        through: { attributes: ['earned_at'] }, 
        attributes: ['id_badge', 'name', 'description', 'points_required', 'photo_url']
      }]
    });

    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    res.json({ badges: user.Badges });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};
 
export const createBadge = async (req, res) => {
  try {
    const { name, description, points_required, photo_url } = req.body;

    const existingBadge = await Badge.findOne({ where: { name } });
    if (existingBadge) return res.status(400).json({ message: 'Badge déjà existant' });

    const badge = await Badge.create({
      name,
      description: description || null,
      points_required: points_required || 0,
      photo_url: photo_url || null
    });

    res.status(201).json({ message: 'Badge créé', badge });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

 
export const getAllBadges = async (req, res) => {
  try {
    const badges = await Badge.findAll();
    res.json(badges);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

 
export const getBadgeById = async (req, res) => {
  try {
    const { id } = req.params;
    const badge = await Badge.findByPk(id);
    if (!badge) return res.status(404).json({ message: 'Badge non trouvé' });

    res.json(badge);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

 
export const updateBadge = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, points_required, photo_url } = req.body;

    const badge = await Badge.findByPk(id);
    if (!badge) return res.status(404).json({ message: 'Badge non trouvé' });

    if (name) badge.name = name;
    if (description) badge.description = description;
    if (points_required !== undefined) badge.points_required = points_required;
    if (photo_url) badge.photo_url = photo_url;

    await badge.save();
    res.json({ message: 'Badge mis à jour', badge });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

 
export const deleteBadge = async (req, res) => {
  try {
    const { id } = req.params;

    const badge = await Badge.findByPk(id);
    if (!badge) return res.status(404).json({ message: 'Badge non trouvé' });

    await badge.destroy();
    res.json({ message: 'Badge supprimé' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};
 