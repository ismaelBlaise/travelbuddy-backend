import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { Role } from './Role.js';

export const User = sequelize.define('User', {
  id_user: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  bio: DataTypes.TEXT,
  points: { type: DataTypes.INTEGER, defaultValue: 0 },
  photo_url: DataTypes.TEXT
});

User.belongsTo(Role, { foreignKey: 'id_role' });
Role.hasMany(User, { foreignKey: 'id_role' });
