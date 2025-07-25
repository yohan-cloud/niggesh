function openEnvelope() {
    document.querySelector('.envelope-container').classList.add('hide-envelope');
    const letterWrapper = document.querySelector('.letter-wrapper');
    letterWrapper.classList.add('show-letter');
    const song = document.getElementById('song');
    if (song) song.play().catch(() => console.log("Autoplay blocked"));
    startHearts();
    startConfetti();
    setTimeout(stopConfetti, 5000);
}

document.addEventListener('click', () => {
    const song = document.getElementById('song');
    if (song.paused) song.play();
});

function startHearts() {
    const heartContainer = document.getElementById('floating-hearts');
    const heartEmojis = ['❤️','💖','💕','💗','💞','💓'];

    setInterval(() => {
        const heart = document.createElement('span');
        heart.classList.add('floating-heart');
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * window.innerWidth + 'px';
        heart.style.bottom = '0px';
        heart.style.fontSize = (Math.random() * 15 + 20) + 'px';
        heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
        heartContainer.appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
    }, 300);
}

let confetti;
function startConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = Array.from({ length: 150 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 8 + 4,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        speed: Math.random() * 3 + 2,
        tilt: Math.random() * 10,
    }));

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pieces.forEach(p => {
            ctx.beginPath();
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x, p.y, p.size, p.size / 2);
        });
    }

    function update() {
        pieces.forEach(p => {
            p.y += p.speed;
            p.x += Math.sin(p.tilt);
            if (p.y > canvas.height) {
                p.y = -10;
                p.x = Math.random() * canvas.width;
            }
        });
    }

    function loop() {
        draw();
        update();
        confetti = requestAnimationFrame(loop);
    }
    loop();
}

function stopConfetti() {
    cancelAnimationFrame(confetti);
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
