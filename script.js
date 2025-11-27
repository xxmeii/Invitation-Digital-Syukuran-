document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------
       🎵 AUTOPLAY MUSIC (tanpa tombol)
    ---------------------------------------- */
    const bgMusic = document.getElementById("bg-music");
    bgMusic.volume = 0.7;

    let musicStarted = false;

    function startMusic() {
        if (!musicStarted) {
            bgMusic.play().catch(() => {});
            musicStarted = true;
        }
    }

    // Musik mulai saat user scroll / tap / klik sedikit
    document.addEventListener("scroll", startMusic);
    document.addEventListener("touchstart", startMusic);
    document.addEventListener("click", startMusic);



    /* ----------------------------------------
       SCRIPT ASLI KAMU MULAI DARI SINI
    ---------------------------------------- */

    const gate = document.getElementById('gate');
    const mainContent = document.getElementById('mainContent');
    const openButton = document.getElementById('openInvitationButton');
    const sections = document.querySelectorAll('.page-section');

    const firstSection = document.getElementById('section-in-memoriam'); 

    const targetDate = new Date("Nov 30, 2025 12:00:00").getTime(); 

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const formatNumber = (num) => String(num).padStart(2, '0');

        if (document.getElementById("days")) { 
            document.getElementById("days").innerHTML = formatNumber(days);
            document.getElementById("hours").innerHTML = formatNumber(hours);
            document.getElementById("minutes").innerHTML = formatNumber(minutes);
            document.getElementById("seconds").innerHTML = formatNumber(seconds);
        }

        if (distance < 0) {
            clearInterval(countdownInterval);
            const countdownElement = document.getElementById("countdown");
            if (countdownElement) {
                countdownElement.innerHTML = "<p class='text-2xl text-gray-700 font-bold'>ACARA SEDANG BERLANGSUNG!</p>";
            }
        }
    }

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown(); 

    function openInvitation() {
        openButton.disabled = true;

        gate.style.transition = 'opacity 0.7s ease-out';
        gate.style.opacity = '0';

        mainContent.classList.remove('opacity-0', 'pointer-events-none');
        mainContent.classList.add('opacity-100');

        setTimeout(() => {
            gate.style.height = '0'; 
            gate.style.overflow = 'hidden'; 
            firstSection.scrollIntoView({ behavior: 'smooth' });
            sections.forEach(section => observer.observe(section));
        }, 700);
    }

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            const content = entry.target.querySelector('.section-content');
            if (!content) return;

            if (entry.isIntersecting) {
                content.classList.add('opacity-100');
                content.classList.remove('opacity-0');
            } else {
                content.classList.remove('opacity-100');
                content.classList.add('opacity-0');
            }
        });
    }, {
        threshold: 0.5,
        root: mainContent 
    });

    openButton.addEventListener('click', openInvitation);
    openButton.addEventListener('touchstart', (e) => {
        e.preventDefault();
        openInvitation();
    });

});
