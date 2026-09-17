// JS/SCRIPT.JS

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Logika Beralih Tema (Dark/Light Mode) ---
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
    const rootHtml = document.documentElement;
    const body = document.body;

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            rootHtml.classList.add('dark-theme');
            body.classList.add('dark-theme');
            if (themeIcon) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
            if (themeToggle) {
                themeToggle.setAttribute('aria-label', 'Ganti ke Tema Terang');
                themeToggle.setAttribute('title', 'Beralih ke Tema Terang');
            }
        } else {
            rootHtml.classList.remove('dark-theme');
            body.classList.remove('dark-theme');
            if (themeIcon) {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
            if (themeToggle) {
                themeToggle.setAttribute('aria-label', 'Ganti ke Tema Gelap');
                themeToggle.setAttribute('title', 'Beralih ke Tema Gelap');
            }
        }
    };

    // Ambil preferensi dari localStorage atau preferensi sistem operasi
    const savedTheme = localStorage.getItem('theme') || 
        (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = body.classList.contains('dark-theme') || rootHtml.classList.contains('dark-theme');
            const newTheme = isDark ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // --- 2. Menu Navigasi Mobile (Hamburger Toggle) ---
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const menuIcon = menuToggle ? menuToggle.querySelector('i') : null;

    const closeMobileMenu = () => {
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (menuToggle) {
                menuToggle.setAttribute('aria-expanded', 'false');
            }
            if (menuIcon) {
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
            }
        }
    };

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            const willExpand = !isExpanded;
            
            menuToggle.setAttribute('aria-expanded', willExpand);
            navMenu.classList.toggle('active', willExpand);

            if (menuIcon) {
                if (willExpand) {
                    menuIcon.classList.remove('fa-bars');
                    menuIcon.classList.add('fa-xmark');
                } else {
                    menuIcon.classList.remove('fa-xmark');
                    menuIcon.classList.add('fa-bars');
                }
            }
        });

        // Tutup menu jika klik di luar area navigasi
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                closeMobileMenu();
            }
        });

        // Tutup menu jika pengguna menekan tombol ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeMobileMenu();
            }
        });
    }

    // --- 3. Smooth Scroll dengan Kompensasi Offset Header ---
    const internalAnchorLinks = document.querySelectorAll('a[href^="#"]');
    
    internalAnchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                closeMobileMenu();

                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 70;
                
                // Jika target adalah hero, scroll ke paling atas
                if (targetId === '#hero') {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                } else {
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }

                // Update hash URL tanpa lonjakan instan
                if (window.history && window.history.pushState) {
                    window.history.pushState(null, '', targetId);
                }
            }
        });
    });

    // --- 4. Indikator Navigasi Aktif Saat Scroll ---
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('#nav-menu li a[href^="#"]');

    const updateActiveNav = () => {
        const scrollY = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Cek jika sudah berada di dasar halaman (untuk bagian Kontak & Footer)
        if (scrollY + windowHeight >= documentHeight - 60) {
            navLinks.forEach(link => link.classList.remove('active'));
            const contactLink = document.querySelector('#nav-menu li a[href="#contact"]');
            if (contactLink) contactLink.classList.add('active');
            return;
        }

        const header = document.querySelector('header');
        const headerOffset = header ? header.offsetHeight + 30 : 100;

        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerOffset;
            const sectionHeight = section.offsetHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // Default ke 'hero' saat berada di bagian paling atas
        if (!currentSectionId && scrollY < 200) {
            currentSectionId = 'hero';
        }

        if (currentSectionId) {
            navLinks.forEach(link => {
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    };

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav(); // Panggil sekali saat load

    // --- 5. Progress Scroll ---
    const scrollProgressBar = document.getElementById('scroll-progress-bar');

    const updateScrollProgress = () => {
        if (!scrollProgressBar) return;

        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
        scrollProgressBar.style.width = `${Math.min(progress, 100)}%`;
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress);
    updateScrollProgress();

    // --- 6. Animasi Elemen Saat Masuk Viewport ---
    const revealElements = document.querySelectorAll(
        'main section:not(#hero) h2, .about-content, .skill-category, .experience-item, .education-item, .portfolio-item, #contact > p, .contact-info, #contact-form, .social-links'
    );

    revealElements.forEach((element, index) => {
        element.classList.add('reveal');
        element.style.setProperty('--reveal-delay', `${(index % 4) * 90}ms`);
    });

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.14, rootMargin: '0px 0px -40px' });

        revealElements.forEach((element) => revealObserver.observe(element));
    } else {
        revealElements.forEach((element) => element.classList.add('is-visible'));
    }

    // --- 7. Highlight Card Mengikuti Kursor ---
    const interactiveCards = document.querySelectorAll('.skill-category, .experience-item, .education-item, .portfolio-item');

    interactiveCards.forEach((card) => {
        card.addEventListener('pointermove', (event) => {
            const bounds = card.getBoundingClientRect();
            const x = Math.max(0, Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100));
            const y = Math.max(0, Math.min(100, ((event.clientY - bounds.top) / bounds.height) * 100));

            card.style.setProperty('--pointer-x', `${x}%`);
            card.style.setProperty('--pointer-y', `${y}%`);
        });

        card.addEventListener('pointerleave', () => {
            card.style.removeProperty('--pointer-x');
            card.style.removeProperty('--pointer-y');
        });
    });

    // --- 8. Penanganan Form Kontak & Validasi ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    const showStatus = (message, type) => {
        if (formStatus) {
            formStatus.textContent = message;
            formStatus.className = `form-status ${type}`;
            formStatus.style.display = 'block';

            // Sembunyikan pesan sukses setelah 6 detik
            if (type === 'success') {
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 6000);
            }
        } else {
            alert(message);
        }
    };

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const nameInput = this.querySelector('input[name="name"]');
            const emailInput = this.querySelector('input[name="email"]');
            const messageInput = this.querySelector('textarea[name="message"]');

            const name = nameInput ? nameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const message = messageInput ? messageInput.value.trim() : '';

            // Validasi kelengkapan bidang
            if (!name || !email || !message) {
                showStatus('Mohon isi semua bidang yang diperlukan sebelum mengirim.', 'error');
                return;
            }

            // Validasi format email regex standar RFC 5322 sederhana
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showStatus('Format alamat email tidak valid. Silakan periksa kembali.', 'error');
                return;
            }

            // Tombol loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Mengirim...';
            }

            // Simulasi proses pengiriman pesan
            setTimeout(() => {
                showStatus(`Terima kasih banyak, ${name}! Pesan Anda telah berhasil dikirim. Saya akan segera menghubungi Anda melalui ${email}.`, 'success');
                contactForm.reset();

                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                }
            }, 800);
        });
    }

    // --- 9. Mencegah Munculnya Kursor Ketik / Seleksi Teks Saat Teks Diklik ---
    document.addEventListener('selectstart', (e) => {
        // Izinkan seleksi teks hanya di dalam bidang formulir input & textarea
        if (!e.target.closest('input, textarea')) {
            e.preventDefault();
        }
    });

    document.addEventListener('mousedown', (e) => {
        // Hapus range seleksi agar tidak ada kursor sisipan (caret) yang menempel pada teks biasa
        if (!e.target.closest('input, textarea')) {
            if (window.getSelection) {
                window.getSelection().removeAllRanges();
            }
        }
    });

});