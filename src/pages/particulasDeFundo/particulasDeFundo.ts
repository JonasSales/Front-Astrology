const container = document.querySelector('.particles-container') as HTMLElement;
const colors = [
    '#ffffff', '#ffcc00', '#ff6600', '#66aaff', '#ff0000', '#00ff00', '#0000ff',
    '#ff00ff', '#00ffff', '#ffff00', '#ff8800', '#8800ff', '#00ff88', '#ff0088',
    '#888888', '#4444ff', '#ff4444', '#44ff44', '#ff4488', '#88ff44', '#4488ff',
    '#ff8844', '#8844ff', '#44ff88', '#88ff88', '#ff44ff', '#44ffff', '#ffff88'
];

const numParticles = 70; // Quantidade de partículas criadas por ciclo

class Particle {
    size: number;
    color: string;
    speed: number;
    duration: number;
    startX: number;
    startY: number;
    angle: number;
    endX: number;
    endY: number;

    constructor() {
        this.size = Math.random() * 4 + 2; // Tamanho aleatório (2px a 6px)
        this.color = colors[Math.floor(Math.random() * colors.length)]; // Cor aleatória
        this.speed = Math.random() * 20 + 5; // Velocidade (5 a 20vw/vh)
        this.duration = 10; 
        this.startX = Math.random() * 100; // Posição X inicial
        this.startY = Math.random() * 100; // Posição Y inicial
        this.angle = Math.random() * 360; // Ângulo aleatório
        this.endX = this.startX + Math.cos(this.angle * Math.PI / 180) * this.speed; // Posição final X
        this.endY = this.startY + Math.sin(this.angle * Math.PI / 180) * this.speed; // Posição final Y
    }

    // Método para criar e animar a partícula
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

    // Método para animar a partícula
    animate(particleElement: HTMLElement) {
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

        // Remove partícula após a animação para evitar sobrecarga de memória
        setTimeout(() => {
            particleElement.remove();
        }, this.duration * 1);
    }
}

// Função para gerar partículas
function generateParticles() {
    for (let i = 0; i < numParticles; i++) {
        const particle = new Particle();
        particle.create();
    }
}

// Gerar partículas assim que a página for carregada
window.onload = function() {
    generateParticles(); // Gera partículas assim que o usuário entra
    setInterval(generateParticles, 10000); // A partir disso, as partículas são geradas a cada 10000ms
}
