//******** Importation des classes ********

import Home from "./views/Home.js";
import PetListing from "./views/PetListing.js";
import PetInfos from "./views/PetInfos.js";

//******** Regex et paramètres liés au id ********
const pathToRegex = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = (match) => {
  const values = match.result.slice(1);
  // Keys = Isoler ce qu'on a qui suit les deux points (:id).
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  );

  // Quand on entre un (:id), un tableau {:id valeur} sera créé.
  return Object.fromEntries(
    keys.map((key, i) => {
      return [key, values[i]];
    })
  );
};

//******** Router ********

const router = async () => {
  const routes = [
    { path: "/", view: Home },
    { path: "/animals", view: PetListing },
    { path: "/animal/:id", view: PetInfos },
  ];

  // Match function

  const potentialMatches = routes.map((route) => {
    return {
      // Retour d'un tableau d'objets:
      route: route,
      // Vérifier le match (true or false)
      // isMatch: location.pathname === route.path,

      // La regex est pour une ou deux valeur après slash
      result: location.pathname.match(pathToRegex(route.path)),
    };
  });

  let match = potentialMatches.find(
    // Si le résultat de potentialMatch n'existe pas / est faux, on va retourner un null.
    (potentialMatch) => potentialMatch.result !== null
  );

  // S'il n'y a pas de match, il retournera la route 0 (index)
  if (!match) {
    match = {
      route: routes[0],
      result: [location.pathname],
    };
  }

  //Instanciation de l'objet de la vue & Récupération de la <div> APP
  const view = new match.route.view(getParams(match));
  // console.log(getParams(match));
  document.querySelector("#app").innerHTML = await view.getHtml();
};

//******** Récupération du pathname ********

const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

//******** Création de l'historique à l'aide de popstate ********

window.addEventListener("popstate", router);

//******** Retrait de l'action par défaut des éléments ayant comme attributs "data-link" (navigation) ********

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    //console.log(e)
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      //Changer l'URL plutôt que de refresh la page.
      navigateTo(e.target.href);
    }
  });
  router();
});
