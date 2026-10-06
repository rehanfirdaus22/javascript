// script.js
// Tugas Individu 2 - Bagian 2 (DOM & Events)
// Lanjutan dari data dan function Bagian 1

const produk = [
  { nama: "Sepatu Lari Aero X", kategori: "Lari", harga: 350000, stok: 12 },
  { nama: "Sepatu Kasual Denim", kategori: "Kasual", harga: 275000, stok: 5 },
  { nama: "Sepatu Boot Kulit", kategori: "Boot", harga: 480000, stok: 0 },
  { nama: "Sandal Gunung Trail", kategori: "Outdoor", harga: 150000, stok: 20 },
  { nama: "Sepatu Formal Oxford", kategori: "Formal", harga: 500000, stok: 3 },
];

// Function dari Bagian 1, masih dipakai untuk olah data
function hitungTotalStok(daftarProduk) {
  let total = 0;
  for (const item of daftarProduk) {
    total += item.stok;
  }
  return total;
}

const grid = document.getElementById("produkGrid");
const searchInput = document.getElementById("searchInput");
const toggleHabisBtn = document.getElementById("toggleHabisBtn");
const formTambah = document.getElementById("formTambah");

let sembunyikanHabis = false;

// Poin 1: tampilkan array of object ke halaman pakai template literal
function renderProduk(daftarProduk) {
  if (daftarProduk.length === 0) {
    grid.innerHTML = `<div class="kosong">Produk tidak ditemukan.</div>`;
    return;
  }

  grid.innerHTML = daftarProduk
    .map((item) => {
      const statusHabis = item.stok === 0;
      const kelasHabis = statusHabis ? "habis" : "";
      const kelasSembunyi = statusHabis && sembunyikanHabis ? "hidden" : "";
      const teksStok = statusHabis ? "Stok habis" : `Stok: ${item.stok}`;

      return `
        <div class="card ${kelasHabis} ${kelasSembunyi}">
          <h3>${item.nama}</h3>
          <div class="kategori">${item.kategori}</div>
          <div class="harga">Rp ${item.harga.toLocaleString("id-ID")}</div>
          <div class="stok">${teksStok}</div>
        </div>
      `;
    })
    .join("");
}

// Poin 2 (interaksi 1): pencarian/filter data pakai addEventListener
searchInput.addEventListener("input", () => {
  const kataKunci = searchInput.value.toLowerCase();
  const hasilFilter = produk.filter((item) =>
    item.nama.toLowerCase().includes(kataKunci)
  );
  renderProduk(hasilFilter);
});

// Poin 2 (interaksi 2): toggle tampilan produk yang stoknya habis
// classList dipakai di sini untuk ubah tampilan, bukan style inline
toggleHabisBtn.addEventListener("click", () => {
  sembunyikanHabis = !sembunyikanHabis;
  toggleHabisBtn.classList.toggle("secondary", !sembunyikanHabis);
  toggleHabisBtn.textContent = sembunyikanHabis
    ? "Tampilkan produk habis"
    : "Sembunyikan produk habis";
  renderProduk(produk);
});

// Poin 3: form tambah produk, validasi input, dan preventDefault()
formTambah.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputNama = document.getElementById("inputNama");
  const inputKategori = document.getElementById("inputKategori");
  const inputHarga = document.getElementById("inputHarga");
  const inputStok = document.getElementById("inputStok");

  const errorNama = document.getElementById("errorNama");
  const errorKategori = document.getElementById("errorKategori");
  const errorHarga = document.getElementById("errorHarga");
  const errorStok = document.getElementById("errorStok");

  // reset pesan error dan class error sebelum validasi ulang
  [inputNama, inputKategori, inputHarga, inputStok].forEach((field) =>
    field.classList.remove("input-error")
  );
  [errorNama, errorKategori, errorHarga, errorStok].forEach((el) => (el.textContent = ""));

  let valid = true;

  if (inputNama.value.trim() === "") {
    inputNama.classList.add("input-error");
    errorNama.textContent = "Nama produk wajib diisi";
    valid = false;
  }

  if (inputKategori.value.trim() === "") {
    inputKategori.classList.add("input-error");
    errorKategori.textContent = "Kategori wajib diisi";
    valid = false;
  }

  const harga = Number(inputHarga.value);
  if (inputHarga.value === "" || harga <= 0) {
    inputHarga.classList.add("input-error");
    errorHarga.textContent = "Harga harus lebih dari 0";
    valid = false;
  }

  const stok = Number(inputStok.value);
  if (inputStok.value === "" || stok < 0) {
    inputStok.classList.add("input-error");
    errorStok.textContent = "Stok tidak boleh negatif";
    valid = false;
  }

  if (!valid) return;

  produk.push({
    nama: inputNama.value.trim(),
    kategori: inputKategori.value.trim(),
    harga: harga,
    stok: stok,
  });

  formTambah.reset();
  renderProduk(produk);
  console.log("Total stok setelah penambahan:", hitungTotalStok(produk));
});

renderProduk(produk);   