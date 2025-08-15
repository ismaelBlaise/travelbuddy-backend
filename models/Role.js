import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Role = sequelize.define('roles', {
  id_role: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true }
});


const setupRoles = async () => {
  const [userRole, created] = await Role.findOrCreate({
    where: { name: 'user' },
    defaults: { name: 'user' }
  });
  console.log(`Role user ${created ? 'créé' : 'existant'}`);
};

setupRoles();