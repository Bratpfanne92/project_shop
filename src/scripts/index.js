// Warten bis Dokument geladen ist
document.addEventListener("DOMContentLoaded", function () {
  // Überprüfen, username  in der session strorage gespeichert ist
  let enteredUserName = sessionStorage.getItem("userName");

  // Wenn username noch nicht gespeichert ist, frage danach
  if (!enteredUserName) {
    // username abfragen
    enteredUserName = prompt("Bitte geben Sie Ihren Namen ein");

    // Überprüfen, ob ein username eingegeben wurde
    if (enteredUserName !== null && enteredUserName.trim() !== "") {
      // username in der Session Storage speichern wenn gültig
      sessionStorage.setItem("userName", enteredUserName);
    } else {
      enteredUserName = "Darth Niemand";
    }
  }

  // Das html element id="user" auswählen
  let userName = document.getElementById("user");

  // Den Benutzernamen im HTML-Element setzen
  userName.innerHTML = enteredUserName;
});
//navbar toggle
const swMenu = document.querySelector(".sw-menu");
const navMenu = document.querySelector(".nav-menu");

swMenu.addEventListener("click", () => {
  navMenu.classList.toggle("hide");
});

//cart toggle
let cartMenü = document.querySelector(".cart-menü");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector(".cart-x");
// cartMenü open
cartMenü.onclick = () => {
  cart.classList.add("active");
};
// cartMenü close X
closeCart.onclick = () => {
  cart.classList.remove("active");
};

//cart working js-if document loaded dann ready() function sofort ausführen, sonst warten bis document geladen ist. Das ist wichtig, weil sonst die Funktionen nicht ausgeführt werden können, da die Elemente noch nicht geladen sind oder die Elemente noch nicht hinzugefügt wurden.zB.: Cart Elemente
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

//ready function

function ready() {
  //remove button-.cart remove-trash icon
  let removeCartItemButtons = document.getElementsByClassName("cart-remove");
  // console.log(removeCartItemButtons);
  // for loop für trash button bei JEDE cart item
  for (let i = 0; i < removeCartItemButtons.length; i++) {
    let button = removeCartItemButtons[i];
    button.addEventListener("click", removeCartItem); //onclick removeCartItem function
  }
  //quantity input
  let quantityInputs = document.getElementsByClassName("cart-quantity");
  for (let i = 0; i < quantityInputs.length; i++) {
    let quantityInput = quantityInputs[i];
    quantityInput.addEventListener("change", quantityChanged); // quantityChanged function wird ausgeführt wenn quantity input geändert wird
  }
  //add to cart button
  let addToCartButtons = document.getElementsByClassName("add-cart");
  // for loop für add to cart button bei JEDE product
  for (let i = 0; i < addToCartButtons.length; i++) {
    let button = addToCartButtons[i];
    //wenn button geklickt wird, dann addToCartClicked function läuft ab
    button.addEventListener("click", addToCartClicked);
  }
}
//addToCartClicked function
function addToCartClicked(e) {
  let button = e.target;
  let productsImShop = button.parentElement;
  let title =
    productsImShop.getElementsByClassName("product-title")[0].innerText;
  let price = productsImShop.getElementsByClassName("price")[0].innerText;
  let productsImShopImg =
    productsImShop.getElementsByClassName("product-img")[0].src;

  addProductToCart(title, price, productsImShopImg);
  updateCartTotal();
}
console.log(productsImShopImg);
//addProductToCart function
function addProductToCart(title, price, productsImShopImg) {
  let cartBox = document.createElement("div");
  cartBox.classList.add("cart-box");

  let cartItems = document.getElementsByClassName("cart-content")[0];
  let cartItemNames = cartItems.getElementsByClassName("cart-product-title");

  // Überprüfen, ob das Produkt bereits im Warenkorb ist
  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText === title) {
      alert("Dieses Produkt befindet sich bereits im Warenkorb.");
      return;
    }
  }

  //cartBox html-erstellen- copy von html to js in cartBoxContent
  const cartBoxContent = ` <img
src="${productsImShopImg}"
alt=""
class="cart-img"
/>
<div class="detail-box">
<div class="cart-product-title">${title}</div>
<div class="cart-product-price">${price}</div>
<input type="number" value="1" class="cart-quantity" />
</div>
<!-- remove cart -trash button-->
<img
src="assets/icons8-trash-windows-11-outline-32.png"
alt=""
class="cart-remove"
/>`;
  cartBox.innerHTML = cartBoxContent;
  cartItems.append(cartBox);

  // Event-Listener für die neu erstellten Elemente hinzufügen
  cartBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
  cartBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);
}
//quantityChanged function
function quantityChanged(e) {
  const input = e.target;

  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1; //wenn input value nicht number oder kleiner gleich 0, dann 1--ausschließen negative value
  }
  updateCartTotal(); //update cart total function,wenn quantity input geändert wird
}

//removeCartItem function
function removeCartItem(e) {
  let buttonClicked = e.target; //.target ist für das element, das geklickt wurde,wo der event ausgeführt wurde
  buttonClicked.parentElement.remove(); //parent von button löschen-hier .cart-box
  updateCartTotal(); //update cart total function,wenn gelöscht der element
}

//update cart total function
function updateCartTotal() {
  let cartContent = document.getElementsByClassName("cart-content")[0];
  let cartBoxes = cartContent.getElementsByClassName("cart-box");
  let total = 0;

  for (let i = 0; i < cartBoxes.length; i++) {
    let cartBox = cartBoxes[i];
    let cartProductPrice =
      cartBox.getElementsByClassName("cart-product-price")[0];
    let cartProductQuantity =
      cartBox.getElementsByClassName("cart-quantity")[0];
    let price = parseFloat(cartProductPrice.innerText.replace("€", ""));
    let quantity = cartProductQuantity.value;

    total += quantity * price;
  }

  // Wenn dezimal im Preis, dann auf 2 Dezimalstellen runden
  total = Math.round(total * 100) / 100;

  document.getElementsByClassName("total-price")[0].innerText = total + "€";
}
