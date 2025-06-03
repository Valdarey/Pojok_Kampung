document.addEventListener("alpine:init", () => {
  Alpine.data("produk", () => ({
    coffee: [
      { id: 1, nama: "Kopi Cangkir", img: "kopiCangkir.jpg", harga: 3000 },
      { id: 2, nama: "Kopi Tubruk", img: "kopiTubruk.jpg", harga: 5000 },
      {
        id: 3,
        nama: "Kopi Susu Pojok Kampung",
        img: "kopiSusuPK.jpg",
        harga: 12000,
      },
      { id: 4, nama: "Americano", img: "americano.jpg", harga: 10000 },
      { id: 5, nama: "Latte", img: "latte.jpg", harga: 15000 },
    ],
    drink: [
      { id: 5, nama: "Jus Jeruk", img: "jusJeruk.jpg", harga: 8000 },
      { id: 6, nama: "Es Teh", img: "esTeh.jpg", harga: 4000 },
      { id: 7, nama: "Es Milo", img: "esMilo.jpg", harga: 6000 },
      {
        id: 8,
        nama: "Johnnie Walker Red Label 750ml",
        img: "alkohol-01.jpg",
        harga: 460000,
      },
      {
        id: 9,
        nama: "Chivas Regal 12YO 750ml",
        img: "alkohol-02.jpg",
        harga: 670000,
      },
      {
        id: 10,
        nama: "Finlandia Vodka 750ml",
        img: "alkohol-03.jpg",
        harga: 241000,
      },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    // BUAT INCREMENT DALAM KERANJANG
    add(barangBaru) {
      const cartItem = this.items.find((item) => item.id === barangBaru.id);
      if (!cartItem) {
        this.items.push({
          ...barangBaru,
          quantity: 1,
          total: barangBaru.harga,
        });
        this.quantity++;
        this.total += barangBaru.harga;
      } else {
        this.items = this.items.map((item) => {
          if (item.id !== barangBaru.id) {
            return item;
          } else {
            item.quantity++;
            item.total = item.harga * item.quantity;
            this.quantity++;
            this.total += item.harga;
            return item;
          }
        });
      }
    },
    // BUAT DECREMENT DALAM KERANJANG
    remove(hapusBarang) {
      const cartItem = this.items.find((item) => item.id === hapusBarang);
      if (cartItem.quantity > 1) {
        this.items = this.items.map((item) => {
          if (item.id !== hapusBarang) {
            return item;
          } else {
            item.quantity--;
            item.total = item.harga * item.quantity;
            this.quantity--;
            this.total -= item.harga;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        this.items = this.items.filter((item) => item.id !== hapusBarang);
        this.quantity--;
        this.total -= cartItem.harga;
      }
    },
  });
});

// MATA UANG
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

// validasi
const checkButton = document.querySelector(".tombol-checkout");
checkButton.disabled = true;

const form = document.querySelector("#form-full");
form.addEventListener("keyup", function () {
  for (let i = 0; i < form.elements.length; i++) {
    if (form.elements[i].value.length !== 0) {
      checkButton.classList.remove("disabled");
      checkButton.classList.add("disabled");
    } else {
      return false;
    }
  }
  checkButton.disabled = false;
  checkButton.classList.remove("disabled");
});

checkButton.addEventListener("click", function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  const objData = Object.fromEntries(data);
  const pesan = formatPesan(objData);
  window.open("http://wa.me/6281225644994?text=" + encodeURIComponent(pesan));
});

const formatPesan = (obj) => {
  return `--- Data Pelanggan ---
  Nama: ${obj.nama} \n
  --- Data Pesanan --- 
  ${JSON.parse(obj.items).map(
    (item) => `${item.nama} (${item.quantity} x ${rupiah(item.harga)}) \n`
  )}
  Total: ${rupiah(obj.total)}
  `;
};

// try {
//   const response = await fetch("php/Order.php", {
//     method: "POST",
//     body: data,
//   });
//   const token = await response.text();
//   // console.log(token);
//   window.snap.pay(token);
// } catch (err) {
//   console.log(err.message);
// }
