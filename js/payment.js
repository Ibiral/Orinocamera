dataManager.getDataFromDatabase(showCart);

function showCart(allProducts){
    console.log("---",allProducts)
    let data;
    let content ="";
    let totalAmount = 0;
for (const [key, value] of Object.entries(cart.refactorisedContent)){
    console.log(key, value )
    data = extractProductFromArray(allProducts, key);
    content +=`
        <li>
        <name>${data.name}</name>
        <price>${data.price/ 100}€</price>
        <qty><button class="btnMinus" onclick="remove('${key}')">- </button> ${value.qte} <button class="btnPlus"  onclick="add('${key}')">+ </button></qty>
        <total>${data.price/ 100 * value.qte}€</total>
    </li>
    
    `;
    totalAmount += data.price/ 100 * value.qte;
}

document.querySelector("#cartContent").innerHTML = content;
console.log(content)
document.querySelector("#totalAmount").innerHTML = `Total à payer: ${totalAmount}€`;
}

function extractProductFromArray(allProducts, idProduct){
    for ( let i=0, size = allProducts.length; i<size; i++){
        if (allProducts[i]._id === idProduct) return allProducts[i]
    } 
}

function add(id){
    cart.add(id);
    showCart(dataManager.products);
}

function remove(id){
    cart.remove(id);
    showCart(dataManager.products);
}


document.forms["signIn"].addEventListener("submit", function(e) {
 
	var erreur;
 
	var inputs = this;
 
	// Traitement générique
	for (var i = 0; i < inputs.length; i++) {
		console.log(inputs[i]);
		if (!inputs[i].value) {
			erreur = "Veuillez renseigner tous les champs";
			break;
		}
    }
    
    if (erreur) {
		e.preventDefault();
		document.getElementById("erreur").innerHTML = erreur;
		return false;
	} else {
		alert('Formulaire envoyé !');
	}
	
});