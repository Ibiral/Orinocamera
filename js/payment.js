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

// ********Formulaire*******

function checkInput(input, type){
    console.log("checkInput",input);
    if(!input.value) throw({
      "field" : input.id,
      "msg" : "veuillez renseigner le champs"
    })
    switch (type){
      case "text" : 
        return input.value;
      case "email" : 
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(input.value)) return input.value;
        throw({"field": input.id, "msg":"mauvais format"});
      default : 
        break;
    }
  }
  
  const contact = {};
  
  document.forms["signIn"].addEventListener("submit", function (e) {
    e.preventDefault();
    e.stopPropagation();
  
    var erreur;
  
    var inputs = this;
  
    // Traitement générique
    for (var i = 0; i < inputs.length; i++) {
      console.log(inputs[i]);
      try{
        switch(inputs[i].id){
          case "famille" : 
            contact.name = checkInput(inputs[i], "text");
            updateMsg(inputs[i].id,"");
            break;
          case "email" : 
            contact.email = checkInput(inputs[i], "email");
            updateMsg(inputs[i].id,"");
            break;
          default : 
            break;
        }
      }
      catch (error){
        alert("error");
        updateMsg(error.field, error.msg);
        console.log(error);
      }
    }
  });
  
  updateMsg(elm, msg) =
    document.getElementById(elm+"Msg").innerHTML = msg;
  