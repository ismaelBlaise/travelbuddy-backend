import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { Travel } from './Travel.js';

export const TravelRoute = sequelize.define('travel_routes', {
  id_route: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_travel: { type: DataTypes.INTEGER, allowNull: false },
  latitude: { type: DataTypes.DECIMAL(12, 9), allowNull: false },
  longitude: { type: DataTypes.DECIMAL(12, 9), allowNull: false },
  step_order: { type: DataTypes.INTEGER, allowNull: false },
  description: DataTypes.TEXT,
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

TravelRoute.belongsTo(Travel, { foreignKey: 'id_travel' });
Travel.hasMany(TravelRoute, { foreignKey: 'id_travel' });
