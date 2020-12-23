class Basket {
    constructor() {
        this.content = dataManager.getBasketContent(); // Contient tous les produits
        this.qtyIndicator = document.querySelector("#basketQty");
        this.resumeInDOM = document.querySelector("#basketResume");
        this.showQuantity();
    }

    async showHideContent() {
        if (this.resumeInDOM.innerHTML === "") {
          this.resumeInDOM.innerHTML = await this.templateResume();
          return;
        }
        this.resumeInDOM.innerHTML = "";
      }

    showQuantity() {
        this.qtyIndicator.innerHTML = this.content.length; //Afficher le nombre d'elements dans le panier
    }
        async templateResume() {
          

    // Multiplication du même produit
          let text = "";
          let product; 
          for (const [key, value] of Object.entries(this.refactorisedContent)) {
            product = await dataManager.getProductInfo(key);
            console.log(product.imageUrl)
            text += `
                    <article>
                      <img src="${product.imageUrl}">
                      <h5>${product.name} X ${value.qte}</h5>
                      <span>${product.price / 100}€</span>
                    </article>
                  `;
          }
          return text + "<button onclick='window.location=\"basket.html\"'>Voir mon Panier</button>";
        }

      add(product) {
        this.content.push(product);
        this.showQuantity();
        dataManager.setBasketContent(this.content);
      }

      get refactorisedContent(){
        const newContent = {};

        for (let i = 0, size = this.content.length; i < size; i++) {
          if (newContent[this.content[i]] === undefined) {
            newContent[this.content[i]] = {
              qte: 1
            };
          } else {
            newContent[this.content[i]].qte++;
          }
        }

        return newContent;
      }
}