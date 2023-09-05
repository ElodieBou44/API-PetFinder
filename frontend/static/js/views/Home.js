import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Home");
  }

  async getHtml() {
    return `
    <div class="container d-flex flex-column align-items-center mt-5">
    <h1>Welcome to Pet Finder</h1>
    <p class="text-center mt-3">
      Welcome to our website, your destination for animal adoption! Here, we
      connect loving individuals and families with adorable animals in need of
      forever homes. Our platform provides a seamless experience, allowing you
      to explore a variety of lovable pets, from playful puppies and
      affectionate kittens to friendly rabbits and more. Whether you're
      looking for a loyal companion or a new furry friend to brighten your
      days, you've come to the right place. Browse through our profiles, learn
      about each animal's personality, and find your perfect match. Join us in
      making a difference in the lives of these wonderful creatures by
      providing them with the loving homes they deserve.
    </p>
    <h2>
      <em class="mt-3"
        >Start your journey of companionship and care with us today!</em
      >
    </h2>
    <a href="/animals" class="btn btn-dark mt-3" data-link>See our listing</a>
    <img
      src="/static/assets/pet_and_owner.jpg"
      alt="Owner and her pets"
      class="mt-5 .home-image"
    />
  </div>
        `;
  }
}
