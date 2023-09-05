export default class {
  constructor(params) {
    this.params = params;
  }
  setTitle(title) {
    document.title = title;
  }
  // Contenu que l'on veut retourner à l'intérieur de la div - Le contenu principal
  async getHtml() {
    return "";
  }
}
