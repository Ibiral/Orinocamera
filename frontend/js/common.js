// On utilise le mot clef new pour instancier notre classe. Lorsqu’on crée une instance d’une classe, 
// un objet est automatiquement créé et cet objet hérite des propriétés et des méthodes de la classe.

const dataManager = new DataManager("http://localhost:3000/api/cameras/");
const cart = new Basket();

// const dataManager = new DataManager("https://orinocamera.herokuapp.com/api/cameras");