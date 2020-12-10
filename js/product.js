const idProduct = window.location.search.slice(1);
dataManager.getProductFromDatabase(idProduct,afficheInformation);



function afficheInformation(donnees){

    // description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    // imageUrl: "http://localhost:3000/images/vcam_5.jpg"
    // lenses: (3) ["50mm 1.4", "35mm 1.8", "28-200mm 2.8/4.5"]
    // name: "Katatone"
    // price: 59900
    // _id: "5be9c4c71c9d440000a730e9"

    let variantes = "";
    for (let i=0, size=donnees.lenses.length; i<size; i++){
        // variantes+= `<input type="radio" name= "lense${i}" id="carte${i}" value="lense${i}">
        variantes+= `<input type="radio" name= "lense" id="carte" value="lense">
        <label for="lense${i}">${donnees.lenses[i]}</label><br>`;
    }

document.querySelector("#imageContainer").innerHTML = `<img src="${donnees.imageUrl}" class="photo" alt="Appareil photo ${donnees.name}">`;
// document.querySelector("#imageContainer").innerHTML = donnnes.imageUrl;
document.querySelector("#product-name").innerHTML= donnees.name;
document.querySelector("#description").innerHTML= donnees.description;
document.querySelector("#lentilles").innerHTML = variantes;
document.querySelector("#selected-price").innerHTML= donnees.price /100 + "€";   
}

