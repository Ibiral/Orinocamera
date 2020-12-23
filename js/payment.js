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
        <qty>${value.qte}</qty>
        <total>${data.price/ 100 * value.qte}€</total>
    </li>
    
    `;
    totalAmount += `Total à payer: ${data.price/ 100 * value.qte} €`;
}
document.querySelector("#cartContent").innerHTML = content;
console.log(content)
document.querySelector("#totalAmount").innerHTML = totalAmount;
}



function extractProductFromArray(allProducts, idProduct){
    for ( let i=0, size = allProducts.length; i<size; i++){
        if (allProducts[i]._id === idProduct) return allProducts[i]
    }
    
}

// ${data.name}

