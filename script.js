// Matrix rain effect
const canvas = document.getElementById('matrix-rain');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const fontSize = 14;
const columns = canvas.width / fontSize;

const drops = [];
for (let i = 0; i < columns; i++) {
    drops[i] = 1;
}

function drawMatrixRain() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff00';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrixRain, 33);

// Hologram effect
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(200, 200);
document.getElementById('hologram').appendChild(renderer.domElement);

const geometry = new THREE.TorusKnotGeometry(5, 1.5, 100, 16);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

camera.position.z = 20;

function animateHologram() {
    requestAnimationFrame(animateHologram);
    torusKnot.rotation.x += 0.01;
    torusKnot.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animateHologram();


function typeMessage(messages) {
    const messageElement = document.getElementById('message');
    let i = 0;
    let j = 0;
    
    function typeWriter() {
        if (i < messages.length) {
            if (j < messages[i].length) {
                messageElement.innerHTML += messages[i].charAt(j);
                j++;
                setTimeout(typeWriter, 50);
            } else {
                i++;
                j = 0;
                messageElement.innerHTML += '<br>';
                setTimeout(typeWriter, 1000);
            }
        }
    }
    
    messageElement.innerHTML = '';
    typeWriter();
}