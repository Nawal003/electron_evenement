export default class Evenement {
  root;
  main;
  api;
  imageApi;
  defaultImg;

  constructor() {
    this.root = document.getElementById("root");
    this.main = document.getElementById("main");
    this.api = window.electronApi.apiUrl;
    this.imageApi = window.electronApi.image;
    this.defaultImg = window.electronApi.default;
    this.deconnexion();
  }

  /**Récupération de tous les événements */
  async getEvenements() {
    const reponse = await fetch(`${this.api}/evenements`);
    const datas = await reponse.json();
    return datas;
  }

  /**Mettre l'image  */
  setImageEv(url) {
    const image = document.createElement("img");
    const urlImg = this.imageApi + url;
    image.src = urlImg;
    image.onerror = () => {
      image.src = this.defaultImg;
    };
    return image;
  }

  /**afficher les élements  */
  setDOMEvenement(evenement) {
    const imgDiv = document.createElement("div");
    const divInfos = document.createElement("div");

    divInfos.setAttribute("id", "divInfos");
    imgDiv.setAttribute("id", "imagesEvent");
    const article = document.createElement("article");
    article.setAttribute("id", "evenement");
    const titre = document.createElement("h3");
    titre.textContent = evenement.titre;
    const imgEv = this.setImageEv(evenement.image);
    const lieu = this.setParagraph(evenement.nomLieu);
    const organisateur = this.setParagraph(evenement.nomOrganisateur);

    const placesRestantes = this.setParagraph(evenement.placesRestantes);

    this.root.append(this.main);
    this.main.append(article);
    article.append(titre, imgDiv, divInfos);
    imgDiv.append(imgEv);
    divInfos.append(lieu, organisateur, placesRestantes);
  }
  setParagraph(para) {
    const p = document.createElement("p");
    p.textContent = para;
    return p;
  }
  deconnexion() {
    const logout = document.getElementById("logout");
    const getToken = localStorage.getItem("token");
    const getUser = localStorage.getItem("user");
    // const user = JSON.parse(getUser);
    if (getToken && getUser) {
      logout.addEventListener("click", async () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "./login.html";
      });
    }
  }
  inscription(inscrit) {
    const btnInscription = document.createElement("button");
    btnInscription.setAttribute("type", "submit");
    btnInscription.textContent = inscrit;
  }
}
