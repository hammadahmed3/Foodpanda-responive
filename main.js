const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

function Signupgoto() {
  container.classList.add("sign-up-mode");
}
function Signingoto() {
  container.classList.remove("sign-up-mode");
}

function Signup() {
  var us = document.getElementById("user");
  var email = document.getElementById("sign-email");
  var password = document.getElementById("sign-password");
  var us = document.getElementById("user");
  localStorage.setItem("email", email.value);
  localStorage.setItem("password", password.value);
  localStorage.setItem("username", JSON.stringify(us.value));

  email.value = "";
  password.value = "";
  us.value = "";

  container.classList.remove("sign-up-mode");
}

function AdminsignIn(event) {
  event.preventDefault();

  var email = document.getElementById("email");
  var password = document.getElementById("password");

  if (
    localStorage.getItem("email") === email.value &&
    localStorage.getItem("password") === password.value
  ) {
    alert("Login Successfully");
    location.href = "./productadding.html";
    console.log("location");
  } else {
    alert("You Must Signup First");
    container.classList.add("sign-up-mode");
  }
}

function signIn(event) {
  event.preventDefault();

  var email = document.getElementById("email");
  var password = document.getElementById("password");

  if (
    localStorage.getItem("email") === email.value &&
    localStorage.getItem("password") === password.value
  ) {
    alert("Login Successfully");
    location.href = "./foodpanda.html";
    console.log("location");
  } else {
    alert("You Must Signup First");
    container.classList.add("sign-up-mode");
  }
}
// localStorage.clear()

const productList = document.getElementById("product-list");

let products = JSON.parse(localStorage.getItem("products")) || [];

function addproduct() {
  const productIdInput = document.getElementById("product-Id");
  const productNameInput = document.getElementById("product-name");
  const productDescriptionInput = document.getElementById(
    "product-description"
  );
  const productPriceInput = document.getElementById("product-price");
  const productImageInput = document.getElementById("product-image");

  const productId = productIdInput.value;
  const productName = productNameInput.value;
  const productDescription = productDescriptionInput.value;
  const productPrice = productPriceInput.value;
  const productImage = productImageInput.files[0];

  const product = {
    id: productId,
    name: productName,
    description: productDescription,
    price: productPrice,
    image: URL.createObjectURL(productImage),
  };

  products.push(product);
  localStorage.setItem("products", JSON.stringify(products));

  productIdInput.value = "";
  productNameInput.value = "";
  productDescriptionInput.value = "";
  productPriceInput.value = "";
  productImageInput.value = "";
  alert("Product Added Sucessfully");
}

products.forEach((product) => {
  const productElement = document.createElement("div");
  productElement.classList.add("product");

  const imageElement = document.createElement("img");
  imageElement.src = product.image;
  imageElement.alt = product.name;
  productElement.appendChild(imageElement);

  const nameElement = document.createElement("h2");
  nameElement.textContent = "Item Name: " + product.name;
  productElement.appendChild(nameElement);

  const idElement = document.createElement("p");
  idElement.textContent = "Item  ID:" + product.id;
  productElement.appendChild(idElement);

  const descriptionElement = document.createElement("p");
  descriptionElement.textContent = "Item Description: " + product.description;
  productElement.appendChild(descriptionElement);

  const priceElement = document.createElement("p");
  priceElement.textContent = `Item Price: ${product.price}$`;
  productElement.appendChild(priceElement);

  productList.appendChild(productElement);

  const addToCartButton = document.createElement("button");
  addToCartButton.className="addcart"
  addToCartButton.textContent = "Add to Cart";
  addToCartButton.style.height = "10vh";
  addToCartButton.style.width = "10vW";
  addToCartButton.style.marginBottom = "2%";

  addToCartButton.addEventListener("click", () => {
    addToCart(product);
  });

  productElement.appendChild(addToCartButton);

  const deleteButton = document.createElement("button");
  deleteButton.className="del"
  deleteButton.textContent = "delete from cart";
  deleteButton.style.marginTop = "2%";
  deleteButton.style.marginBottom = "3%";
  deleteButton.style.height = "10vh";
  deleteButton.style.width = "10vw";
  deleteButton.addEventListener("click", () => {
    deleteProduct(product);
  });
  productElement.appendChild(deleteButton);
});

function addToCart(product) {
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  cartItemsList.innerHTML = "";
  let total = 0;
  cart.forEach((product) => {
    const cartItem = document.createElement("li");
    cartItem.innerHTML = `${product.name} - $${product.price}`;
    cartItemsList.appendChild(cartItem);
    total += parseFloat(product.price);
  });
  cartTotal.textContent = `$${total.toFixed(2)}`;
}

function deleteProduct() {
  localStorage.clear("name", "description", "price", "image");
}

const cartItemsList = document.getElementById("cart-items-list");
const cartTotal = document.getElementById("cart-total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  cartItemsList.innerHTML = "";
  let total = 0;
  cart.forEach((product) => {
    const cartItem = document.createElement("li");
    const imageElement = document.createElement("img");
    imageElement.style.width = "100%";
    imageElement.src = product.image;
    imageElement.alt = product.name;
    cartItem.appendChild(imageElement);

    const productDetails = document.createElement("div");
    productDetails.innerHTML = `
      <h3>${product.name}</h3>
      <p>ID: ${product.id}</p>
      <p>Description: ${product.description}</p>
      <p>Price: ${product.price} PKR</p>
    `;
    cartItem.appendChild(productDetails);

    const deleteproButton = document.createElement("button");
    deleteproButton.textContent = "Delete";

    deleteproButton.style.marginBottom = "3%";
    deleteproButton.style.height = "10vh";
    deleteproButton.style.width = "10vw";

    deleteproButton.addEventListener("click", () => {
      deleteCartProduct(product);
    });
    productDetails.appendChild(deleteproButton);

    cartItemsList.appendChild(cartItem);
    cartItem.className = "cartpro";
    cartItemsList.className = "cartflex";

    total += parseFloat(product.price);
  });

  cartTotal.textContent = `Total Bill: ${total.toFixed(2)} PKR`;
}
renderCart();

function clearCart() {
  localStorage.removeItem("cart");
  cart = [];
  renderCart();
}

function deleteCartProduct(product) {
  const index = cart.indexOf(product);
  if (index !== -1) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
}

function deleteProduct(product) {
  const index = products.indexOf(product);
  if (index !== -1) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.removeItem(index);
    renderProducts();
  }
}

var a = JSON.parse(localStorage.getItem("username"));
document.getElementById("resturentname").innerHTML += a + " Menu:";

// localStorage.clear()