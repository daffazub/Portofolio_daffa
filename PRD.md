# Product Requirements Document (PRD)

## 1. Informasi Produk

- **Nama produk:** Portofolio Daffa Zubair Rabbani
- **Jenis produk:** Website portofolio personal
- **Platform:** Next.js App Router, web responsif desktop dan mobile
- **Status:** MVP berjalan
- **Pemilik produk:** Daffa Zubair Rabbani
- **Bahasa utama:** Bahasa Indonesia

## 2. Ringkasan Produk

Website ini menjadi pusat informasi profesional Daffa Zubair Rabbani sebagai Web dan IoT Developer. Pengunjung dapat mengenal profil, melihat keahlian, pengalaman, pendidikan, proyek, serta menghubungi Daffa melalui kontak langsung atau formulir pesan.

Produk harus menyampaikan kompetensi teknis secara cepat, terlihat profesional, mudah dinavigasi, responsif di berbagai ukuran layar, dan memberi jalur kontak yang jelas.

## 3. Latar Belakang Dan Masalah

Calon recruiter, klien, atau kolaborator membutuhkan satu halaman yang ringkas untuk:

- Memahami latar belakang dan fokus keahlian Daffa.
- Menilai pengalaman dan proyek yang pernah dikerjakan.
- Melihat bukti kemampuan Web, Mobile, dan IoT.
- Mengakses CV dan profil profesional.
- Menghubungi Daffa tanpa proses yang rumit.

Tanpa portofolio terpusat, informasi tersebut tersebar dan sulit dibandingkan dalam waktu singkat.

## 4. Tujuan Produk

### Tujuan Utama

1. Membangun kredibilitas profesional Daffa di bidang Web, Mobile, dan IoT.
2. Menampilkan proyek dengan konteks, kategori, dan tautan repositori.
3. Memudahkan pengunjung menghubungi Daffa.
4. Memberikan pengalaman browsing yang cepat, nyaman, dan responsif.

### Bukan Tujuan MVP

- Menjadi platform blog atau CMS.
- Menyediakan autentikasi pengguna.
- Menyimpan data pesan ke database sendiri.
- Menjadi marketplace jasa atau sistem lamaran kerja.

## 5. Target Pengguna

### Pengunjung Utama

- Recruiter atau HR yang ingin menilai kandidat secara cepat.
- Calon klien yang mencari developer untuk proyek Web, Mobile, atau IoT.
- Dosen, mentor, atau rekan kolaborasi akademik.
- Developer lain yang ingin melihat proyek dan teknologi yang digunakan.

### Kebutuhan Pengguna

- Informasi penting mudah ditemukan.
- Tampilan terlihat profesional dan konsisten.
- Proyek dapat dipahami tanpa membaca terlalu panjang.
- CV dan tautan profesional dapat diakses dengan mudah.
- Website nyaman digunakan lewat ponsel.

## 6. User Stories

- Sebagai recruiter, saya ingin melihat ringkasan profil dan keahlian agar dapat menilai kecocokan kandidat dengan cepat.
- Sebagai calon klien, saya ingin melihat daftar proyek dan repositorinya agar dapat memahami pengalaman teknis Daffa.
- Sebagai pengunjung mobile, saya ingin membuka navigasi dan berpindah section dengan mudah.
- Sebagai pengunjung, saya ingin mengganti tema terang atau gelap sesuai kenyamanan saya.
- Sebagai calon kolaborator, saya ingin mengirim pesan melalui formulir kontak dan mendapat umpan balik yang jelas.
- Sebagai pemilik portofolio, saya ingin mengunduh CV dan mengarahkan pengunjung ke GitHub serta LinkedIn.

## 7. Ruang Lingkup MVP

### Halaman Dan Section

1. **Beranda/Hero**
   - Nama dan ringkasan profesi.
   - Tombol menuju portofolio.
2. **Tentang Saya**
   - Foto profil.
   - Ringkasan pendidikan dan minat teknologi.
   - Tombol download CV.
3. **Keahlian**
   - Bahasa pemrograman.
   - Design dan prototyping.
   - Tools, database, dan IoT.
4. **Pengalaman**
   - Pengalaman PKL di BKPSDM Kota Bekasi.
5. **Edukasi**
   - Riwayat pendidikan yang relevan.
6. **Portofolio**
   - Kartu proyek dengan gambar, kategori, deskripsi, dan repositori.
7. **Kontak**
   - Nomor telepon, email, lokasi, dan formulir pesan.
8. **Footer**
   - Tautan LinkedIn, GitHub, email, dan copyright.

## 8. Kebutuhan Fungsional

### Navigasi

- Navigasi desktop menampilkan seluruh tautan section.
- Navigasi mobile menggunakan tombol hamburger.
- Menu mobile dapat ditutup melalui klik di luar menu atau tombol Escape.
- Pengguna keyboard dapat melewati navigasi melalui skip link menuju konten utama.
- Klik tautan internal melakukan smooth scroll dengan kompensasi tinggi header.
- Tautan navigasi aktif mengikuti section yang sedang terlihat.
- Indikator progress scroll membantu pengguna memahami posisi mereka di halaman.

### Tema

- Pengunjung dapat beralih antara tema terang dan gelap.
- Preferensi tema disimpan di `localStorage`.
- Jika belum ada preferensi tersimpan, sistem mengikuti preferensi sistem operasi.

### Portofolio

- Setiap proyek memiliki judul, gambar, kategori, deskripsi, dan tautan eksternal.
- Tautan eksternal dibuka di tab baru dengan atribut keamanan yang sesuai.

### Formulir Kontak

- Field wajib: nama, email, dan pesan.
- Sistem memvalidasi field kosong.
- Sistem memvalidasi format email.
- Tombol submit menampilkan state proses pengiriman.
- Sistem menampilkan status berhasil atau gagal.
- Form di-reset setelah simulasi pengiriman berhasil.

### Scroll Trigger

- Section dan kartu diberi animasi saat masuk viewport.
- Animasi hanya berjalan ketika elemen terlihat.
- Animasi tidak menghalangi akses ke konten.
- Pengguna dengan preferensi reduced motion tidak dipaksa melihat animasi.

## 9. Kebutuhan Non-Fungsional

### Responsivitas

- Layout harus usable pada lebar minimal 320px.
- Tidak boleh ada horizontal overflow pada mobile.
- Kartu proyek dan keahlian menyesuaikan lebar layar.

### Aksesibilitas

- Semua gambar memiliki alternative text.
- Tombol dan tautan memiliki label yang jelas.
- Navigasi keyboard harus tetap dapat digunakan.
- Skip link harus terlihat saat menerima fokus keyboard.
- Focus state harus terlihat.
- Kontras teks dan tombol harus terbaca pada tema terang maupun gelap.
- Form memakai label semantik walaupun label visual disembunyikan.

### Performa

- Gambar non-kritis menggunakan lazy loading.
- Tidak menambahkan library JavaScript besar untuk fitur sederhana.
- Animasi menggunakan properti yang relatif ringan seperti `opacity` dan `transform`.
- Server lokal harus dapat menyajikan file HTML, CSS, JavaScript, gambar, dan PDF.

### Keamanan

- Tautan eksternal menggunakan `rel="noopener noreferrer"`.
- Path file yang diminta server harus dinormalisasi untuk mengurangi risiko path traversal.
- Data formulir tidak boleh ditampilkan kembali sebagai HTML tanpa sanitasi jika backend nyata ditambahkan.

## 10. Kriteria Penerimaan MVP

- Pengunjung dapat membuka website melalui desktop dan mobile.
- Semua tautan navigasi mengarah ke section yang tepat.
- Menu mobile dapat dibuka, ditutup, dan digunakan dengan keyboard.
- Toggle tema mengubah tampilan dan mempertahankan pilihan setelah reload.
- Semua kartu proyek menampilkan informasi yang lengkap dan dapat dibaca.
- Tombol CV mengunduh file CV yang tersedia.
- Form menolak data kosong dan email tidak valid.
- Form menampilkan feedback setelah submit.
- Elemen section muncul dengan scroll reveal tanpa error JavaScript.
- Website tetap terbaca ketika `prefers-reduced-motion: reduce` aktif.
- Tidak ada error pada pemeriksaan sintaks JavaScript.

## 11. Metrik Keberhasilan

- Pengunjung dapat menemukan section Portofolio dalam maksimal dua interaksi.
- Pengunjung dapat menemukan cara kontak dari section Kontak atau Footer.
- Tidak ada horizontal scroll pada breakpoint mobile utama.
- Semua navigasi internal memiliki target yang valid.
- Tidak ada error JavaScript saat halaman dimuat atau saat form digunakan.
- Peningkatan klik pada tombol download CV, repositori, dan kontak dapat diukur jika analytics ditambahkan.

## 12. Prioritas Pengembangan

### P0 - Wajib Untuk MVP

- Informasi profil, keahlian, pengalaman, edukasi, portofolio, dan kontak.
- Responsive layout.
- Navigasi desktop dan mobile.
- Tema terang dan gelap.
- Validasi formulir.
- Scroll reveal yang menghormati reduced motion.

### P1 - Peningkatan Berikutnya

- Backend atau layanan form nyata agar pesan benar-benar terkirim.
- Open Graph metadata untuk preview saat dibagikan.
- Favicon dan metadata SEO yang lebih lengkap.
- Optimasi ukuran gambar dan audit Lighthouse.
- Filter proyek berdasarkan kategori.
- Detail proyek terpisah untuk studi kasus.

### P2 - Eksplorasi

- Dashboard admin untuk mengelola proyek.
- Bahasa Indonesia dan Inggris.
- Integrasi analytics yang menghormati privasi.
- Blog teknis atau catatan proyek.
- Testimoni atau rekomendasi dari kolaborator.

## 13. Risiko Dan Mitigasi

| Risiko | Dampak | Mitigasi |
| --- | --- | --- |
| Formulir masih berupa simulasi | Pesan tidak benar-benar diterima | Integrasikan Formspree, EmailJS, atau backend aman pada fase P1 |
| Gambar besar memperlambat loading | Pengalaman mobile menurun | Kompres gambar, gunakan format modern, dan pertahankan lazy loading |
| Link repositori tidak spesifik ke proyek | Kredibilitas proyek berkurang | Ganti setiap tautan dengan repositori proyek yang sesuai |
| Animasi mengganggu pengguna tertentu | Aksesibilitas menurun | Gunakan media query `prefers-reduced-motion` |
| Konten proyek tidak diperbarui | Informasi menjadi tidak relevan | Jadwalkan review konten setiap semester atau setelah proyek selesai |

## 14. Asumsi

- Daffa memiliki hak untuk menggunakan foto, logo, gambar proyek, dan CV yang ditampilkan.
- File CV dan aset gambar tersedia pada folder proyek.
- Tautan GitHub dan LinkedIn tetap aktif.
- Website pada MVP digunakan sebagai portofolio statis tanpa akun pengguna.
- Bahasa utama pengunjung adalah Bahasa Indonesia.

## 15. Definition Of Done

Fitur dianggap selesai jika:

- Implementasi sesuai ruang lingkup dan kriteria penerimaan.
- Tidak menimbulkan error baru pada console browser.
- Tampilan telah dicek pada desktop dan mobile.
- Interaksi keyboard dasar berfungsi.
- Mode terang, mode gelap, dan reduced motion tetap usable.
- Dokumentasi perubahan diperbarui jika perilaku produk berubah.
