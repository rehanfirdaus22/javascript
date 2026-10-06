// script.js
// Tugas Individu 2 - data produk toko sepatu

const produk = [
  { nama: "Sepatu Lari Aero X", kategori: "Lari", harga: 350000, stok: 12 },
  { nama: "Sepatu Kasual Denim", kategori: "Kasual", harga: 275000, stok: 5 },
  { nama: "Sepatu Boot Kulit", kategori: "Boot", harga: 480000, stok: 0 },
  { nama: "Sandal Gunung Trail", kategori: "Outdoor", harga: 150000, stok: 20 },
  { nama: "Sepatu Formal Oxford", kategori: "Formal", harga: 500000, stok: 3 },
];

// Function 1: menjumlahkan seluruh stok pakai for...of
function hitungTotalStok(daftarProduk) {
  let total = 0;
  for (const item of daftarProduk) {
    total += item.stok;
  }
  return total;
}

// Function 2: filter produk yang masih ada stoknya dan harganya di bawah 500rb
// pakai forEach, operator perbandingan (>, <) dan operator logika (&&)
function cariProdukTersedia(daftarProduk) {
  const tersedia = [];
  daftarProduk.forEach((item) => {
    if (item.stok > 0 && item.harga < 500000) {
      tersedia.push(item.nama);
    }
  });
  return tersedia;
}

// Function 3: mencari produk termahal pakai perulangan for biasa
function produkTermahal(daftarProduk) {
  let termahal = daftarProduk[0];
  for (let i = 1; i < daftarProduk.length; i++) {
    if (daftarProduk[i].harga > termahal.harga) {
      termahal = daftarProduk[i];
    }
  }
  return termahal;
}

console.log("Daftar produk:", produk);
console.log("Total stok seluruh produk:", hitungTotalStok(produk));
console.log("Produk tersedia (stok ada & harga < 500rb):", cariProdukTersedia(produk));
console.log("Produk termahal:", produkTermahal(produk).nama);
