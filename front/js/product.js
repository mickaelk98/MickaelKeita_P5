//* Fonction qui affiche chaque produit et ses detailles
const displaProductDetail = () => {
  const img = document.querySelector(".item__img");
  const productName = document.getElementById("title");
  const price = document.getElementById("price");
  const description = document.getElementById("description");
  const selectTag = document.getElementById("colors");
  const quantity = document.getElementById("quantity");

  //* recuperation de le requet contenant l'ID dans l'url
  const urlId = window.location.search;

  //* Extraction de l'ID
  const id = urlId.slice(4);

  //* Url de l'API de chaque produit
  const newApiUrl = `http://localhost:3000/api/products/${id}`;

  fetch(newApiUrl)
    .then((res) =>
      res.json().then((product) => {
        img.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
        productName.textContent = `${product.name}`;
        price.textContent = `${product.price}`;
        description.textContent = `${product.description}`;
        //* Affiche toute les couleurs dans la balise select
        for (color of product.colors) {
          selectTag.innerHTML += `<option value="${color}">${color}</option>`;
        }
      })
    )
    .catch((err) => console.log("Erreur : " + err));
  quantity.setAttribute("value", "1");
};

displaProductDetail();