class Basket {
  constructor() { //initialisation des objets de la class
    this.content = dataManager.getBasketContent();
    this.qtyIndicator = document.querySelector("#basketQty");
    this.resumeInDOM = document.querySelector("#basketResume");
    this.showQuantity(); //Afficher le nombre de produits dans le panier
  }

  /**
   * Afficher ou cacher le contenu du panier
   * 
   * @function    
   * 
   * @return {void}   modifie le DOM en affichant ou en cachant le contenu du panier
   */

  async showHideContent() {
    if (this.resumeInDOM.innerHTML === "") {
      this.resumeInDOM.innerHTML = await this.templateResume();
      return;
    }
    this.resumeInDOM.innerHTML = "";
  }

  /**
   * Afficher le nombre d'éléments qui se trouvent dans le panier
   * 
   * @function    
   * 
   * @return {void}   Modifie le DOM et affiche le nombre total des éléments dans le panier
   */

  showQuantity() {
    this.qtyIndicator.innerHTML = this.content.length;
  }

  /**
   * Le contenu du panier
   *
   * @function
   * 
   * @return  {string}  trois caractéristiques du produit dans le panier (image, nom et prix) + sa quantité.
   */

  async templateResume() {
    let text = "";
    let product;
    for (const [key, value] of Object.entries(this.refactorisedContent)) {
      product = await dataManager.getProductInfo(key);
      console.log(product.imageUrl)
      text += `
                    <article>
                      <img src="${product.imageUrl}">
                      <h5>${product.name} X ${value.qte}</h5>
                      <span>${product.price / 100}€</span>
                    </article>
                  `;
    }
    return text + "<button onclick='window.location=\"basket.html\"'>Voir mon Panier</button>";
  }

  /**
   * Ajouter des produits au panier 
   * 
   * @param   {String}  product  l'ID du produit ajouté au panier
   *
   * @return  {void}  Mise à jour du nombre de produits dans le panier puis les afficher grâce à la fonction showQuantity() puis enregistrer le nouveau panier dans le localStorage grâce à la fonction setBasketContent()
   */

  add(product) {
    if (product === undefined) product = window.location.search.slice(1);
    this.content.push(product);
    this.showQuantity();
    dataManager.setBasketContent(this.content);
  }

  /**
   * Assemblage de produits identiques en un seul produit pour éviter la répétition
   *
   * @return  {Object}   L'ID et la quantité de chaque produit dans le panier ex: 5be1ed3f1c9d44000030b061: {qte: 4}
   */

  get refactorisedContent() {
    const newContent = {};
    console.log(newContent)
    for (let i = 0, size = this.content.length; i < size; i++) {
      if (newContent[this.content[i]] === undefined) {
        newContent[this.content[i]] = {
          qte: 1
        };
      } else {
        newContent[this.content[i]].qte++;
      }
    }
    return newContent;
  }

  /**
   * Suppression de produits du panier 
   * 
   * @param   {String}  product  l'ID du produit supprimé du panier
   *
   * @return  {void}  Mise à jour du nombre de produits dans le panier grâce à la fonction showQuantity() puis enregistrer le nouveau panier dans le localStorage grâce à la fonction setBasketContent()
   */

  remove(id) {
    this.content.splice(this.content.indexOf(id), 1);
    this.showQuantity();
    dataManager.setBasketContent(this.content);
  }

  /**
   * Vider le panier 
   * 
   * @return  {void}  Le panier est remis à zéro en vidant le localStorage grâce à la méthode clear() puis afficher la quantité 0 dans le panier grâce à la fonction showQuantity()  
   */

  clear() {
    this.content = [];
    dataManager.setBasketContent(this.content);
    this.showQuantity();
  }
}