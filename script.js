const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const card = document.getElementById("card");
const buttons = document.getElementById("buttons");

// Move No button
function moveNoButton() {
    const containerWidth = buttons.offsetWidth;
    const containerHeight = buttons.offsetHeight;

    const x = Math.random() * (containerWidth - noBtn.offsetWidth);
    const y = Math.random() * (containerHeight - noBtn.offsetHeight);

    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
}

noBtn.addEventListener("mouseover", moveNoButton);
noBtn.addEventListener("touchstart", moveNoButton);

// YES CLICK
yesBtn.addEventListener("click", () => {
    // Change card content
    card.innerHTML = `
        <div class="heart">💘</div>
        <p class="success">
        67!! I love you, Shaina Antonette! ❤️<br><br>
        Forever yours,<br>
        Hanz Ezekiel
        </p>
        <canvas id="confettiCanvas"></canvas>
    `;

    startConfetti();
});

// CONFETTI FUNCTION
function startConfetti() {
    const canvas = document.getElementById("confettiCanvas");
    const ctx = canvas.getContext("2d");

    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confetti = [];

    for (let i = 0; i < 120; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 6 + 2,
            d: Math.random() * 40 + 10,
            color: `hsl(${Math.random() * 360}, 100%, 60%)`,
            tilt: Math.random() * 10 - 10
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confetti.forEach(c => {
            ctx.beginPath();
            ctx.fillStyle = c.color;
            ctx.fillRect(c.x, c.y, c.r, c.r);
        });

        update();
        requestAnimationFrame(draw);
    }

    function update() {
        confetti.forEach(c => {
            c.y += Math.cos(c.d) + 2;
            c.x += Math.sin(c.d);

            if (c.y > canvas.height) {
                c.y = -10;
                c.x = Math.random() * canvas.width;
            }
        });
    }

    draw();

    // Stop after 5 seconds
    setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 5000);
}
