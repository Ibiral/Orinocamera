class Basket{
    constructor(){
        // this.content  = dataManager.getBasketContent();
        this.content = [1,2,3,5];
        this.qtyIndicator = document.querySelector("#basketQty");
        this.showQuantity();

    }

    showHideBasketContent(){

    }


    showQuantity(){
        this.qtyIndicator.innerHTML = this.content.length;
    }
}