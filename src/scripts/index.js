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
