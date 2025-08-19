import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { Travel } from './Travel.js';
import { TravelActivity } from './TravelActivity.js';

export const TravelPhoto = sequelize.define('travel_photos', {
  id_photo: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_travel: DataTypes.INTEGER,
  id_activity: DataTypes.INTEGER,
  url: { type: DataTypes.TEXT, allowNull: false },
  uploaded_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

TravelPhoto.belongsTo(Travel, { foreignKey: 'id_travel' });
Travel.hasMany(TravelPhoto, { foreignKey: 'id_travel' });

TravelPhoto.belongsTo(TravelActivity, { foreignKey: 'id_activity' });
TravelActivity.hasMany(TravelPhoto, { foreignKey: 'id_activity' });
