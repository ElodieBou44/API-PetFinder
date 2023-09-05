//******** Importation des modules nécessaires ********

const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

// Création de l'instance de l'application Express
const app = express();

// Création de variables pour le port, la clé, le secret et le token
const { PORT } = require("./config.js");
const { API_KEY } = require("./config.js");
const { API_SECRET } = require("./config.js");
const { API_TOKEN } = require("./config.js");

// Définition du dossier à utiliser
app.use(
  "/static",
  express.static(path.resolve(__dirname, "frontend", "static"))
);

// Définition de la page par défaut
app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

// Vérification du roulement du serveur sur le port demandé
app.listen(PORT, () => {
  console.log("Server is running on PORT", PORT);
});

// ******** Gestion du fichier animal.json ********

// Démarrer le body-parser, le passer en json à partir d'une requête HTTP
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Récupération des données de l'API et envoi dans le fichier animals.json:

const url = "https://api.petfinder.com/v2/animals";

const headers = {
  Authorization:
    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJrR0o5ZmJVRUprSGxwUkw1Y2ZQcnpoSE52Qk5tRXhhM0RtdVBjSml0dXoxbjFjc1dMTSIsImp0aSI6IjNhNjQxMmNmZjhlYzg5OGQ2YTEwM2MxYjc3OGE4NTlhZDIwMmQ2M2RjNjZmNTAxOGY4OTliZjhiZDkxYTlkODU1YTYyN2JhYzY3MWUzNGE4IiwiaWF0IjoxNjkzNDg5NTYwLCJuYmYiOjE2OTM0ODk1NjAsImV4cCI6MTY5MzQ5MzE2MCwic3ViIjoiIiwic2NvcGVzIjpbXX0.KoLycD-S91IgJUJWgHGj1gh46hlKBpfQx7Q4nZKxFGX-rEkChSlE2e21KK29YOjl5iTWds6I3vu7hDr-NPdmO7JioR6Cx1C8GY8Usmg5gMI0y2Sl3Xx9sVV3wj6Kbd6JvRpa2ZTfvskVtrM-PWUBIUsDuhmw6khZB4z3TXE_vxshx8GnVP7Iyt0W7X8XXga5_LR_ZKrp-16WGFcfD1k-c2IRzGUI30AzvkxsxLnYLl9NwFO50g6F-aDr6BsUfDE7CZW3blEPyqklXezmtAmETpMJMk8ByGaTTzdi2ZBfgJx1UrsUvyAvsqdPfLURJb2e6RfZo71I0JnthySdvcvapw",
};

axios
  .get(url, { headers })
  .then((response) => {
    const data = response.data;

    // Conversion les données en format JSON
    const jsonData = JSON.stringify(data, null, 2);

    // Écriture des données dans le fichier animals.json et obtenir une confirmation de succès ou échec dans la console
    fs.writeFile(
      __dirname + "/frontend/static/js/views/animals.json",
      jsonData,
      (err) => {
        if (err) {
          console.error("Error writing to file:", err);
        } else {
          console.log("Data has been saved to animals.json");
        }
      }
    );
  })
  .catch((error) => {
    console.error("Error:", error);
  });
