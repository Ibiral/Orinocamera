//src = "http://localhost:3000/api/cameras/"
class DataManager {

  /**
   * source des données API (dans ce projet : "http://localhost:3000/api/cameras/")
   * @type {String}
   */
  source;

  /**
   * toutes les caractéristiques des produits fournis par l'API
   * @type {null|Object}
   */
  products = null;

  constructor(src) {
    this.source = src;
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
    callbackFunction(this.products);
  }

  /**
 * va chercher les données d'un produit sur une API puis appelle une fonction 
 *
 * @param   {String}    idProduct         l'ID du produit
 * @param   {Function}  callbackFunction  fonction a appeler quand les données seront récupérées
 *
 * @return  {void}                        appelle la fonction passée en argument (callbackFunction) en lui passant comme argument les données reçues
 */
  async getProductFromDatabase(idProduct, callbackFunction = null) {
    const response = await fetch(this.source + idProduct);
    console.log(`response status is ${response.status}`);
    const productInfo = await response.json();
    if (callbackFunction === null) return productInfo;
    callbackFunction(productInfo);
  }


  /**
   * enregistre le contenu du panier dans le localStorage
   * 
   * @param   {Array}  basket  le contenu du panier
   *
   * @return  {void}
   */
  setBasketContent(basket) {
    localStorage.setItem("basket", JSON.stringify(basket));
  }

  /**
   * retourne le contenu du panier stocké dans le localStorage
   *
   * @return  {Array}  un tableau représentant le contenu du panier
   */
  getBasketContent() {
    let basketContent = localStorage.getItem("basket");
    if (basketContent === null) {
      this.setBasketContent([]);
      return [];
    }
    return JSON.parse(basketContent);
  }

  /**
   * va chercher les données d'un produit
   * 
   * @param   {number} idProduct    l'ID du produit
   *
   * @return  {object}   les données d'un produit
   */

  async getProductInfo(idProduct) {
    if (this.products === null) {
      const data = await this.getProductFromDatabase(idProduct, null);
      console.log(data)
      return data;
    }

    for (let i = 0, size = this.products.length; i < size; i++) {
      if (this.products[i]._id === idProduct) return this.products[i];
    }
  }
  

    /**
   * Envoi des données utilisateur au serveur 
   *
   * @param   {Object}  data  les données à envoyer au serveur
   *
   * @return  {number}  un ID unique représentant les données validées par l'utilisateur est généré automatiquement comme réponse à la requête.
   */
  async sendDataToDatabase(data) {
    let response = await fetch(
      this.source+"order",
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    );
    response = await response.json();
    return response;
  }


  saveOrder(order){
    sessionStorage.setItem(order.orderId, JSON.stringify(order));
  }
  
  getOrder(orderId){
    const data = JSON.parse(sessionStorage.getItem(orderId));
    sessionStorage.removeItem(orderId);
    return data;
  }
}

