// script.js
// Tugas Individu 2 - Bagian 2 (DOM & Events)
// Lanjutan dari data dan function Bagian 1

// ===== Data =====
// Array of object: sumber data yang ditampilkan lewat DOM
const produk = [
  { id: 1, nama: "Sepatu Lari Aero X", kategori: "Lari", harga: 350000, stok: 12 },
  { id: 2, nama: "Sepatu Kasual Denim", kategori: "Kasual", harga: 275000, stok: 5 },
  { id: 3, nama: "Sepatu Boot Kulit", kategori: "Boot", harga: 480000, stok: 0 },
  { id: 4, nama: "Sandal Gunung Trail", kategori: "Outdoor", harga: 150000, stok: 20 },
  { id: 5, nama: "Sepatu Formal Oxford", kategori: "Formal", harga: 500000, stok: 3 },
];

let idBerikutnya = produk.length + 1; // penanda id untuk produk baru
let kataKunci = "";                   // isi kotak pencarian saat ini
let sembunyikanHabis = false;         // status tombol toggle produk habis

// ===== Function pengolah data (dari Bagian 1) =====

// Menjumlahkan seluruh stok produk
function hitungTotalStok(daftarProduk) {
  let total = 0;
  for (const item of daftarProduk) {
    total += item.stok;
  }
  return total;
}

// ===== Elemen DOM =====
const grid = document.getElementById("produkGrid");
const searchInput = document.getElementById("searchInput");
const toggleHabisBtn = document.getElementById("toggleHabisBtn");
const formTambah = document.getElementById("formTambah");

// ===== Tampilan =====

// Menampilkan produk ke halaman memakai template literal
// (data diambil dari array, bukan ditulis manual di HTML)
function renderProduk() {
  const hasilFilter = produk.filter((item) =>
    item.nama.toLowerCase().includes(kataKunci)
  );

  if (hasilFilter.length === 0) {
    grid.innerHTML = `<div class="kosong">Produk tidak ditemukan.</div>`;
    return;
  }

  grid.innerHTML = hasilFilter
    .map((item) => {
      const statusHabis = item.stok === 0;
      const kelasHabis = statusHabis ? "habis" : "";
      const kelasSembunyi = statusHabis && sembunyikanHabis ? "hidden" : "";
      const teksStok = statusHabis ? "Stok habis" : `Stok: ${item.stok}`;

      return `
        <div class="card ${kelasHabis} ${kelasSembunyi}" data-id="${item.id}">
          <h3>${item.nama}</h3>
          <div class="kategori">${item.kategori}</div>
          <div class="harga">Rp ${item.harga.toLocaleString("id-ID")}</div>
          <div class="stok">${teksStok}</div>
          <button type="button" class="btn-hapus">Hapus</button>
        </div>
      `;
    })
    .join("");
}

// Notifikasi singkat memakai efek jQuery (fadeIn, delay, fadeOut)
function tampilkanNotif(pesan) {
  $("#notif").stop(true, true).text(pesan).fadeIn(250).delay(1800).fadeOut(400);
}

// ===== Event 1: pencarian / filter =====
searchInput.addEventListener("input", () => {
  kataKunci = searchInput.value.toLowerCase();
  renderProduk();
});

// ===== Event 2: toggle produk yang stoknya habis =====
toggleHabisBtn.addEventListener("click", () => {
  sembunyikanHabis = !sembunyikanHabis;
  toggleHabisBtn.classList.toggle("secondary", !sembunyikanHabis);
  toggleHabisBtn.textContent = sembunyikanHabis
    ? "Tampilkan produk habis"
    : "Sembunyikan produk habis";
  renderProduk();
});

// ===== Event 3: form tambah produk + validasi =====
formTambah.addEventListener("submit", (event) => {
  event.preventDefault(); // cegah halaman reload

  const inputNama = document.getElementById("inputNama");
  const inputKategori = document.getElementById("inputKategori");
  const inputHarga = document.getElementById("inputHarga");
  const inputStok = document.getElementById("inputStok");

  const errorNama = document.getElementById("errorNama");
  const errorKategori = document.getElementById("errorKategori");
  const errorHarga = document.getElementById("errorHarga");
  const errorStok = document.getElementById("errorStok");

  // Bersihkan tanda error dari percobaan sebelumnya
  [inputNama, inputKategori, inputHarga, inputStok].forEach((field) =>
    field.classList.remove("input-error")
  );
  [errorNama, errorKategori, errorHarga, errorStok].forEach(
    (el) => (el.textContent = "")
  );
    
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

  const produkBaru = {
    id: idBerikutnya++,
    nama: inputNama.value.trim(),
    kategori: inputKategori.value.trim(),
    harga: harga,
    stok: stok,
  };
  produk.push(produkBaru);

  formTambah.reset();
  renderProduk(produk);

  // Fitur jQuery: kartu baru muncul dengan efek fadeIn
  $(`.card[data-id="${produkBaru.id}"]`).hide().fadeIn(500);
  tampilkanNotif(`"${produkBaru.nama}" berhasil ditambahkan`);
  console.log("Total stok setelah penambahan:", hitungTotalStok(produk));
});

// ===== Event 4 (jQuery): hapus produk =====
// Event delegation, karena kartu dibuat ulang setiap kali render
$("#produkGrid").on("click", ".btn-hapus", function () {
  const kartu = $(this).closest(".card");
  const idHapus = Number(kartu.data("id"));
  const namaHapus = kartu.find("h3").text();

  // Efek slideUp dulu, baru data dihapus dari array
  kartu.slideUp(300, function () {
    const posisi = produk.findIndex((item) => item.id === idHapus);
    if (posisi !== -1) {
      produk.splice(posisi, 1);
    }
    renderProduk();
    tampilkanNotif(`"${namaHapus}" dihapus`);
    console.log("Total stok setelah penghapusan:", hitungTotalStok(produk));
  });
});

// Tampilan awal saat halaman dibuka
renderProduk(produk);   