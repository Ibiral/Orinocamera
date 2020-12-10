class DataManager {
  constructor(src) {
    this.source = src;
    this.products = null;
  }

  /**
   * var chercher les données sur une API et les enregistrer puis appelle une fonction 
   *
   * @param   {Function}  callbackFunction  fonction a appeler quand les données seront récupérées
   *
   * @return  {void}                        appelle la fonction passée en argument (callbackFunction) en lui passant comme arguments les données reçues
   */
  async getDataFromDatabase(callbackFunction) {
    const response = await fetch(this.source);
    console.log(`response status is ${response.status}`);
    this.products = await response.json();
    callbackFunction(this.products);
  }

    /**
   * var chercher les données d'un produit sur une API puis appelle une fonction 
   *
   * @param   {String}    idProduct         l'id du produit
   * @param   {Function}  callbackFunction  fonction a appeler quand les données seront récupérées
   *
   * @return  {void}                        appelle la fonction passée en argument (callbackFunction) en lui passant comme arguments les données reçues
   */
  async getProductFromDatabase(idProduct,callbackFunction) {
    const response = await fetch(this.source+"/"+idProduct);
    console.log(`response status is ${response.status}`);
    const productInfo = await response.json();
    callbackFunction(productInfo);
  }

/*
  getBasketContent(){
    //récupère le panier stocké dans le local storage
  }

 */

  /**
   * enregistre le contenu du panier dans le localstorage
   * 
   * @param   {Array}  basket  le contenu du panier
   *
   * @return  {void}
   */
  setBasketContent(basket){
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
 getProductInfo(idProduct){
  for(let i=0, size = this.products.length; i<size; i++){
   if(this.products[i]._id === idProduct) return this.products[i];
  }
}
}