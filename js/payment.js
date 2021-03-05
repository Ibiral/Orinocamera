dataManager.getDataFromDatabase(showCart);
// const basketContent = dataManager.getBasketContent();
let totalAmount = 0;

/**
 * afficher sur la page de paiement les caracteristiques des produits ajoutés au panier.
 *
 * @param   {Array}  allProducts  [Un tableau contenant la liste de tous les produits]
 *
 * @return  {void}                 Affichage des caracteristiques des produits dans le body de la page de paiement
 */

function showCart(allProducts) {
  console.log(allProducts)
  let data;
  let content = "";
  totalAmount = 0;
  for (const [key, value] of Object.entries(cart.refactorisedContent)) {
    console.log(key, value)
    data = extractProductFromArray(allProducts, key);
    content += `
        <li>
        <div class="name">${data.name}</div>
        <div class="price">${data.price / 100}€</div>
        <div class="qty"><button class="btnMinus" onclick="remove('${key}')">- </button> ${value.qte} <button class="btnPlus"  onclick="add('${key}')">+ </button></div>
        <div class="total">${data.price / 100 * value.qte}€</div>
    </li>
    `;
    totalAmount += data.price / 100 * value.qte;
  }
  document.querySelector("#cartContent").innerHTML = content;
  document.querySelector("#totalAmount").innerHTML = `Total à payer: ${totalAmount}€`;
}

/**
 * Extraire un produit du tableau contenant tous les produits 
 *
 * @param   {Array}   allProducts         [Un tableau contenant la liste de tous les produits]
 * @param   {String}  idProduct           L'ID du produit
 *
 * @return  {Object}                      les propriétés (price, qte, name) du produit et affichage des informations liées à chaque produit dans le panier.
 */

function extractProductFromArray(allProducts, idProduct) {
  for (let i = 0, size = allProducts.length; i < size; i++) {
    if (allProducts[i]._id === idProduct)
      return allProducts[i];
  }
}

/**
   * Augmenter le nombre de produits dans le panier
   * 
   * @param   {String}  product  l'ID du produit
   *
   * @return  {void}  la quantité d'un produit s'incrémente de +1 à chaque clic sur "+" et mise à jour du nombre de produits dans le panier.
   */

function add(id) {
  cart.add(id);
  showCart(dataManager.products);
}

/**
   * Réduire le nombre de produits dans le panier
   * 
   * @param   {String}  product  l'ID du produit
   *
   * @return  {void}  la quantité d'un produit diminue de -1 à chaque clic sur "-" et mise à jour du nombre de produits dans le panier.
   */

function remove(id) {
  cart.remove(id);
  showCart(dataManager.products);
}

// ********Formulaire*******

let validation = document.getElementById('btnPayer');

validation.addEventListener('click', formValid);

const toCheck = [
  {
    "targetId": 'famille',
    "msgField": 'familleMsg',
    "expected": "text"
  },
  {
    "targetId": 'prenom',
    "msgField": 'prenomMsg',
    "expected": "text"
  },

  {
    "targetId": 'email',
    "msgField": 'emailMsg',
    "expected": "email"
  },

  {
    "targetId": 'adresse',
    "msgField": 'adresseMsg',
    "expected": "address"
  },

  {
    "targetId": 'ville',
    "msgField": 'villeMsg',
    "expected": "text"
  },

  {
    "targetId": 'codePostal',
    "msgField": 'codePostalMsg',
    "expected": "number"
  }

]

/**
   * Validation du formulaire et envoi des informations au serveur
   * 
   * @param   {Event}  e  paramètre passé à AddEventListener
   *
   * @return  {Number}    L'ID de la commande généré automatiquement et ouverture de la page de remerciément.
   */

async function formValid(e) {
  e.preventDefault();

  if (totalAmount === 0) {
    return alert("Commande impossible: Votre panier est vide.");
  } 

  let domMsgField;
  let fieldValue;
  //*********Validation de 'expected'***********
  const validations = {
    text: /^[a-zA-Z'éèêÏÎé][a-zéèêçiï]+([-'\s][a-zA-Z'éèêÏÎé][a-zéèêçiï]+)?/,
    email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    address: /^[a-zA-Z0-9\s,'-]+[a-zA-Z'éèêÏÎé][a-zéèêçiï]*$/,
    number: /^((0[1-9])|([1-8][0-9])|(9[0-8])|(2A)|(2B))[0-9]{3}$/
  }

  for (let i = 0, size = toCheck.length; i < size; i++) {
    fieldValue = document.getElementById(toCheck[i].targetId).value; //La valeur entrée par l'utilisateur
    domMsgField = document.getElementById(toCheck[i].msgField); //Message à afficher en cas d'erreur
    if (fieldValue === "") {
      domMsgField.textContent = "Champ obligatoire"
      domMsgField.style.color = "red";
      domMsgField.style.fontWeight = "bold";
      return;
    }
    if (validations[toCheck[i].expected].test(fieldValue) === false) {
      domMsgField.textContent = "Format incorrect";
      domMsgField.style.color = "orange";
      domMsgField.style.fontWeight = "bold";
      return;
    }
    // il faut corriger l'imput précédent avant de renseigner le champ suivant
    domMsgField.textContent = "";
  }

  // ********Envoi des informations au serveur*******

  const contact = {
    firstName: document.getElementById("prenom").value,
    lastName: document.getElementById("famille").value,
    address: document.getElementById("adresse").value,
    city: document.getElementById("ville").value,
    email: document.getElementById("email").value
  };
  const result = await dataManager.sendDataToDatabase({
    contact: contact, //Les données renseignées dans le formulaire de paiment
    products: cart.content //les produits selectionnés dans le panier
  });

  dataManager.saveOrder({ ...result, "total": totalAmount }); //Sauvegarder le contact et les produits + le prix total dans le localStorage

  if (confirm("Vous êtes sur le point de valider votre commande d'un total de " + totalAmount + "€. Appuyez sur OK pour finaliser.") ) {
    window.location = "./congrats.html?" + result.orderId;
  }
}