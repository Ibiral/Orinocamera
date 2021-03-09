const idProduct = window.location.search.slice(1);
dataManager.getProductFromDatabase(idProduct, afficheInformation);

/**
 * Afficher les caracrériqtues d'un produit
 *
 * @param   {Object} donnees            L'argument passé pour recevoir les données d'un produit
 * @param   {String} donnees.desciption la descrption du prodduit ex : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
 * @param   {String} donnees.imageUrl   l'adresse de l'image ex:"http://localhost:3000/images/vcam_5.jpg"
 * @param   {Array}  donnees.lenses     les différentes optiques en option ex : ["50mm 1.4", "35mm 1.8", "28-200mm 2.8/4.5"]
 * @param   {String} donnees.name       le nom du produit ex: "Katatone"
 * @param   {Number} donnees.price      le prix en centimes ex:59900
 * @param   {String} donnees._id        la référence du produit ex: "5be9c4c71c9d440000a730e9"
 * 
 * @return  {object}           Un objet contenant les caractéristuques d'un produit
 */
function afficheInformation(donnees) {
    console.log(donnees)
    let variantes = "";
    for (let i = 0, size = donnees.lenses.length; i < size; i++) {
        variantes += `<input type="radio" name= "lense" id="carte" value="lense">
        <label for="lense${i}">${donnees.lenses[i]}</label><br>`;
    }

    document.querySelector("#imageContainer").innerHTML = `<img src="${donnees.imageUrl}" class="photo" alt="Appareil photo ${donnees.name}">`;
    document.querySelector("#product-name").innerHTML = donnees.name;
    document.querySelector("#description").innerHTML = donnees.description;
    document.querySelector("#lentilles").innerHTML = variantes;
    document.querySelector("#selected-price").innerHTML = donnees.price / 100 + "€";
}
