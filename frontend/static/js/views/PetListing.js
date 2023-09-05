import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Pet Listing");
  }

  async getHtml() {
    //Créer une fonction pour aller chercher les données en lui passant l'adresse url.
    async function getData(url) {
      const response = await fetch(url);
      return response.json();
    }

    // Aller chercher les données et les mettre dans la variable data
    const animalsData = await getData("/static/js/views/animals.json");

    let start = `
    <div class="container mt-5">
        <div class="d-flex flex-column align-items-center justify-content-center">
            <h1>Pet Listing</h1>
            <h2 class="mt-3">Discover companionship and unconditional love in your new furry friend!</h2>
        </div>`;
    let end = `</div>`;

    let listAnimals = `<div class="row mt-5">`;

    for (let i in animalsData.animals) {
      const animal = animalsData.animals[i];
      // Pour que les images puissent fonctionner
      let photosHtml = "";
      if (animal.photos && animal.photos.length > 0) {
        const medPhotoUrl = animal.photos[0].medium;
        photosHtml = `<img src="${medPhotoUrl}" class="card-img-top" alt="${animal["name"]} picture">`;
      } else {
        photosHtml = `<img src="../../../static/assets/logo.svg" class="card-img-top" alt="PetFinder Logo">`;
      }

      listAnimals += `
      <div class="col-md-3">
        <div class="card mb-4">
            <div class="card-body d-flex flex-column">
                ${photosHtml}
                <h3 class="card-title">${animal["name"]}</h3>
                <p class="card-text"><span>Species: </span>${animal["species"]}
                </p>
                <p class="card-text"><span>Gender: </span class="font-weight-bold">${animal["gender"]}</p>
                <p class="card-text"><span>Status: </span>${animal["status"]}
                </p>
                <a href="/animal/${animal["id"]}
                " class="btn btn-dark mt-auto align-self-center" data-link>Voir les détails</a>
            </div>
        </div>
    </div>`;
    }
    listAnimals += `</div>`;

    return start + listAnimals + end;
  }
}

// return `
// <div class="container mt-5">
//     <div class="d-flex flex-column align-items-center justify-content-center">
//         <h1>Pet Listing</h1>
//         <h2 class="mt-3">Discover companionship and unconditional love in your new furry friend!</h2>
//     </div>
//     <div class="row mt-5">
//         <div class="col-md-3">
//             <div class="card mb-4">
//                 <img src="#" class="card-img-top" alt="Photo de l'animal">
//                 <div class="card-body">
//                     <h3 class="card-title">animal.name</h3>
//                     <p class="card-text"><span>Gender: </span class="font-weight-bold">animal.gender</p>
//                     <p class="card-text"><span>Breed: </span>animal.breed</p>
//                     <p class="card-text"><span>Characteristics: </span>animal.characteristics</p>
//                     <a href="/id=0" class="btn btn-dark">Voir les détails</a>
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>
//     `;
