// Mini Project - Pertemuan 3-4: RESTful API CRUD dengan Express.js
// Entitas: mahasiswa (id, nama, jurusan)
//
// TODO Mahasiswa: lengkapi setiap handler di bawah ini sesuai komentar.
// Jalankan dengan: npm install && npm start

const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let laporan = [
  { id: 1, jenis: "hilang", nama_barang: "Dompet Hitam", deskripsi: "Dompet warna hitam", lokasi: "Gedung A", tanggal: "2026-09-20", status: "menunggu", },
  { id: 2, jenis: "ditemukan", nama_barang: "Tumbler Pink", deskripsi: "Tumbler warna pink", lokasi: "Perpustakaan", tanggal: "2026-09-21", status: "terverifikasi", },
];

// TODO 1: GET /laporan -> kirim seluruh data sebagai JSON
app.get("/laporan", (req, res) => {
  res.json(laporan);
});

// TODO 2: GET /laporan/:id -> cari data berdasarkan id,
// kirim 404 dengan { message: 'Data tidak ditemukan' } jika tidak ada
app.get("/laporan/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const data = laporan.find((item) => item.id === id);
  if (!data) { return res.status(404).json({ message: "Data tidak ditemukan", }); }
  res.json(data);
});

// TODO 3: POST /mlaporan -> ambil { jenis, nama_barang, deskripsi, lokasi, tanggal, status, } dari req.body,
// buat objek baru dengan id = mahasiswa.length + 1, simpan ke array,
// kirim response dengan status 201
app.post("/laporan", (req, res) => {
  const { jenis, nama_barang, deskripsi, lokasi, tanggal, status } = req.body;

  const baru = {
    id: laporan.length + 1,
    jenis,
    nama_barang,
    deskripsi,
    lokasi,
    tanggal,
    status,
  };

  laporan.push(baru);
  res.status(201).json(baru);
});

// TODO 4: PUT /laporan/:id -> cari index berdasarkan id,
// jika tidak ditemukan kirim 404, jika ditemukan gabungkan data lama
// dengan req.body lalu kirim data yang telah diperbarui
app.put("/laporan/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = laporan.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Data tidak ditemukan", });
  }

  laporan[index] = { ...laporan[index], ...req.body,};
  res.json(laporan[index]);
});

// TODO 5: DELETE /laporan/:id -> cari index berdasarkan id,
// jika tidak ditemukan kirim 404, jika ditemukan hapus dari array
// dan kirim response dengan status 204
app.delete("/laporan/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = laporan.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Data tidak ditemukan", });
  }

  laporan.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
