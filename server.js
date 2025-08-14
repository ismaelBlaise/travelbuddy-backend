import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './config/database.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.log('Error: ' + err));

sequelize.sync({ alter: true })
  .then(() => console.log('Tables synchronized'));

app.get('/', (req, res) => res.send('Hello TravelBuddy with ES Modules!'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
