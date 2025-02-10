"use strict";
const container = document.querySelector('.particles-container');
const colors = [
    '#ffffff', '#ffcc00', '#ff6600', '#66aaff', '#ff0000', '#00ff00', '#0000ff',
    '#ff00ff', '#00ffff', '#ffff00', '#ff8800', '#8800ff', '#00ff88', '#ff0088',
    '#888888', '#4444ff', '#ff4444', '#44ff44', '#ff4488', '#88ff44', '#4488ff',
    '#ff8844', '#8844ff', '#44ff88', '#88ff88', '#ff44ff', '#44ffff', '#ffff88'
];
const numParticles = 100;
class Particle {
    size;
    color;
    speed;
    duration;
    startX;
    startY;
    angle;
    endX;
    endY;
    constructor() {
        this.size = Math.random() * 4 + 2;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speed = Math.random() * 20 + 5;
        this.duration = 10;
        this.startX = Math.random() * 100;
        this.startY = Math.random() * 100;
        this.angle = Math.random() * 360;
        this.endX = this.startX + Math.cos(this.angle * Math.PI / 180) * this.speed;
        this.endY = this.startY + Math.sin(this.angle * Math.PI / 180) * this.speed;
    }
    create() {
        const particleElement = document.createElement('div');
        particleElement.classList.add('particle');
        particleElement.style.width = `${this.size}px`;
        particleElement.style.height = `${this.size}px`;
        particleElement.style.backgroundColor = this.color;
        particleElement.style.left = `${this.startX}vw`;
        particleElement.style.top = `${this.startY}vh`;
        container.appendChild(particleElement);
        this.animate(particleElement);
    }
    animate(particleElement) {
        const randomAngle = Math.random() * 360;
        const randomSpeed = Math.random() * 20 + 5;
        const newEndX = this.startX + Math.cos(randomAngle * Math.PI / 180) * randomSpeed;
        const newEndY = this.startY + Math.sin(randomAngle * Math.PI / 180) * randomSpeed;
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes moveParticle {
                0% { transform: translate(0, 0); opacity: 0; }
                50% { opacity: 1; }
                100% { transform: translate(${newEndX - this.startX}vw, ${newEndY - this.startY}vh); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        particleElement.style.animation = `
            moveParticle ${this.duration}s linear forwards,
            flicker 2s infinite alternate ease-in-out
        `;
        setTimeout(() => {
            particleElement.remove();
        }, this.duration * 10000);
    }
}
function generateParticles() {
    for (let i = 0; i < numParticles; i++) {
        const particle = new Particle();
        particle.create();
    }
}
window.onload = function () {
    generateParticles();
    setInterval(generateParticles, 10000);
};
