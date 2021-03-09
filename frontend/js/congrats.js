//Afficher la page de remerciements et vider le contenu du panier
const orderUrl = window.location.search.slice(1);
const order = dataManager.getOrder(orderUrl);
cart.clear();

document.getElementById('order').innerHTML = orderUrl;
document.getElementById('prixTotal').innerText = `${order.total}€`;
document.getElementById('clientName').innerText = order.contact.firstName;