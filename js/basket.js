class Basket{
    constructor(){
        this.content  = dataManager.getBasketContent();
        this.qtyIndicator = document.querySelector("#basketQty");
        this.resumeInDOM = document.querySelector("#basketResume");
        this.showQuantity();
    }

    showHideContent(){
        if (this.resumeInDOM.innerHTML === "") {
          this.resumeInDOM.innerHTML = this.templateResume();
          return;
        }
        this.resumeInDOM.innerHTML = "";
      }

    showQuantity(){
        this.qtyIndicator.innerHTML = this.content.length;
    }
        templateResume(){
          let text = "";
          let product;
          for(let i=0, size = this.content.length; i< size; i++){
            console.log(this.content[i]);
            product = dataManager.getProductInfo(this.content[i]);
            text +=`
              <article>
                <img src="${product.imageUrl}">
                <h5>${product.name}</h5>
                <span>${product.price/100}€</span>
              </article>
            `;
          }
          return text + "<button href='../basket.html'>Voir mon Panier</button>";
      }
  
      add(product){
        this.content.push(product);
        this.showQuantity();
        dataManager.setBasketContent(this.content);
      }
}