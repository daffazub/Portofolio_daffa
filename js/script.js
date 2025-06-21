// JS/SCRIPT.JS

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Logika Beralih Tema (Dark/Light Mode) ---
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const body = document.body;

    // Fungsi untuk menerapkan tema yang tersimpan dan mengubah ikon
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-theme');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun'); // Ganti ke ikon matahari
        } else {
            body.classList.remove('dark-theme');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon'); // Ganti ke ikon bulan
        }
    };

    // Cek tema yang tersimpan di localStorage saat halaman dimuat
    const savedTheme = localStorage.getItem('theme') || 'light'; // Default ke tema terang
    applyTheme(savedTheme);

    // Event listener untuk tombol beralih tema
    themeToggle.addEventListener('click', () => {
        let newTheme;
        if (body.classList.contains('dark-theme')) {
            newTheme = 'light';
        } else {
            newTheme = 'dark';
        }
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme); // Simpan pilihan tema di localStorage
    });

    // --- Logika Smooth Scroll untuk Navigasi ---
    const navLinks = document.querySelectorAll('nav ul li a[href^="#"]'); // Target hanya link di dalam ul
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Mencegah perilaku default (loncat langsung)
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Hitung offset agar header tidak menutupi konten
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 20; // Tambah sedikit padding

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // --- Highlight Link Navigasi Aktif Saat Scroll ---
    const sections = document.querySelectorAll('main section'); // Semua section utama
    const observerOptions = {
        root: null, // Menggunakan viewport sebagai root
        rootMargin: '-50% 0px -50% 0px', // Aktif ketika bagian tengah section terlihat
        threshold: 0 // Tidak perlu threshold spesifik
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Hapus kelas 'active' dari semua link
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Tambahkan kelas 'active' ke link yang sesuai
                const correspondingLink = document.querySelector(`nav ul li a[href="#${entry.target.id}"]`);
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    // Amati setiap section
    sections.forEach(section => {
        observer.observe(section);
    });

    // --- Penanganan Form Kontak (Simulasi) ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Mencegah halaman refresh saat submit form

            // Basic Form Validation (Contoh sederhana)
            const name = this.querySelector('input[name="name"]').value;
            const email = this.querySelector('input[name="email"]').value;
            const message = this.querySelector('textarea[name="message"]').value;

            if (!name || !email || !message) {
                alert('Semua bidang harus diisi!');
                return; // Hentikan proses jika ada bidang kosong
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Format email tidak valid!');
                return; // Hentikan proses jika email tidak valid
            }

            // Simulasi pengiriman form (Anda bisa mengganti ini dengan AJAX/Fetch API nyata)
            alert('Pesan Anda telah "terkirim". Terima kasih sudah menghubungi!');
            
            // Mengosongkan form setelah "dikirim"
            this.reset();
        });
    }

});