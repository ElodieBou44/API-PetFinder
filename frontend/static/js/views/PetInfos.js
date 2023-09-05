import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Pet Infos");
  }

  async getHtml() {
    const num = Number(this.params.id);
    console.log(num);

    async function getData(url) {
      const response = await fetch(url);
      return response.json();
    }

    // Aller trouver l'article qui correspond à l'id de num
    const data = await getData("/static/js/views/animals.json");
    const animal = data.animals.find((item) => item.id === num);

    // Pour que les images puissent fonctionner
    let photosHtml = "";
    if (animal.photos && animal.photos.length > 0) {
      const lgPhotoUrl = animal.photos[0].full;
      photosHtml = `<img src="${lgPhotoUrl}" class="img-fluid" alt="${animal["name"]} picture">`;
    } else {
      photosHtml = `<img src="../../../static/assets/logo.svg" class="img-fluid" alt="PetFinder Logo">`;
    }

    return `
    <div class="container mt-5">
    <div class="d-flex justify-content-center mb-5">
    <h1>Pet Details</h1>
    </div>
      <div class="row">
        <div class="col">
        ${photosHtml}
        </div>
        <div class="col">
          <h2 class="mb-3">
            Here are all the details you need to know about ${animal["name"]}! 
          </h2>
          <p><span class="dark">Status: </span>${animal["status"]}</p>
          <p><span class="dark">Species: </span>${animal["species"]}</p>
          <p><span class="dark">Gender: </span>${animal["gender"]}</p>
          <p><span class="dark">Breed: </span>${animal["breeds"]["primary"]}</p>
          <p><span class="dark">Main color: </span>${animal["colors"]["primary"]}</p>
          <p><span class="dark">Age: </span>${animal["age"]}</p>
          <p><span class="dark">Size: </span>${animal["size"]}</p>
          <p><span class="dark">City: </span>${animal["contact"]["address"]["city"]}</p>
        </div>
      </div>
    </div>
        `;
  }
}
