'use client';

import { useEffect, useState } from 'react';

const navItems = [
  ['hero', 'Beranda'],
  ['about', 'Tentang Saya'],
  ['skills', 'Keahlian'],
  ['experience', 'Pengalaman'],
  ['education', 'Edukasi'],
  ['portfolio', 'Portofolio'],
  ['contact', 'Kontak'],
];

const skillGroups = [
  {
    title: 'Bahasa Pemrograman',
    skills: [['fa-brands fa-html5', 'HTML5'], ['fa-brands fa-css3-alt', 'CSS3'], ['fa-brands fa-square-js', 'JavaScript (ES6+)'], ['fa-brands fa-java', 'Java & Java FX'], ['fa-solid fa-microchip', 'C / C++ (Embedded/IoT)']],
  },
  {
    title: 'Design & Prototyping',
    skills: [['fa-brands fa-figma', 'Figma'], ['fa-solid fa-mobile-screen', 'UI/UX Responsive Design'], ['fa-brands fa-font-awesome', 'Font Awesome']],
  },
  {
    title: 'Tools, Database & IoT',
    skills: [['fa-brands fa-git-alt', 'Git & GitHub'], ['fa-solid fa-code', 'VS Code'], ['fa-solid fa-database', 'MySQL'], ['fa-solid fa-wifi', 'ESP32-CAM & Sensor IoT']],
  },
];

const projects = [
  ['images/amigo-cake.svg', 'Preview Aplikasi Amigo Cake', 'badge-hybrid', 'Web & Mobile', 'Amigo Cake', 'Aplikasi pemesanan kue digital terintegrasi lintas platform (Web & Mobile). Mempermudah konsumen menjelajahi katalog varian kue, melakukan pemesanan langsung, dan memantau status pesanan secara efisien.', 'https://github.com/daffazub', 'Repositori'],
  ['images/admin-kopi.svg', 'Preview Aplikasi Admin Kopi Vybrasi Affiliate', 'badge-web', 'Web Application', 'Admin Kopi (Vybrasi Affiliate)', 'Dashboard manajemen program afiliasi penjualan produk kopi. Dilengkapi pelacakan performa referral mitra, pencatatan transaksi masuk, kalkulasi komisi otomatis, dan analitik penjualan berbasis web.', 'https://github.com/daffazub', 'Repositori'],
  ['images/esp32-cam.svg', 'Preview Sistem Pengusir Kerumunan Unggas ESP32-CAM', 'badge-iot', 'IoT & Hardware', 'Pengusir Kerumunan Unggas Otomatis', 'Sistem cerdas berbasis mikrokontroler ESP32-CAM untuk mendeteksi kerumunan unggas atau hama secara visual, lalu memicu aktuator pengusir frekuensi suara dan gerak secara otomatis.', 'https://github.com/daffazub', 'Repositori'],
  ['images/Login%20Sistem%20Parkir.jpg', 'Gambar pratinjau Sistem Parkir Berbasis RFID', 'badge-iot', 'Desktop & RFID', 'Sistem Parkir Berbasis RFID', 'Aplikasi otomatisasi pos parkir menggunakan pemindai RFID. Mempercepat verifikasi kartu kendaraan, pembukaan gerbang otomatis, dan kalkulasi biaya parkir.', 'https://github.com/daffazub/Parkiran_RFID.git', 'Kode Sumber'],
  ['images/Perjalanan%20dinas.jpg', 'Gambar pratinjau Sistem Perjalanan Dinas Berbasis RAB dan LPJ', 'badge-web', 'Web Application', 'Sistem Perjalanan Dinas (RAB & LPJ)', 'Aplikasi berbasis web untuk memudahkan siklus administrasi perjalanan dinas, mulai dari pengajuan izin, persetujuan atasan, pengelolaan anggaran, hingga pelaporan keuangan.', 'https://github.com/daffazub/E41240653_Daffa-Zubair-Rabbani_Golongan-A.git', 'Kode Sumber'],
];

export default function HomePage() {
  const [darkTheme, setDarkTheme] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [formStatus, setFormStatus] = useState(null);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkTheme(savedTheme ? savedTheme === 'dark' : prefersDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark-theme', darkTheme);
    document.body.classList.toggle('dark-theme', darkTheme);
    localStorage.setItem('theme', darkTheme ? 'dark' : 'light');
  }, [darkTheme]);

  useEffect(() => {
    const sections = document.querySelectorAll('main section');
    const revealElements = document.querySelectorAll('main section:not(#hero) h2, .about-content, .skill-category, .experience-item, .education-item, .portfolio-item, #contact > p, .contact-info, #contact-form, .social-links');

    revealElements.forEach((element, index) => {
      element.classList.add('reveal');
      element.style.setProperty('--reveal-delay', `${(index % 4) * 90}ms`);
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -40px' });
    revealElements.forEach((element) => revealObserver.observe(element));

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { rootMargin: '-25% 0px -65% 0px' });
    sections.forEach((section) => sectionObserver.observe(section));

    const updateProgress = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
      const progressBar = document.getElementById('scroll-progress-bar');
      if (progressBar) progressBar.style.width = `${Math.min(progress, 100)}%`;
    };
    const cards = document.querySelectorAll('.skill-category, .experience-item, .education-item, .portfolio-item');
    const pointerHandlers = [];
    cards.forEach((card) => {
      const move = (event) => {
        const bounds = card.getBoundingClientRect();
        const x = Math.max(0, Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100));
        const y = Math.max(0, Math.min(100, ((event.clientY - bounds.top) / bounds.height) * 100));
        card.style.setProperty('--pointer-x', `${x}%`);
        card.style.setProperty('--pointer-y', `${y}%`);
      };
      const leave = () => {
        card.style.removeProperty('--pointer-x');
        card.style.removeProperty('--pointer-y');
      };
      card.addEventListener('pointermove', move);
      card.addEventListener('pointerleave', leave);
      pointerHandlers.push([card, move, leave]);
    });

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
      window.removeEventListener('scroll', updateProgress);
      pointerHandlers.forEach(([card, move, leave]) => {
        card.removeEventListener('pointermove', move);
        card.removeEventListener('pointerleave', leave);
      });
    };
  }, []);

  const scrollToSection = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    window.history.replaceState(null, '', `#${id}`);
  };

  const submitForm = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = data.get('name')?.trim();
    const email = data.get('email')?.trim();
    const message = data.get('message')?.trim();
    if (!name || !email || !message) {
      setFormStatus({ type: 'error', text: 'Mohon isi semua bidang yang diperlukan sebelum mengirim.' });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormStatus({ type: 'error', text: 'Format alamat email tidak valid. Silakan periksa kembali.' });
      return;
    }
    setIsSending(true);
    setFormStatus(null);
    window.setTimeout(() => {
      setFormStatus({ type: 'success', text: `Terima kasih banyak, ${name}! Pesan Anda telah berhasil dikirim. Saya akan segera menghubungi Anda melalui ${email}.` });
      setIsSending(false);
      form.reset();
    }, 800);
  };

  return (
    <>
      <a className="skip-link" href="#main-content">Lewati ke konten utama</a>
      <header>
        <div className="scroll-progress" aria-hidden="true"><span id="scroll-progress-bar" /></div>
        <nav>
          <button className="logo" onClick={() => scrollToSection('hero')}>Daffa Zubair Rabbani</button>
          <ul id="nav-menu" className={menuOpen ? 'active' : ''}>
            {navItems.map(([id, label]) => <li key={id}><button className={activeSection === id ? 'active' : ''} onClick={() => scrollToSection(id)}>{label}</button></li>)}
          </ul>
          <div className="nav-actions">
            <button id="theme-toggle" aria-label={darkTheme ? 'Ganti ke Tema Terang' : 'Ganti ke Tema Gelap'} title="Beralih Tema" onClick={() => setDarkTheme((value) => !value)}><i className={`fa-solid ${darkTheme ? 'fa-sun' : 'fa-moon'}`} /></button>
            <button id="menu-toggle" className="menu-toggle" aria-label="Buka Menu Navigasi" aria-expanded={menuOpen} aria-controls="nav-menu" onClick={() => setMenuOpen((value) => !value)}><i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'}`} /></button>
          </div>
        </nav>
      </header>

      <main id="main-content">
        <section id="hero"><div className="hero-content"><h1>Halo, Saya Daffa Zubair Rabbani</h1><p>Seorang Web &amp; IoT Developer yang bersemangat dalam membangun aplikasi web modern, sistem mobile, dan integrasi perangkat cerdas.</p><button className="button" onClick={() => scrollToSection('portfolio')}><i className="fa-solid fa-briefcase" /> Lihat Karya Saya</button></div></section>

        <section id="about" className="container"><h2>Tentang Saya</h2><div className="about-content"><img src="/images/FOTOO%20GES.jpg" alt="Foto Daffa Zubair Rabbani" className="profile-photo" loading="lazy" /><div><p>Lulusan Teknik Komputer Jaringan dari SMK Yadika 13, saya adalah mahasiswa aktif di Politeknik Negeri Jember yang berdedikasi dalam bidang teknologi informasi. Saya memiliki ketertarikan mendalam pada pengembangan perangkat lunak multi-platform (Web &amp; Mobile) serta integrasi perangkat keras berbasis Internet of Things (IoT).</p><p>Selama praktik kerja 4 bulan di BKPSDM Kota Bekasi, saya mengasah kemampuan kolaborasi tim, ketelitian tata kelola data digital, dan komunikasi publik yang responsif. Saya adalah pribadi pembelajar cepat (*fast learner*), gigih menyelesaikan masalah, dan selalu termotivasi menciptakan solusi teknologi yang aplikatif.</p><a href="/files/CV_Daffa_Zubair_Rabbani.pdf" download="CV_Daffa_Zubair_Rabbani.pdf" className="button-small"><i className="fa-solid fa-download" /> Download CV Saya</a></div></div></section>

        <section id="skills" className="container"><h2>Keahlian</h2><div className="skills-grid">{skillGroups.map((group) => <div className="skill-category" key={group.title}><h3>{group.title}</h3><ul>{group.skills.map(([icon, skill]) => <li key={skill}><span className={icon} /> {skill}</li>)}</ul></div>)}</div></section>

        <section id="experience" className="container"><h2>Pengalaman</h2><div className="experience-item"><div className="experience-header"><h3>BKPSDM (Badan Kepegawaian Dan Pengembangan Sumber Daya Manusia) Kota Bekasi</h3><span className="experience-badge">4 Bulan Magang</span></div><p><strong>Praktek Kerja Lapangan (PKL)</strong> | 2022 – 2023 (4 Bulan)</p><ul><li><strong>Pelayanan Tamu &amp; Komunikasi:</strong> Melakukan penerimaan tamu dinas dan memberikan respon informasi yang profesional serta ramah setiap harinya.</li><li><strong>Manajemen Surat Masuk:</strong> Memproses pencatatan, klasifikasi, dan penginputan data surat kedinasan masuk ke sistem registrasi secara teliti.</li><li><strong>Manajemen Surat Keluar:</strong> Bertanggung jawab atas verifikasi data, pencatatan nomor agenda, dan distribusi surat kedinasan keluar.</li><li><strong>Pengolahan Data Digital:</strong> Mengelola rekapitulasi data administrasi kepegawaian ke dalam Microsoft Excel secara akurat dan tepat waktu.</li></ul></div></section>

        <section id="education" className="container"><h2>Edukasi</h2><div className="education-item"><h3>Teknik Informatika</h3><p><strong>Politeknik Negeri Jember</strong> | 2024 - Sekarang</p><p>Fokus studi pada rekayasa perangkat lunak, algoritma, pemrograman multi-paradigma, dan sistem basis data. Berpengalaman dalam kolaborasi proyek tim untuk pembuatan aplikasi berbasis web, mobile, dan sistem pintar.</p></div><div className="education-item"><h3>Teknik Komputer dan Jaringan</h3><p><strong>SMK Yadika 13</strong> | 2021 - 2024</p><p>Mempelajari arsitektur jaringan komputer (LAN/WAN), perakitan &amp; troubleshooting PC, konfigurasi sistem operasi server, dan logika dasar pemrograman.</p></div></section>

        <section id="portfolio" className="container"><h2>Portofolio</h2><p className="section-subtitle">Kombinasi proyek nyata yang mencakup pengembangan web, aplikasi mobile, dan integrasi perangkat cerdas (IoT).</p><div className="portfolio-grid">{projects.map(([image, alt, badgeClass, badge, title, description, href, label]) => <div className="portfolio-item" key={title}><div className="portfolio-img-wrapper"><img src={`/${image}`} alt={alt} loading="lazy" /><span className={`project-badge ${badgeClass}`}>{badge}</span></div><div className="portfolio-content"><h3>{title}</h3><p>{description}</p><div className="buttons-wrapper"><a href={href} target="_blank" rel="noopener noreferrer" className="button-small github-link"><i className="fa-brands fa-github" /> {label}</a></div></div></div>)}</div></section>

        <section id="contact" className="container"><h2>Kontak</h2><p>Tertarik untuk berkolaborasi dalam proyek web, mobile, atau IoT? Jangan ragu untuk menghubungi saya melalui kontak di bawah ini atau kirimkan pesan langsung!</p><div className="contact-info"><p><span className="fa-solid fa-phone" /><a href="tel:+6285282917637">+62 8528-2917-637</a></p><p><span className="fa-solid fa-envelope" /><a href="mailto:daffazubairr@gmail.com">daffazubairr@gmail.com</a></p><p><span className="fa-solid fa-location-dot" /><span>Tambun Selatan, Kabupaten Bekasi, Jawa Barat</span></p></div><form id="contact-form" onSubmit={submitForm} noValidate><div className="form-group"><label htmlFor="name" className="visually-hidden">Nama Lengkap</label><input type="text" name="name" id="name" placeholder="Nama Lengkap Anda" required /></div><div className="form-group"><label htmlFor="email" className="visually-hidden">Email</label><input type="email" name="email" id="email" placeholder="Alamat Email Anda" required /></div><div className="form-group"><label htmlFor="message" className="visually-hidden">Pesan</label><textarea name="message" id="message" rows="5" placeholder="Tuliskan Pesan atau Rencana Proyek Anda di Sini..." required /></div><button type="submit" className="button" disabled={isSending}><i className={`fa-solid ${isSending ? 'fa-circle-notch fa-spin' : 'fa-paper-plane'}`} /> {isSending ? 'Mengirim...' : 'Kirim Pesan'}</button>{formStatus && <div className={`form-status ${formStatus.type}`} role="alert" aria-live="polite">{formStatus.text}</div>}</form></section>
      </main>

      <footer><div className="social-links"><a href="https://www.linkedin.com/in/daffa-zubair-rabbani-659a3b316/" target="_blank" rel="noopener noreferrer" aria-label="Profil LinkedIn"><i className="fa-brands fa-linkedin" /></a><a href="https://github.com/daffazub" target="_blank" rel="noopener noreferrer" aria-label="Profil GitHub"><i className="fa-brands fa-github" /></a><a href="mailto:daffazubairr@gmail.com" aria-label="Kirim Email"><i className="fa-solid fa-envelope" /></a></div><p>&copy; 2025 Daffa Zubair Rabbani. Semua Hak Dilindungi.</p></footer>
    </>
  );
}
