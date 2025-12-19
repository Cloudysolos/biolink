document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('click-anywhere');
    const card = document.querySelector('.biolink-card');
    const audio = document.getElementById('bg-music');
    const bioText = document.getElementById('bio-text');
    const greetingEl = document.getElementById('greeting');
    
    // --- Configuration ---
    const bioPhrases = [
        "Python / LUA Coder.",
        "IDA.",
        "Vocal Engineer",
        "uid: 1"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    // --- Click to Enter ---
    overlay.addEventListener('click', () => {
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none'; // Ensure it's not clickable
        
        // Show card with delay
        setTimeout(() => {
            card.classList.add('active');
            typeWriter(); // Start typing effect
            setGreeting();
        }, 500);

        // Play Audio
        if(audio) {
            audio.volume = 0.3;
            audio.play().catch(e => console.log("Audio autoplay prevented", e));
        }
    });

    // --- Typewriter Effect ---
    function typeWriter() {
        const currentPhrase = bioPhrases[phraseIndex];
        
        if (isDeleting) {
            bioText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            bioText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % bioPhrases.length;
            typeSpeed = 500; // Pause before new word
        }

        setTimeout(typeWriter, typeSpeed);
    }

    function setGreeting() {
        const h = new Date().getHours();
        let g = 'Hello';
        if (h < 5) g = 'Good night';
        else if (h < 12) g = 'Good morning';
        else if (h < 17) g = 'Good afternoon';
        else if (h < 22) g = 'Good evening';
        else g = 'Good night';
        if (greetingEl) greetingEl.textContent = `${g}, Cloudy`;
    }
    setGreeting();
    setInterval(setGreeting, 60 * 60 * 1000);
    // --- Discord Copy ---
    const discordBtns = [document.getElementById('discord-btn'), document.getElementById('discord-footer-btn')];
    
    discordBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                const username = "neumanntlm103";
                navigator.clipboard.writeText(username).then(() => {
                    showNotification(`Copied: ${username}`);
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                    showNotification('Failed to copy');
                });
            });
        }
    });

    // --- Notification System ---
    function showNotification(message) {
        const container = document.getElementById('notification-container');
        const notif = document.createElement('div');
        notif.className = 'notification';
        notif.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
        
        container.appendChild(notif);

        // Trigger animation
        setTimeout(() => notif.classList.add('show'), 10);

        // Remove after 3s
        setTimeout(() => {
            notif.classList.remove('show');
            setTimeout(() => notif.remove(), 300);
        }, 3000);
    }

    // --- Title Scroller ---
    let titleText = " Cloudy @ biolink ";
    function scrollTitle() {
        titleText = titleText.substring(1) + titleText.substring(0, 1);
        document.title = titleText;
        setTimeout(scrollTitle, 250);
    }
    scrollTitle();

    // --- Starfield Background ---
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let stars = [];

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        initStars();
    }

    function initStars() {
        stars = [];
        const starCount = Math.floor((width * height) / 10000); // Sparse stars
        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 1.2,
                speed: Math.random() * 0.2 + 0.05,
                opacity: Math.random()
            });
        }
    }

    function drawStars() {
        ctx.fillStyle = '#050505'; // Clear with bg color
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = '#ffffff';
        stars.forEach(star => {
            ctx.globalAlpha = star.opacity;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();

            // Move star
            star.y -= star.speed;
            if (star.y < 0) {
                star.y = height;
                star.x = Math.random() * width;
            }
        });
        
        requestAnimationFrame(drawStars);
    }

    window.addEventListener('resize', resize);
    resize();
    drawStars();
});

