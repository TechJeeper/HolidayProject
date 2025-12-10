const canvas = document.getElementById('snow');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let snowflakes = [];

function createSnowflakes() {
    const snowflakeCount = 200;
    for (let i = 0; i < snowflakeCount; i++) {
        snowflakes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 4 + 1,
            density: Math.random() * snowflakeCount
        });
    }
}

function drawSnowflakes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.beginPath();
    for (let i = 0; i < snowflakes.length; i++) {
        const snowflake = snowflakes[i];
        ctx.moveTo(snowflake.x, snowflake.y);
        ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2, true);
    }
    ctx.fill();
    updateSnowflakes();
}

let angle = 0;
function updateSnowflakes() {
    angle += 0.01;
    for (let i = 0; i < snowflakes.length; i++) {
        const snowflake = snowflakes[i];
        snowflake.y += Math.pow(snowflake.radius, 0.5) / 2;
        snowflake.x += Math.sin(angle) * 2;

        if (snowflake.y > canvas.height) {
            snowflakes[i] = {
                x: Math.random() * canvas.width,
                y: 0,
                radius: snowflake.radius,
                density: snowflake.density
            };
        }
    }
}

function init() {
    createSnowflakes();
    setInterval(drawSnowflakes, 30);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    snowflakes = [];
    createSnowflakes();
});

init();