//* Fonction qui recupere et affiche les données depuis l'API sur la page accueil
const displayHomeProduscts = () => {
  const url = "http://localhost:3000/api/products";
  const homeProduct = document.getElementById("items");

  fetch(url)
    .then((res) =>
      res.json().then((products) => {
        console.log(products);
        for (product of products) {
          homeProduct.innerHTML += `<a href="./product.html?id=${product._id}">
            <article>
                <img src="${product.imageUrl}" alt="${product.altTxt}">
                <h3 class="productName">${product.name}</h3>
                <p class="productDescription">${product.description}</p>
            </article>
        </a>`;
        }
      })
    )
    .catch((err) => console.log("Erreur : " + err));
};

displayHomeProduscts();
