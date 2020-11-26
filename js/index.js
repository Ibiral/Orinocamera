dataManager.getDataFromDatabase(afficheProduits);

/**
 * affiche les prduits dans le main
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
    
    /*
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    imageUrl: "http://localhost:3000/images/vcam_1.jpg"
    lenses: (2) ["35mm 1.4", "50mm 1.6"]
    name: "Zurss 50S"
    price: 49900
    _id: "5be1ed3f1c9d44000030b061"
    */

    contenu += `
    <div class="image">
        <img src="${data.imageUrl}" alt="Appareil photo Katatone">
        <h2>${data.name}</h2>
        <h3 class="prix">${data.price / 100}€</h3>
        <a class="add-basket basket2">ajouter au panier</a>
        <a class="info" href="product.html?${data._id}">+ d'infos</a>
    </div>
    `;
  }

  document.querySelector(".container").innerHTML = contenu;
}

//<button class="info" onclick="clique('${data._id}')">+ d'infos</button> 

// function clique(productId) {
//   console.log(productId);
// }

// let liens = document.querySelectorAll('a.info');
// for (let i = 0; i < liens.length; i++) {
//   let lien = liens[i];
//   lien.addEventListener('click', function (e) {
//     console.log(e);
//   }) 
// }