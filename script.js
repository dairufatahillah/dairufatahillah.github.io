document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const navHeight = header.offsetHeight;
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section'); // Asumsi semua target adalah <section> atau footer

    // 1. Fungsi Smooth Scroll saat Link Navigasi diklik
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const targetPosition = targetSection.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Tutup menu mobile jika terbuka
                const navList = document.getElementById('navLinks');
                const hamburger = document.getElementById('hamburger');
                if (navList.classList.contains('active')) {
                    navList.classList.remove('active');
                    hamburger.classList.remove('toggle');
                }
            }
        });
    });

    // 2. Fungsi Menandai Link Aktif saat di-Scroll (ScrollSpy Sederhana)
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset + navHeight + 50; // +50px untuk offset toleransi

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        // Khusus untuk footer kontak jika paling bawah
        const footer = document.getElementById('kontak');
        if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 10) {
             current = 'kontak';
        }


        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 3. Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navList = document.getElementById('navLinks');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navList.classList.toggle('active');
            hamburger.classList.toggle('toggle');
        });
    }
});