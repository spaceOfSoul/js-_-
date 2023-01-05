const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Player {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

class Projectile {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}

class Enemy {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}

const x = canvas.width / 2;
const y = canvas.height / 2;
const speed = 5;

let enemyCount = 500;

const projectiles = [];
const enemies = [];

const player = new Player(x, y, 20, 'purple');

var animationId;

function spawn() {
    setInterval(() => {
        let rx, ry;
        const minSize = 10;
        const radius = Math.random() * (30 - minSize) + minSize;

        if (Math.random() < 0.5) {
            rx = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
            ry = Math.random() * canvas.height;
        } else {
            rx = Math.random() * canvas.width;
            ry = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
        }

        const color = `hsl(${Math.random()*360},50%,50%)`;
        const angle = Math.atan2(canvas.height / 2 - ry, canvas.width / 2 - rx);
        const velocity = {
            x: Math.cos(angle) * 3,
            y: Math.sin(angle) * 3
        }
        enemies.push(new Enemy(rx, ry, radius, color, velocity));
    }, enemyCount);
}

function animation() {
    animationId = requestAnimationFrame(animation);


    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = projectiles.length - 1; i >= 0; i--) {
        const projectile = projectiles[i];
        projectile.update();

        if (projectile.x - projectile.radius < 0 ||
            projectile.x - projectile.radius > canvas.width ||
            projectile.y - projectile.radius < 0 ||
            projectile.y - projectile.radius > canvas.height) {
            projectiles.splice(i, 1);
        }
    }

    for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i];
        enemy.update();
        const playerDist = Math.hypot(player.x - enemy.x, player.y - enemy.y);

        if (playerDist - enemy.radius - player.radius < 1) {
            clearInterval(spawn);
            cancelAnimationFrame(animationId);
        }

        for (let pIndex = projectiles.length - 1; pIndex >= 0; pIndex--) {
            const projectile = projectiles[pIndex];
            const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);

            if (dist - enemy.radius - projectile.radius < 1) {
                projectiles.splice(pIndex, 1);
                enemies.splice(i, 1);
            }
        }
    }
    player.draw();
}

spawn();
animation();

addEventListener('mousedown', (e) => {
    const angle = Math.atan2(e.clientY - y, e.clientX - x);
    const velocity = {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed
    }
    projectiles.push(new Projectile(x, y, 5, 'white', velocity));
});