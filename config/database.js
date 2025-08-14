import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
 


export const sequelize = new Sequelize(
  process.env.DB_NAME,        
  process.env.DB_USER,      
  process.env.DB_PASSWORD,   
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false,          
    define: {
      freezeTableName: true,  
      timestamps: true       
    }
  }
);

 
export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion à PostgreSQL réussie !');
  } catch (error) {
    console.error('Impossible de se connecter à PostgreSQL :', error);
  }
};
