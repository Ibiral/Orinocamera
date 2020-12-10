dataManager.getDataFromDatabase(afficheProduits);
const cart = new Basket();

/**
 * affiche les produits dans le .container
 *
 * @param   {Array}  listeDesProduits  [listeDesProduits description]
 *
 * @return  {void}                    [return description]
 */
function afficheProduits(listeDesProduits) {
  let contenu = "";
  let data;
  for (let i = 0, size = listeDesProduits.length; i < size; i++) {
    data = listeDesProduits[i];
    contenu += `
    <div class="image">
        <img src="${data.imageUrl}" alt="Appareil photo ${data.name}">
        <h2>${data.name}</h2>
        <h3 class="prix">${data.price / 100}€</h3>
        <a class="add-basket basket2" onclick="cart.add('${data._id}')">ajouter au panier</a>
        <a class="info" href="product.html?${data._id}">+ d'infos</a>
    </div>
    `;
  }

  document.querySelector(".container").innerHTML = contenu;
}

