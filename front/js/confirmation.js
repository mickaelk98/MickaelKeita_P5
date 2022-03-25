//* recuperation de l'url de la page confirmation
const urlId = window.location.search;

//* Extraction de l'ID de la commande
const id = urlId.slice(4);

//* affichage du numero de commande
orderId.textContent = id;