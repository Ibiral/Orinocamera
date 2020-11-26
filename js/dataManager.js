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
    // this.products[productInfo._id]
    callbackFunction(productInfo);
  }
}