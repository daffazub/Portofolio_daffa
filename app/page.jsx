'use client';

import { useEffect, useRef, useState } from 'react';

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
    index: '01',
    title: 'Bahasa Pemrograman',
    icon: 'fa-code',
    skills: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'Java & JavaFX', 'C / C++ Embedded'],
  },
  {
    index: '02',
    title: 'Design & Prototyping',
    icon: 'fa-pen-ruler',
    skills: ['Figma', 'UI/UX Responsive Design', 'Design System', 'Font Awesome'],
  },
  {
    index: '03',
    title: 'Tools, Database & IoT',
    icon: 'fa-microchip',
    skills: ['Git & GitHub', 'VS Code', 'MySQL', 'ESP32-CAM & Sensor IoT'],
  },
];

// PLACEHOLDER DATA: ganti URL repositori dengan link proyek asli bila tersedia.
const projects = [
  {
    image: '/images/amigo-cake.svg',
    alt: 'Preview aplikasi Amigo Cake',
    category: 'WEB',
    title: 'Amigo Cake',
    description: 'Aplikasi pemesanan kue lintas platform yang membantu konsumen menjelajahi katalog, memesan, dan memantau status pesanan.',
    href: 'https://github.com/daffazub',
  },
  {
    image: '/images/admin-kopi.svg',
    alt: 'Preview dashboard Admin Kopi Vybrasi Affiliate',
    category: 'WEB',
    title: 'Admin Kopi / Vybrasi Affiliate',
    description: 'Dashboard afiliasi untuk melacak referral, transaksi, komisi otomatis, dan performa penjualan secara terpusat.',
    href: 'https://github.com/daffazub',
  },
  {
    image: '/images/esp32-cam.svg',
    alt: 'Preview sistem pengusir kerumunan unggas berbasis ESP32-CAM',
    category: 'IOT',
    title: 'Pengusir Kerumunan Unggas Otomatis',
    description: 'Sistem cerdas berbasis ESP32-CAM yang mendeteksi kerumunan secara visual lalu memicu aktuator pengusir otomatis.',
    href: 'https://github.com/daffazub',
  },
  {
    image: '/images/Login%20Sistem%20Parkir.jpg',
    alt: 'Preview sistem parkir berbasis RFID',
    category: 'IOT',
    title: 'Sistem Parkir Berbasis RFID',
    description: 'Otomatisasi pos parkir untuk mempercepat verifikasi kartu, membuka gerbang, dan menghitung biaya parkir.',
    href: 'https://github.com/daffazub/Parkiran_RFID.git',
  },
  {
    image: '/images/Perjalanan%20dinas.jpg',
    alt: 'Preview sistem perjalanan dinas RAB dan LPJ',
    category: 'WEB',
    title: 'Sistem Perjalanan Dinas - RAB & LPJ',
    description: 'Aplikasi administrasi untuk mengelola pengajuan, persetujuan, anggaran, hingga pelaporan perjalanan dinas.',
    href: 'https://github.com/daffazub/E41240653_Daffa-Zubair-Rabbani_Golongan-A.git',
  },
];

function ArrowIcon() {
  return <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />;
}

export default function HomePage() {
  const [darkTheme, setDarkTheme] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [formStatus, setFormStatus] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkTheme(savedTheme ? savedTheme === 'dark' : prefersDark);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = darkTheme ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark-theme', darkTheme);
    window.localStorage.setItem('theme', darkTheme ? 'dark' : 'light');
  }, [darkTheme]);

  useEffect(() => {
    const sections = document.querySelectorAll('main section');
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -48px' });
    revealElements.forEach((element) => revealObserver.observe(element));

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    sections.forEach((section) => sectionObserver.observe(section));

    const updateProgress = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
      document.documentElement.style.setProperty('--scroll-progress', `${Math.min(progress, 100)}%`);
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
      window.removeEventListener('scroll', updateProgress);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    const closeOnOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setMenuOpen(false);
    };
    document.addEventListener('keydown', closeOnEscape);
    document.addEventListener('pointerdown', closeOnOutsideClick);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('pointerdown', closeOnOutsideClick);
    };
  }, [menuOpen]);

  const scrollToSection = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const submitForm = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = data.get('name')?.trim();
    const email = data.get('email')?.trim();
    const message = data.get('message')?.trim();
    if (!name || !email || !message) {
      setFormStatus({ type: 'error', text: 'Mohon isi semua bidang yang diperlukan.' });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormStatus({ type: 'error', text: 'Format email belum valid. Silakan periksa kembali.' });
      return;
    }
    setIsSending(true);
    setFormStatus(null);
    window.setTimeout(() => {
      setFormStatus({ type: 'success', text: `Terima kasih, ${name}. Pesan Anda berhasil disimulasikan dan akan ditindaklanjuti melalui ${email}.` });
      setIsSending(false);
      form.reset();
    }, 800);
  };

  return (
    <>
      <a className="skip-link" href="#main-content">Lewati ke konten utama</a>
      <header className="site-header">
        <div className="header-inner" ref={menuRef}>
          <button className="logo" onClick={() => scrollToSection('hero')} aria-label="Kembali ke Beranda"><span>DQ</span><strong>Daffa<span className="logo-dot">.</span></strong></button>
          <nav aria-label="Navigasi utama">
            <ul id="main-navigation" className={menuOpen ? 'nav-list is-open' : 'nav-list'}>
              {navItems.map(([id, label]) => <li key={id}><button className={activeSection === id ? 'nav-link active' : 'nav-link'} onClick={() => scrollToSection(id)}>{label}</button></li>)}
            </ul>
          </nav>
          <div className="header-actions">
            <button className="icon-button" aria-label={darkTheme ? 'Aktifkan tema terang' : 'Aktifkan tema gelap'} title="Ganti tema" onClick={() => setDarkTheme((value) => !value)}><i className={darkTheme ? 'fa-solid fa-sun' : 'fa-solid fa-moon'} aria-hidden="true" /></button>
            <button className="icon-button menu-button" aria-label={menuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen((value) => !value)}><i className={menuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'} aria-hidden="true" /></button>
          </div>
        </div>
        <div className="scroll-progress" aria-hidden="true"><span /></div>
      </header>

      <main id="main-content">
        <section id="hero" className="hero-section">
          <div className="hero-grid" aria-hidden="true" />
          <div className="container hero-content">
            <p className="eyebrow"><span className="status-dot" /> Web & IoT Developer <span className="mono">/ 2025</span></p>
            <h1>Membangun <em>solusi digital</em><br />yang terasa nyata.</h1>
            <p className="hero-summary">Saya Daffa Zubair Rabbani. Mengubah ide menjadi pengalaman web, aplikasi, dan perangkat cerdas yang berguna.</p>
            <div className="hero-actions">
              <button className="button button-primary" onClick={() => scrollToSection('portfolio')}>Lihat karya <ArrowIcon /></button>
              <button className="button button-ghost" onClick={() => scrollToSection('contact')}>Mari terhubung <i className="fa-solid fa-arrow-down" aria-hidden="true" /></button>
            </div>
            <div className="hero-meta"><span>Berbasis di Bekasi, Indonesia</span><span className="meta-line" /><span className="mono">Available for collaboration</span></div>
          </div>
        </section>

        <section id="about" className="section section-sunken">
          <div className="container about-layout">
            <div className="section-heading reveal"><p className="eyebrow">01 / Tentang Saya</p><h2>Teknologi yang<br /><em>punya tujuan.</em></h2></div>
            <div className="about-content reveal">
              {/* PLACEHOLDER: ganti foto profil pada public/images/FOTOO GES.jpg bila diperlukan. */}
              <img src="/images/FOTOO%20GES.jpg" alt="Foto Daffa Zubair Rabbani" className="profile-photo" loading="lazy" />
              <div className="about-copy"><p className="lead">Lulusan Teknik Komputer Jaringan dan mahasiswa Teknik Informatika yang senang berada di antara dunia software dan hardware.</p><p>Saya mengeksplorasi pengembangan web, aplikasi mobile, dan Internet of Things untuk membuat solusi yang aplikatif. Pengalaman PKL di BKPSDM Kota Bekasi membentuk cara kerja yang teliti, kolaboratif, dan responsif terhadap kebutuhan pengguna.</p><a className="text-link" href="/files/CV_Daffa_Zubair_Rabbani.pdf" download="CV_Daffa_Zubair_Rabbani.pdf">Download CV <i className="fa-solid fa-arrow-down" aria-hidden="true" /></a></div>
            </div>
          </div>
        </section>

        <section id="skills" className="section">
          <div className="container"><div className="section-heading centered reveal"><p className="eyebrow">02 / Keahlian</p><h2>Alat yang saya<br /><em>gunakan setiap hari.</em></h2></div><div className="skills-grid">{skillGroups.map((group) => <article className="skill-card reveal" key={group.title}><div className="card-topline"><span className="mono">{group.index}</span><i className={`fa-solid ${group.icon}`} aria-hidden="true" /></div><h3>{group.title}</h3><ul>{group.skills.map((skill) => <li key={skill}><span className="list-dot" />{skill}</li>)}</ul></article>)}</div></div>
        </section>

        <section id="experience" className="section section-sunken"><div className="container narrow"><div className="section-heading centered reveal"><p className="eyebrow">03 / Pengalaman</p><h2>Belajar dari<br /><em>lapangan.</em></h2></div><article className="timeline-card reveal"><div className="timeline-marker"><span /></div><div className="timeline-main"><div className="card-topline"><span className="mono">2022 - 2023</span><span className="pill">4 BULAN MAGANG</span></div><h3>BKPSDM Kota Bekasi</h3><p className="role">Praktek Kerja Lapangan</p><p>Menangani pelayanan tamu, manajemen surat masuk dan keluar, serta pengolahan data administrasi kepegawaian secara akurat menggunakan Microsoft Excel.</p></div></article></div></section>

        <section id="education" className="section"><div className="container"><div className="section-heading reveal"><p className="eyebrow">04 / Edukasi</p><h2>Fondasi untuk<br /><em>terus bertumbuh.</em></h2></div><div className="education-list"><article className="education-item reveal"><span className="mono">01</span><div><h3>Teknik Informatika</h3><p>Politeknik Negeri Jember</p><small>2024 - Sekarang <span>/</span> Rekayasa perangkat lunak, algoritma, basis data</small></div></article><article className="education-item reveal"><span className="mono">02</span><div><h3>Teknik Komputer dan Jaringan</h3><p>SMK Yadika 13</p><small>2021 - 2024 <span>/</span> Jaringan komputer, server, dan troubleshooting</small></div></article></div></div></section>

        <section id="portfolio" className="section section-sunken"><div className="container"><div className="section-heading portfolio-heading reveal"><div><p className="eyebrow">05 / Portofolio</p><h2>Beberapa hal yang<br /><em>pernah saya bangun.</em></h2></div><p className="section-note">Proyek nyata, eksperimen, dan sistem yang dirancang untuk memecahkan masalah.</p></div><div className="projects-grid">{projects.map((project, index) => <article className="project-card reveal" key={project.title}><div className="project-image"><img src={project.image} alt={project.alt} loading="lazy" /><span className="project-index mono">0{index + 1}</span><span className="project-category">{project.category}</span></div><div className="project-body"><h3>{project.title}</h3><p>{project.description}</p><a className="project-link" href={project.href} target="_blank" rel="noopener noreferrer">Lihat repositori <ArrowIcon /></a></div></article>)}</div></div></section>

        <section id="contact" className="section contact-section"><div className="container contact-layout"><div className="section-heading reveal"><p className="eyebrow">06 / Kontak</p><h2>Mari buat sesuatu<br /><em>yang berarti.</em></h2><p className="contact-intro">Punya ide, proyek, atau sekadar ingin bertukar pikiran? Saya terbuka untuk mendengar dan berkolaborasi.</p><div className="contact-details"><a href="mailto:daffazubairr@gmail.com"><i className="fa-solid fa-envelope" aria-hidden="true" /> daffazubairr@gmail.com</a><a href="tel:+6285282917637"><i className="fa-solid fa-phone" aria-hidden="true" /> +62 8528-2917-637</a><span><i className="fa-solid fa-location-dot" aria-hidden="true" /> Tambun Selatan, Bekasi</span></div></div><form className="contact-form reveal" onSubmit={submitForm} noValidate><div className="form-header"><span className="mono">DROP A LINE</span><span className="form-status-dot" /></div><div className="form-group"><label htmlFor="name">Nama lengkap</label><input type="text" name="name" id="name" placeholder="Nama Anda" required /></div><div className="form-group"><label htmlFor="email">Alamat email</label><input type="email" name="email" id="email" placeholder="nama@email.com" required /></div><div className="form-group"><label htmlFor="message">Pesan</label><textarea name="message" id="message" rows="4" placeholder="Ceritakan sedikit tentang rencana Anda..." required /></div><button type="submit" className="button button-primary form-submit" disabled={isSending}>{isSending ? 'Mengirim...' : 'Kirim pesan'} <i className={isSending ? 'fa-solid fa-circle-notch fa-spin' : 'fa-solid fa-arrow-up-right-from-square'} aria-hidden="true" /></button>{formStatus && <div className={`form-status ${formStatus.type}`} role="alert" aria-live="polite">{formStatus.text}</div>}</form></div></section>
      </main>

      <footer className="site-footer"><div className="container footer-inner"><div><button className="logo footer-logo" onClick={() => scrollToSection('hero')}><span>DQ</span><strong>Daffa<span className="logo-dot">.</span></strong></button><p>Web & IoT Developer</p></div><div className="footer-links"><a href="https://www.linkedin.com/in/daffa-zubair-rabbani-659a3b316/" target="_blank" rel="noopener noreferrer">LinkedIn <ArrowIcon /></a><a href="https://github.com/daffazub" target="_blank" rel="noopener noreferrer">GitHub <ArrowIcon /></a><a href="mailto:daffazubairr@gmail.com">Email <ArrowIcon /></a></div><p className="copyright">(c) {new Date().getFullYear()} Daffa Zubair Rabbani</p></div></footer>
    </>
  );
}
