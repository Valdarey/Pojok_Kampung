// KODE JS UNTUK MOBILE OR TABLET VERSION UNTUK MEMBUKA MENU-SIDEBAR
const menu = document.querySelector(".header-list");
document.querySelector("#hamburger-menu").onclick = () => {
  menu.classList.toggle("active");
};

const hamburger = document.querySelector("#hamburger-menu");
document.addEventListener("click", function (hapus) {
  if (!menu.contains(hapus.target) && !hamburger.contains(hapus.target)) {
    menu.classList.remove("active");
  }
});

// KODE JS UNTUK KERANJANG DI NAVBAR
const shopping = document.querySelector(".shopping-cart");
document.querySelector("#barang").onclick = () => {
  shopping.classList.toggle("active");
};

const shoppingClose = document.querySelector("#barang");
document.addEventListener("click", function (hapus) {
  if (
    !shopping.contains(hapus.target) &&
    !shoppingClose.contains(hapus.target)
  ) {
    shopping.classList.remove("active");
  }
});

// const kotak = document.querySelector("#kotak");
// const hidden = document.querySelector(".kotak-hidden");

// hidden.onclick = (e) => {
//   hidden.style.display = "flex";
//   e.preventDefault;
// };

// cek ada elemen yang offset dari layar
[...document.querySelectorAll("*")].forEach((el) => {
  if (el.offsetWidth > document.documentElement.clientWidth) {
    console.log("Overflowing element:", el);
  }
});
