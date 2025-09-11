const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 50; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });
  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ===== NAVBAR =====
const links = document.querySelectorAll('.nav-links a[href^="#"]');
const sections = [...links].map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

links.forEach(a => {
  a.addEventListener('click', () => {
    links.forEach(l => l.classList.remove('active'));
    a.classList.add('active');
  });
});

const obs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = `#${entry.target.id}`;
    const link = document.querySelector(`.nav-links a[href="${id}"]`);
    if (!link) return;
    if (entry.isIntersecting) {
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}, {
  root: null,
  rootMargin: '0px 0px -40% 0px', 
  threshold: 0.6
});

sections.forEach(sec => obs.observe(sec));

// ===== LOGO HOVER EFFECT =====
const logo = document.querySelector('.logo');

logo.addEventListener('mouseover', () => {
  logo.style.background = "linear-gradient(90deg, #ff1a1a, white, #ff1a1a)";
  logo.style.backgroundSize = "200% auto";
  logo.style.color = "transparent";
  logo.style.webkitBackgroundClip = "text";
  logo.style.backgroundClip = "text";
  logo.style.transition = "background-position 0.5s ease";
  logo.style.backgroundPosition = "right center";
});

logo.addEventListener('mouseout', () => {
  logo.style.background = "none";
  logo.style.color = "#ff1a1a";
});

const btnDownload = document.querySelector('#curriculo .btn');

btnDownload.addEventListener('click', function(e) {
    e.preventDefault();

    fetch('assets/curriculo.pdf')
        .then(resp => resp.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'curriculo.pdf';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        })
        .catch(() => alert('Erro ao baixar o arquivo. Verifique o caminho.'));
});

// ===== MENU MOBILE =====
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});
