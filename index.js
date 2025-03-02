const fs = require("fs");
const readline = require("readline-sync");

const FILE_PATH = "./data.json";

// Untuk membaca Database
function readDatabase() {
  try {
    const data = fs.readFileSync(FILE_PATH);
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}
// Untuk menyimpan database
function saveDatabase(data) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
}

// Menampilkan daftar item
function showItems() {
  const items = readDatabase();
  console.log("\nDaftar Lagu:");
  items.forEach((item, index) => {
    console.log(
      `${index + 1}. ${item.judul} - ${item.artis} - ${item.tahun}`
    );
  });
}

// Menambah item bary
function addItem() {
  const judul = readline.question("Masukkan Judul Lagu : ");
  const artis = readline.question("Masukkan Nama Artis : ");
  const tahun = readline.question("Masukkan Tahun : ");

  const items = readDatabase();
  items.push({ judul, artis, tahun });
  saveDatabase(items);

  console.log("Lagu Berhasil Ditambahkan");
}

// Menjalankan aplikasi
function main() {
  while (true) {
    console.log("\n=== Sistem Database Sederhana ===");
    console.log("1. Lihat daftar lagu");
    console.log("2. Tambah lagu baru");
    console.log("3. Cari Lagu");
    console.log("4. Update Lagu");
    console.log("5. Hapus Lagu");
    console.log("6. Keluar");

    const choice = readline.questionInt("Pilih : ");

    if (choice === 1) showItems();
    else if (choice === 2) addItem();
    else if (choice === 3) findItem();
    else if (choice === 4) updateItem();
    else if (choice === 5) deleteItem();
    else if (choice === 6) break;
    else console.log("Pilihan tidak valid, masukkan pilihan yang benar!");
  }
}
// Mencari lagu
function findItem() {
  const judul = readline.question("Masukkan lagu yang akan dicari : ");
  const items = readDatabase();
  const item = items.find((i) => i.judul.toLowerCase() === judul.toLowerCase());

  if (item) console.log(`Ditemukan: ${item.judul} - ${item.artis} - ${item.tahun}`);
  else console.log("Lagu tidak ditemukan!");
}

// Mengupdate lagu berdasarkan judul
function updateItem() {
  const judul = readline.question("Masukkan lagu yang akan diupdate  : ");
  const items = readDatabase();
  const index = items.findIndex(
    (i) => i.judul.toLowerCase() === judul.toLowerCase()
  );

  if (index !== 1) {
    items[index].artis = readline.question("Masukkan artis baru : ");
    items[index].tahun = readline.questionInt("Masukkan tahun terbaru : ");
    saveDatabase(items);
    console.log("Lagu berhasil diupdate!");
  } else {
    console.log("Lagu tidak ditemukan!");
  }
}

// Menghapus item berdasarkan nama
function deleteItem() {
  const judul = readline.question("Masukkan lagu yang ingin dihapus : ");
  let items = readDatabase();
  const newItems = items.filter(
    (i) => i.judul.toLowerCase() !== judul.toLowerCase()
  );

  if (newItems.length < items.length) {
    saveDatabase(newItems);
    console.log("Lagu berhasil dihapus!");
  } else {
    console.log("Lagu tidak ditemukan!");
  }
}

// Menjalankan aplikasi
main();
