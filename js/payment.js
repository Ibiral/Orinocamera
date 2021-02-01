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

// function checkInput(input, type){
//     console.log("checkInput",input);
//     if(!input.value) throw({
//       "field" : input.id,
//       "msg" : "veuillez renseigner le champs"
//     })
//     switch (type){
//       case "text" : 
//       if (input.value.length<=2) throw({"field": input.id, "msg":"mauvais format"})
//         return input.value;
//       case "email" : 
//         if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(input.value)) return input.value;
//         throw({"field": input.id, "msg":"mauvais format"});
//       default : 
//         break;
//     }
//   }

//   const contact = {};

//   document.forms["signIn"].addEventListener("submit", function (e) {
//     e.preventDefault();
//     e.stopPropagation();

//     let erreur;

//     let inputs = this;

//     // Traitement générique
//     for (let i = 0; i < inputs.length; i++) {
//       console.log(inputs[i]);
//       try{
//         switch(inputs[i].id){
//           case "famille" : 
//             contact.name = checkInput(inputs[i], "text");
//             updateMsg(inputs[i].id,"");
//             break;
//           case "email" : 
//             contact.email = checkInput(inputs[i], "email");
//             updateMsg(inputs[i].id,"");
//             break;
//           default : 
//             break;
//         }
//       }
//       catch (error){
//         alert("error");
//         updateMsg(error.field, error.msg);
//         console.error(error);
//       }
//     }
//   });

//  function updateMsg(elm, msg) {
//     document.getElementById(elm+"Msg").innerHTML = msg;
//   }

// ********Formulaire*******

let validation = document.getElementById('btnPayer');
// let famille = document.getElementById('famille');
// let familleMissing = document.getElementById('familleMsg');
// let familleValid = /^[a-zA-Z'éèêÏÎé][a-zéèêçiï]+([-'\s][a-zA-Z'éèêÏÎé][a-zéèêçiï]+)?/;


validation.addEventListener('click', formValid);

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
    "targetId": 'ville',
    "msgField": 'villeMsg',
    "expected": "text"
  },

  {
    "targetId": 'email',
    "msgField": 'emailMsg',
    "expected": "email"
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
    number: /^[0-9]{5}$/
  }
  // const mailValidation = {
  //   text: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  // }

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
    // if (mailValidation[toCheck[i].expected].test(fieldValue) === false) {
    //   domMsgField.textContent = "Format incorrect";
    //   domMsgField.style.color = "blue";
    //   domMsgField.style.fontWeight = "bold";
    //   return;
    // }
    domMsgField.textContent = "";
  }

}














// *** TEST***

// const mailValidation = {
//   text: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
// }

// let Email = document.getElementById('email');
// let emailMissing = document.getElementById('emailMsg');

// validation.addEventListener('click', testEmail);

// function testEmail() {
//   if (fieldValue === "") {
//     emailMissing.textContent = "Champ obligatoire"
//     emailMissing.style.color = "blue";
//     emailMissing.style.fontWeight = "bold";
//     return;
//   }
// }