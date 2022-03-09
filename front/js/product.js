//* recuperation de le requet contenant l'ID dans l'url
const urlId = window.location.search;

//* Extraction de l'ID
const id = urlId.slice(4);

//* Url de l'API de chaque produit
const newApiUrl = `http://localhost:3000/api/products/${id}`;

const img = document.querySelector(".item__img");
const productName = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const selectTag = document.getElementById("colors");
const quantity = document.getElementById("quantity");

//* Fonction qui affiche chaque produit et ses detailles
const displaProductDetail = () => {
  fetch(newApiUrl)
    .then((res) =>
      res.json().then((product) => {
        console.log(product);
        img.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
        productName.textContent = `${product.name}`;
        price.textContent = `${product.price}`;
        description.textContent = `${product.description}`;
        //* Affiche toute les couleurs dans la balise select
        for (color of product.colors) {
          selectTag.innerHTML += `<option value="${color}">${color}</option>`;
        }
        quantity.setAttribute("value", "1");
      })
    )
    .catch((err) => console.log("Erreur : " + err));
};

//* Fonction pour ajouter un produit au panier
const addToCart = () => {
  const btnAddCart = document.getElementById("addToCart");

  btnAddCart.addEventListener("click", () => {
    //* contenu du panier dans le localstorage
    let totalCart = JSON.parse(localStorage.getItem("article"));
    let cart = {
      id: id,
      quantity: Math.floor(quantity.value),
      color: selectTag.value,
    };

    //* si le pannier est vide
    if (totalCart == null) {
      totalCart = [];
      totalCart.push(cart);
      //* ajout du produit dans le localstorage(panier)
      localStorage.setItem("article", JSON.stringify(totalCart));
    }
    //* si il y a deja un ou plusieur produit dans le panier
    else if (totalCart != null) {
      for (let i = 0; i < totalCart.length; i++) {
        //* si le produit que l'on veut rajouter est deja dans le tableau
        if (totalCart[i].id == id && totalCart[i].color == selectTag.value) {
          return (
            (totalCart[i].quantity += cart.quantity),
            localStorage.setItem("article", JSON.stringify(totalCart)),
            (totalCart = JSON.parse(localStorage.getItem("article")))
          );
        }
      }
      for (let i = 0; i < totalCart.length; i++) {
        if (
          (totalCart[i].id == id && totalCart[i].color != selectTag.value) ||
          totalCart[i].id != id
        ) {
          return (
            totalCart.push(cart),
            localStorage.setItem("article", JSON.stringify(totalCart)),
            (totalCart = JSON.parse(localStorage.getItem("article")))
          );
        }
      }
    }
  });

  return (totalCart = JSON.parse(localStorage.getItem("article")));
};

displaProductDetail();
addToCart();
