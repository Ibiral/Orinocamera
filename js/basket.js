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
        return "coucou";
      }
  
      add(product){
        this.content.push(product);
        this.showQuantity();
        dataManager.setBasketContent(this.content);
      }

}