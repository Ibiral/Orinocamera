class Basket {
  constructor() {
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
   * @return {void}   modifie le DOM
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
   * @return {number}   le nombre total des éléments dans le panier
   */

  showQuantity() {
    this.qtyIndicator.innerHTML = this.content.length; 
  }
  
  /**
   * Le contenu du panier
   *
   * @function
   * 
   * @return  {void}  trois caractéristiques du produit dans le panier (image, nom et prix) + sa quantité.
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
 

  add(product) {
    if (product === undefined) product = window.location.search.slice(1);
    this.content.push(product);
    this.showQuantity();
    dataManager.setBasketContent(this.content);
  }

  get refactorisedContent() {
    const newContent = {};

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

  remove(id) {
    this.content.splice(this.content.indexOf(id), 1);
    this.showQuantity();
    dataManager.setBasketContent(this.content);
  }

  clear(){
    this.content = [];
    dataManager.setBasketContent(this.content);
    this.showQuantity();
  }
}