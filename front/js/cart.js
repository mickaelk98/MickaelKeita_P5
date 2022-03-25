let allProducts = JSON.parse(localStorage.getItem("article"));
const adresse = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");
const form = document.querySelector(".cart__order__form");

//* fonction qui affiche les article de mon panier
const displayCart = () => {
  const cart = document.getElementById("cart__items");
  const totalArticle = document.getElementById("totalQuantity");
  const totalPrice = document.getElementById("totalPrice");
  let quantityCalcul = 0;
  let priceCalcul = 0;

  //* affiche chaque produit present dans le panier
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
      .catch((err) => console.log("Erreur : " + err));
  }
};

//* fonction qui supprime un article du panier
const removeProduct = () => {
  const clearBtn = document.getElementsByClassName("deleteItem");

  setTimeout(() => {
    for (let i = 0; i < clearBtn.length; i++) {
      //* ajoute un index a chaque boutton
      clearBtn[i].setAttribute("data-index", i);

      //* au clique sur un boutton supprimer
      clearBtn[i].addEventListener("click", (e) => {
        console.log(e);
        let btn = e.currentTarget;
        //* recupere l'index du boutton sur lequel on a cliqué
        btnIndex = btn.getAttribute("data-index");

        //* si il y a plus de 1 article dans le panier
        if (allProducts.length > 1) {
          allProducts.splice(btnIndex, 1);
          localStorage.setItem("article", JSON.stringify(allProducts));
          allProducts = JSON.parse(localStorage.getItem("article"));
          location.reload();
        } else {
          localStorage.clear();
          allProducts = JSON.parse(localStorage.getItem("article"));
          location.reload();
        }
      });
    }
  }, 500);
};

//* fonction qui change la quantite d'un produit
const changeQuantity = () => {
  const quantity = document.getElementsByClassName("itemQuantity");
  console.log(quantity);
  setTimeout(() => {
    for (let i = 0; i < quantity.length; i++) {
      quantity[i].addEventListener("change", (e) => {
        console.log(e.target.value);
        allProducts[i].quantity = parseInt(e.target.value);
        localStorage.setItem("article", JSON.stringify(allProducts));
        allProducts = JSON.parse(localStorage.getItem("article"));
      });
    }
  }, 500);
};

//********************************** Formulaire **********************************/
//* fonction de validation du prenom
const validFirstname = (inputFirstname) => {
  //* creation de la regexp pour le prenom
  let firstNameRegexp = new RegExp("^[a-zA-Z]+$", "g");
  //* si le prenom fait moin de 30 caractere
  if (inputFirstname.value.length > 30) {
    firstNameErrorMsg.textContent =
      "votre prenom doit faire moin de 30 caractere";
    return false;
  }
  //* si le prenom ne respect pas la regex
  else if (!firstNameRegexp.test(inputFirstname.value)) {
    firstNameErrorMsg.textContent = "votre prenom n'est pas conforme";
    return false;
  } else {
    firstNameErrorMsg.textContent = "";
    return true;
  }
};

//* fonction de validation du nom
const validLastName = (inputLastname) => {
  //* creation de la regexp pour le nom
  let lastNameRegexp = new RegExp("^[a-zA-Z]+$", "g");
  //* si le nom fait moin de 30 caractere
  if (inputLastname.value.length > 30) {
    lastNameErrorMsg.textContent = "votre nom doit faire moin de 30 caractere";
    return false;
  }
  //* si le nom ne respect pas la regex
  else if (!lastNameRegexp.test(inputLastname.value)) {
    lastNameErrorMsg.textContent = "votre nom n'est pas conforme";
    return false;
  } else {
    lastNameErrorMsg.textContent = "";
    return true;
  }
};
//* fonction de validation de l'adresse
const validAdresse = (inputAdresse) => {
  let adresseRegexp = new RegExp(
    "([0-9]*) ?([a-zA-Z,. ]*) ?([0-9]{5}) ?([a-zA-Z]*)",
    "g"
  );
  if (adresseRegexp.test(inputAdresse.value)) {
    addressErrorMsg.textContent = "";
    return true;
  } else {
    addressErrorMsg.textContent =
      "votre addrese ne correspond pas au farmat demande(ex: 3 rue victoire 75000 paris)";
    return false;
  }
};

//* fonction de validation de la ville
const validCity = (inputCity) => {
  let cityRegexp = new RegExp("^[a-zA-Z]+(?:[s-][a-zA-Z]+)*$", "g");
  if (cityRegexp.test(inputCity.value)) {
    cityErrorMsg.textContent = "";
    return true;
  } else {
    cityErrorMsg.textContent = "le format de la ville est incorrect";
    return false;
  }
};

//* fonction de validation de l'mail
const validEmail = (inputEmail) => {
  //* creation de la regexp pour l'email
  let emailRegexp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
    "g"
  );

  //* Test si le format d'email est correcte
  if (emailRegexp.test(inputEmail.value)) {
    emailErrorMsg.textContent = "Mail valid";
    return true;
  } else {
    emailErrorMsg.textContent = "Mail invalid";
    return false;
  }
};

//* fonction d'envoie de formulaire
const sendForm = () => {
  const form = document.querySelector(".cart__order__form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (
      ((((validFirstname == validLastName) == validAdresse) == validCity) ==
        validEmail) ==
      true
    ) {
      form.submit();
    } else {
      console.log("pb");
    }
  });
};

//* appelle des fonctions
displayCart();
removeProduct();
changeQuantity();

//* prenom
firstName.addEventListener("change", function () {
  console.log(validFirstname(this));
  validFirstname(this);
});

//* nom
lastName.addEventListener("change", function () {
  validLastName(this);
  console.log(validLastName(this));
});

//* adresse
adresse.addEventListener("change", function () {
  validAdresse(this);
  console.log(validAdresse(this));
});

//* ville
city.addEventListener("change", function () {
  validCity(this);
  console.log(validCity(this));
});

//* email
email.addEventListener("change", function () {
  validEmail(this);
  console.log(validEmail(this));
});

//* Ecoute de l'envoie du formulaire
form.addEventListener("submit", (e) => {
  e.preventDefault();
  //* creation de l'objet contact
  let contact = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: adresse.value,
    city: city.value,
    email: email.value,
  };
  console.log(contact);
  //* cration du tableau produit(contenant uniquement les id des produits)
  let products = [];
  for (let i = 0; i < allProducts.length; i++) {
    products.push(allProducts[i].id);
    console.log(products);
  }
  if (
    validFirstname(firstName) &&
    validLastName(lastName) &&
    validAdresse(adresse) &&
    validCity(city) &&
    validEmail(email)
  ) {
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ contact, products }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(data.orderId);
        //* redirection vres la page confirmation
        form.submit();
        window.location.href = `http://127.0.0.1:5500/front/html/confirmation.html?id=${data.orderId}`;
      })
      .catch((err) => console.log("Erreur : " + err));
  }
});
