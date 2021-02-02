dataManager.getDataFromDatabase(showCart);

function showCart(allProducts) {
  console.log("---", allProducts)
  let data;
  let content = "";
  let totalAmount = 0;
  for (const [key, value] of Object.entries(cart.refactorisedContent)) {
    console.log(key, value)
    data = extractProductFromArray(allProducts, key);
    content += `
        <li>
        <name>${data.name}</name>
        <price>${data.price / 100}€</price>
        <qty><button class="btnMinus" onclick="remove('${key}')">- </button> ${value.qte} <button class="btnPlus"  onclick="add('${key}')">+ </button></qty>
        <total>${data.price / 100 * value.qte}€</total>
    </li>
    
    `;
    totalAmount += data.price / 100 * value.qte;
  }

  document.querySelector("#cartContent").innerHTML = content;
  console.log(content)
  document.querySelector("#totalAmount").innerHTML = `Total à payer: ${totalAmount}€`;
}

function extractProductFromArray(allProducts, idProduct) {
  for (let i = 0, size = allProducts.length; i < size; i++) {
    if (allProducts[i]._id === idProduct) return allProducts[i]
  }
}

function add(id) {
  cart.add(id);
  showCart(dataManager.products);
}

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

function formValid(e) {
  e.preventDefault();
  let domMsgField;
  let fieldValue;
  const validations = {
    text: /^[a-zA-Z'éèêÏÎé][a-zéèêçiï]+([-'\s][a-zA-Z'éèêÏÎé][a-zéèêçiï]+)?/,
    email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    address: /^[a-zA-Z0-9\s,'-]+[a-zA-Z'éèêÏÎé][a-zéèêçiï]*$/, 
    number: /^((0[1-9])|([1-8][0-9])|(9[0-8])|(2A)|(2B))[0-9]{3}$/
  }

  for (let i = 0, size = toCheck.length; i < size; i++) {
    fieldValue = document.getElementById(toCheck[i].targetId).value;
    domMsgField = document.getElementById(toCheck[i].msgField);
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
    domMsgField.textContent = "";
  }
}











// let validation = document.getElementById('btnPayer');
// let famille = document.getElementById('famille');
// let familleMissing = document.getElementById('familleMsg');
// let familleValid = /^[a-zA-Z'éèêÏÎé][a-zéèêçiï]+([-'\s][a-zA-Z'éèêÏÎé][a-zéèêçiï]+)?/;

// function formValid(e) {
//   if(famille.validity.valueMissing) {
//     e.preventDefault();
//     familleMissing.textContent = 'Champ obligatoire'
//     familleMissing.style.color = "red";
//     familleMissing.style.fontWeight = "bold";
//   } else if(familleValid.test(famille.value) === false) {
//     e.preventDefault();
//     familleMissing.textContent = 'Format incorrect';
//     familleMissing.style.color = 'orange';
//     familleMissing.style.fontWeight = "bold";
//   } else{

//   }
// }
