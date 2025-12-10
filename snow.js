const canvas = document.getElementById('snow');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let snowflakes = [];
const snowflakeImage = new Image();
snowflakeImage.src = 'Star.png';

let mouse = {
    x: null,
    y: null
};

function createSnowflakes() {
    const snowflakeCount = 200;
    snowflakes = [];
    for (let i = 0; i < snowflakeCount; i++) {
        snowflakes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 4 + 1,
            angle: Math.random() * Math.PI * 2,
            speed: Math.random() * 0.5 + 0.2,
            originalX: Math.random() * canvas.width,
        });
    }
}

function drawSnowflakes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < snowflakes.length; i++) {
        const snowflake = snowflakes[i];
        ctx.drawImage(snowflakeImage, snowflake.x, snowflake.y, snowflake.radius * 2, snowflake.radius * 2);
    }
}

function updateSnowflakes() {
    for (let i = 0; i < snowflakes.length; i++) {
        const snowflake = snowflakes[i];

        // Interaction logic
        if (mouse.x !== null && mouse.y !== null) {
            let dx = mouse.x - snowflake.x;
            let dy = mouse.y - snowflake.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 50) {
                snowflake.x -= dx / 10;
                snowflake.y -= dy / 10;
            } else {
                // Return to original path
                if (snowflake.x !== snowflake.originalX) {
                    let diffX = snowflake.originalX - snowflake.x;
                    snowflake.x += diffX / 20;
                }
            }
        }

        snowflake.angle += 0.01;
        snowflake.y += Math.pow(snowflake.radius, 0.5) / 2;
        snowflake.x += Math.sin(snowflake.angle) * snowflake.speed;

        if (snowflake.y > canvas.height) {
            snowflake.y = 0;
            snowflake.x = Math.random() * canvas.width;
            snowflake.originalX = snowflake.x;
        }
    }
}

function animate() {
    updateSnowflakes();
    drawSnowflakes();
    requestAnimationFrame(animate);
}

function handleInteraction(event) {
    if (event.touches) {
        mouse.x = event.touches[0].clientX;
        mouse.y = event.touches[0].clientY;
    } else {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    }
}

function handleInteractionEnd() {
    mouse.x = null;
    mouse.y = null;
}

function init() {
    createSnowflakes();
    animate();

    canvas.addEventListener('mousemove', handleInteraction);
    canvas.addEventListener('touchmove', handleInteraction, { passive: true });
    canvas.addEventListener('mouseout', handleInteractionEnd);
    canvas.addEventListener('touchend', handleInteractionEnd);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createSnowflakes();
});

init();
