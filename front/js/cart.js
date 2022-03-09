const cart = document.getElementById("cart__items");
const allProducts = JSON.parse(localStorage.getItem("article"));
const clearBtn = document.getElementsByClassName("deleteItem");
const totalArticle = document.getElementById("totalQuantity");
const totalPrice = document.getElementById("totalPrice");

let quantityCalcul = 0;
let priceCalcul = 0;

for (let i = 0; i < allProducts.length; i++) {
  fetch(`http://localhost:3000/api/products/${allProducts[i].id}`)
    .then((res) =>
      res.json().then((product) => {
        cart.innerHTML += `
            <article class="cart__item" data-id="${allProducts[i].id}" data-color="${allProducts[i].color}">
                <div class="cart__item__img">
                <img src="${product.imageUrl}" alt="${product.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${product.name}</h2>
                    <p>${allProducts[i].color}</p>
                    <p>${product.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${allProducts[i].quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
            </article>
      `;
        quantityCalcul += allProducts[i].quantity;
        priceCalcul += allProducts[i].quantity * product.price;
        //* total article et prix
        totalArticle.textContent = `${quantityCalcul}`;
        totalPrice.textContent = `${priceCalcul}`;
      })
    )
    .catch((err) => console.log("Erreu : " + err));
}
