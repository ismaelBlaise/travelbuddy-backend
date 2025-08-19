import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { Travel } from './Travel.js';

export const TravelActivity = sequelize.define('travel_activities', {
  id_activity: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_travel: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING(100), allowNull: false },
  description: DataTypes.TEXT,
  location: DataTypes.STRING(100),
  latitude: DataTypes.DECIMAL(12, 9),
  longitude: DataTypes.DECIMAL(12, 9),
  activity_date: DataTypes.DATEONLY,
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

TravelActivity.belongsTo(Travel, { foreignKey: 'id_travel' });
Travel.hasMany(TravelActivity, { foreignKey: 'id_travel' });
