# Product Requirements Document (PRD)

## 1. Ringkasan Produk

**Nama:** Portofolio Daffa Zubair Rabbani
**Jenis:** Website portofolio personal satu halaman
**Platform:** Next.js App Router, React, CSS responsif
**Bahasa:** Bahasa Indonesia
**Status:** MVP aktif

Website ini menjadi pusat informasi profesional Daffa Zubair Rabbani sebagai Web dan IoT Developer. Pengunjung dapat memahami profil, keahlian, pengalaman, pendidikan, karya, serta cara menghubungi Daffa melalui pengalaman browsing yang cepat, jelas, dan responsif.

## 2. Tujuan Produk

1. Menampilkan identitas dan kompetensi Daffa secara profesional.
2. Membantu recruiter, klien, dan kolaborator menemukan informasi penting dalam satu halaman.
3. Menyajikan proyek Web, Mobile, Desktop, dan IoT dengan konteks singkat serta tautan kode sumber.
4. Menyediakan jalur kontak langsung dan akses CV.
5. Memberikan pengalaman UI/UX yang nyaman pada desktop maupun mobile, termasuk tema terang dan gelap.

### Bukan Tujuan MVP

- Blog, CMS, atau dashboard admin.
- Autentikasi dan akun pengguna.
- Penyimpanan pesan ke database.
- Marketplace jasa atau sistem rekrutmen.

## 3. Target Pengguna

- Recruiter atau HR yang melakukan penilaian awal kandidat.
- Calon klien yang mencari developer Web, Mobile, atau IoT.
- Dosen, mentor, dan rekan kolaborasi akademik.
- Developer yang ingin melihat contoh proyek dan teknologi yang digunakan.

## 4. Struktur Pengalaman

Website berbentuk single-page portfolio dengan section berikut:

1. **Beranda**
   - Nama, profesi, ringkasan kompetensi, dan CTA menuju portofolio.
2. **Tentang Saya**
   - Foto, latar belakang pendidikan, minat teknologi, dan tombol download CV.
3. **Keahlian**
   - Bahasa pemrograman; design dan prototyping; tools, database, dan IoT.
4. **Pengalaman**
   - Pengalaman PKL di BKPSDM Kota Bekasi.
5. **Edukasi**
   - Pendidikan Politeknik Negeri Jember dan SMK Yadika 13.
6. **Portofolio**
   - Kartu proyek dengan preview, kategori, deskripsi, dan tautan repositori.
7. **Kontak**
   - Nomor telepon, email, lokasi, serta formulir pesan.
8. **Footer**
   - Tautan LinkedIn, GitHub, email, dan copyright.

## 5. Kebutuhan Fungsional

### Navigasi dan Layout

- Header tetap tersedia saat pengguna menggulir halaman.
- Navigasi desktop menampilkan seluruh section.
- Navigasi mobile dapat dibuka dan ditutup dengan tombol hamburger.
- Tombol navigasi menggulir ke section tujuan dengan smooth scroll.
- Section aktif ditandai berdasarkan posisi viewport.
- Progress bar di header menunjukkan posisi scroll halaman.
- Skip link tersedia untuk pengguna keyboard.

### Tema dan Visual

- Tombol tema mengubah antara mode terang dan gelap.
- Preferensi tema disimpan di `localStorage`.
- Kunjungan pertama mengikuti preferensi tema sistem operasi.
- Palet warna, border, bayangan, dan latar section beradaptasi dengan tema aktif.
- Elemen interaktif memiliki hover, focus, dan disabled state yang terlihat.

### Animasi dan Interaksi

- Heading, konten, dan kartu tampil dengan scroll reveal saat masuk viewport.
- Kartu proyek, pengalaman, pendidikan, dan keahlian merespons pointer secara halus.
- Animasi tidak boleh menghalangi pembacaan atau interaksi konten.
- Saat `prefers-reduced-motion: reduce` aktif, reveal tetap terlihat tanpa animasi bermakna dan smooth scroll dinonaktifkan.

### Portofolio

Setiap kartu proyek wajib memiliki:

- Gambar preview dan alternative text.
- Badge kategori.
- Judul proyek.
- Deskripsi singkat manfaat atau fungsi.
- Tautan repositori/kode sumber yang dibuka di tab baru.

Proyek MVP:

- Amigo Cake.
- Admin Kopi (Vybrasi Affiliate).
- Pengusir Kerumunan Unggas Otomatis ESP32-CAM.
- Sistem Parkir Berbasis RFID.
- Sistem Perjalanan Dinas (RAB & LPJ).

### Kontak

- Form memiliki field nama, email, dan pesan.
- Semua field wajib diisi.
- Email divalidasi menggunakan format email dasar.
- Tombol submit menampilkan state `Mengirim...` selama simulasi pengiriman.
- Status berhasil atau gagal diumumkan melalui area alert.
- Form di-reset setelah simulasi berhasil.
- MVP tidak mengirim data ke backend atau layanan email nyata.

## 6. Kebutuhan Non-Fungsional

### Responsivitas

- Layout usable mulai dari lebar 320px.
- Tidak ada horizontal overflow pada mobile.
- Grid skill dan portofolio menyesuaikan ukuran viewport.
- Menu dan tombol tetap mudah disentuh pada perangkat mobile.

### Aksesibilitas

- Dokumen menggunakan `lang="id"` dan struktur heading yang berurutan.
- Semua gambar memiliki `alt` yang relevan.
- Kontrol tema dan menu memiliki accessible label serta state yang sesuai.
- Form menggunakan label semantik, meskipun label visual disembunyikan.
- Focus state keyboard terlihat.
- Kontras teks dan kontrol harus terbaca pada kedua tema.

### Performa dan Keamanan

- Gambar non-kritis memakai lazy loading.
- Animasi mengutamakan `opacity` dan `transform`.
- Tidak menambah library besar untuk interaksi sederhana.
- Tautan eksternal memakai `rel="noopener noreferrer"`.
- Aset publik yang disajikan server tidak boleh melewati direktori proyek.
- Data form tidak boleh dianggap tersimpan sebelum backend nyata ditambahkan.

## 7. Kriteria Penerimaan MVP

- Halaman dapat dimuat melalui development server Next.js.
- Semua tujuh item navigasi menuju section yang benar.
- Menu mobile dapat dibuka dan ditutup tanpa menutupi akses ke konten.
- Tema tetap sama setelah halaman dimuat ulang.
- CV dapat diunduh dari section Tentang Saya.
- Lima kartu portofolio menampilkan informasi lengkap dan tautan yang dapat dibuka.
- Form menolak field kosong dan email tidak valid.
- Form menampilkan feedback loading dan hasil submit.
- Scroll reveal bekerja tanpa error JavaScript.
- Halaman tetap terbaca saat reduced motion aktif.
- Tampilan tidak mengalami horizontal overflow pada mobile.
- Tidak ada error baru pada console browser saat alur utama digunakan.

## 8. Metrik Keberhasilan

- Pengunjung dapat mencapai Portofolio dalam maksimal dua interaksi dari halaman awal.
- Pengunjung dapat menemukan kontak dan CV tanpa pencarian manual yang panjang.
- Semua target navigasi internal valid.
- Tidak ada horizontal scroll pada breakpoint mobile utama.
- Interaksi utama tidak menghasilkan error console.
- Klik CV, repositori, email, dan kontak dapat diukur pada fase analytics.

## 9. Prioritas Roadmap

### P0 - Saat Ini

- Profil, skill, pengalaman, edukasi, portofolio, kontak, dan footer.
- Navigasi responsif, tema terang/gelap, scroll progress, dan scroll reveal.
- Validasi serta feedback form kontak.
- Akses CV, GitHub, LinkedIn, email, dan telepon.

### P1 - Berikutnya

- Integrasi form dengan Formspree, EmailJS, atau backend aman.
- Open Graph dan metadata SEO yang lebih lengkap.
- Audit Lighthouse dan optimasi aset gambar.
- Filter portofolio berdasarkan kategori.
- Halaman detail untuk studi kasus proyek.

### P2 - Eksplorasi

- Dukungan bahasa Indonesia dan Inggris.
- Analytics yang menghormati privasi.
- Blog teknis atau catatan proyek.
- Dashboard admin untuk mengelola konten.
- Testimoni atau rekomendasi kolaborator.

## 10. Risiko dan Mitigasi

| Risiko | Dampak | Mitigasi |
| --- | --- | --- |
| Form masih simulasi | Pesan tidak benar-benar diterima | Integrasikan layanan/backend form pada P1 |
| Link proyek belum spesifik | Kredibilitas portofolio menurun | Audit dan perbarui URL setiap proyek |
| Aset gambar berukuran besar | Loading mobile lambat | Kompres aset dan gunakan format modern |
| Animasi mengganggu sebagian pengguna | Aksesibilitas menurun | Pertahankan dukungan reduced motion |
| Konten tidak diperbarui | Informasi menjadi usang | Review konten setiap semester atau setelah proyek selesai |

## 11. Definition of Done

Perubahan produk dianggap selesai jika:

- Kode dan dokumentasi sesuai scope PRD.
- UI telah diperiksa pada desktop dan mobile.
- Navigasi mouse, keyboard, dan mobile berfungsi.
- Mode terang, mode gelap, dan reduced motion tetap usable.
- Tidak ada error baru pada build atau console browser.
- Tautan aset, CV, sosial, dan repositori telah diverifikasi.
- Perubahan perilaku yang penting sudah diperbarui di PRD ini.
