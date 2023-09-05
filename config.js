// Chargement des variables d'environnement depuis le fichier .env
const dotenv = require("dotenv");
dotenv.config();

// Importation des variables crées dans le fichier .env
module.exports = {
  PORT: process.env.PORT,
  API_KEY: process.env.API_KEY,
};
