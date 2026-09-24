// Mini Project - Pertemuan 3-4: RESTful API CRUD dengan Express.js
// Entitas: laporan (id, jenis, nama_barang, deskripsi, lokasi, tanggal, status)

const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let laporan = [
  {
    id: 1,
    jenis: "hilang",
    nama_barang: "Dompet Hitam",
    deskripsi: "Dompet warna hitam",
    lokasi: "Gedung A",
    tanggal: "2026-09-20",
    status: "menunggu",
  },
  {
    id: 2,
    jenis: "ditemukan",
    nama_barang: "Tumbler Pink",
    deskripsi: "Tumbler warna pink",
    lokasi: "Perpustakaan",
    tanggal: "2026-09-21",
    status: "terverifikasi",
  },
];

// GET semua laporan
app.get("/laporan", (req, res) => {
  res.json(laporan);
});

// GET laporan berdasarkan ID
app.get("/laporan/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const data = laporan.find((item) => item.id === id);

  if (!data) {
    return res.status(404).json({
      message: "Data tidak ditemukan",
    });
  }

  res.json(data);
});

// POST laporan baru
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

// PUT laporan
app.put("/laporan/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = laporan.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Data tidak ditemukan",
    });
  }

  laporan[index] = {
    ...laporan[index],
    ...req.body,
  };

  res.json(laporan[index]);
});

// DELETE laporan
app.delete("/laporan/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = laporan.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Data tidak ditemukan",
    });
  }

  laporan.splice(index, 1);

  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
