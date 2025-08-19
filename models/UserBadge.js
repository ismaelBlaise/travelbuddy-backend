import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { User } from './User.js';
import { Badge } from './Badge.js';

export const UserBadge = sequelize.define('users_badges', {
  id_user: { type: DataTypes.INTEGER, primaryKey: true },
  id_badge: { type: DataTypes.INTEGER, primaryKey: true },
  earned_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

 
User.belongsToMany(Badge, { through: UserBadge, foreignKey: 'id_user', otherKey: 'id_badge' });
Badge.belongsToMany(User, { through: UserBadge, foreignKey: 'id_badge', otherKey: 'id_user' });
