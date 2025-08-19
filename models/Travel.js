import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { User } from './User.js';

export const Travel = sequelize.define('travels', {
  id_travel: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING(100), allowNull: false },
  description: DataTypes.TEXT,
  destination: DataTypes.STRING(100),
  latitude: DataTypes.DECIMAL(12, 9),
  longitude: DataTypes.DECIMAL(12, 9),
  start_date: DataTypes.DATEONLY,
  end_date: DataTypes.DATEONLY,
  id_user: { type: DataTypes.INTEGER, allowNull: false },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

Travel.belongsTo(User, { foreignKey: 'id_user' });
User.hasMany(Travel, { foreignKey: 'id_user' });
