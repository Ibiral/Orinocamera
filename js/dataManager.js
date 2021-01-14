//src = "http://localhost:3000/api/cameras/"
class DataManager {
  constructor(src) {
    this.source = src;
    this.products = null;
  }

  /**
   * va chercher les données sur une API et les enregistrer puis appelle une fonction 
   *
   * @param   {Function}  callbackFunction  fonction a appeler quand les données seront récupérées
   *
   * @return  {void}                        appelle la fonction passée en argument (callbackFunction) en lui passant comme arguments les données reçues
   */
  async getDataFromDatabase(callbackFunction) {
    const response = await fetch(this.source);
    console.log(`response status is ${response.status}`);
    this.products = await response.json();
  callbackFunction(this.products); // this.products = tous les caractéristiques des produits fournis par l'API
  }

    /**
   * va chercher les données d'un produit sur une API puis appelle une fonction 
   *
   * @param   {String}    idProduct         l'id du produit
   * @param   {Function}  callbackFunction  fonction a appeler quand les données seront récupérées
   *
   * @return  {void}                        appelle la fonction passée en argument (callbackFunction) en lui passant comme arguments les données reçues
   */
  async getProductFromDatabase(idProduct, callbackFunction = null) {
    const response = await fetch(this.source +"/"+ idProduct);
    console.log(`response status is ${response.status}`);
    const productInfo = await response.json();
    if (callbackFunction === null) return productInfo;
    callbackFunction(productInfo);
  }


  /**
   * enregistre le contenu du panier dans le localstorage
   * 
   * @param   {Array}  basket  le contenu du panier
   *
   * @return  {void}
   */
  setBasketContent(basket) {
    localStorage.setItem("basket", JSON.stringify(basket));
  }

  /**
   * retourne le contenu du panier stocké dans le session storage
   *
   * @return  {Array}  le tableau représentant le contenu du panier
   */
  getBasketContent() {
    let basketContent = localStorage.getItem("basket");
    if (basketContent === null) {
      this.setBasketContent([]);
      return [];
    }
    return JSON.parse(basketContent);
 }
 async getProductInfo(idProduct) {
  if (this.products === null){
    const data =  await this.getProductFromDatabase(idProduct, null) ;
    console.log(data)
    return data;
  }


  for (let i = 0, size = this.products.length; i < size; i++) {
    if (this.products[i]._id === idProduct) return this.products[i];
  }
}
}