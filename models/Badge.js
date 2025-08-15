import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Badge = sequelize.define('badges', {
  id_badge: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  description: DataTypes.TEXT,
  points_required: { type: DataTypes.INTEGER, defaultValue: 0 },
  photo_url: DataTypes.TEXT,
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  timestamps: false
});
