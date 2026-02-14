/* NAV SCROLL */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
});

/* NEURAL CANVAS */
(function() {
  const canvas = document.getElementById('neural-bg');
  const ctx = canvas.getContext('2d');
  let W, H, nodes = [];
  let mouseX = 0, mouseY = 0;

  function resize() { 
    W = canvas.width = window.innerWidth; 
    H = canvas.height = window.innerHeight; 
  }

  class Node {
    constructor() { 
      this.reset(); 
    }
    
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.38;
      this.vy = (Math.random() - 0.5) * 0.38;
      this.r = Math.random() * 1.6 + 0.4;
      this.a = Math.random() * 0.55 + 0.2;
    }
    
    update() {
      this.x += this.vx; 
      this.y += this.vy;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    }
    
    draw() {
      ctx.beginPath(); 
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(99,179,255,${this.a})`; 
      ctx.fill();
    }
  }

  document.addEventListener('mousemove', e => { 
    mouseX = e.clientX; 
    mouseY = e.clientY; 
  });

  function init() {
    resize(); 
    mouseX = W / 2; 
    mouseY = H / 2;
    nodes = Array.from({ length: 100 }, () => new Node());
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    
    nodes.forEach(n => { 
      n.update(); 
      n.draw(); 
    });
    
    // Connections to mouse
    nodes.forEach(n => {
      const d = Math.hypot(mouseX - n.x, mouseY - n.y);
      if (d < 170) {
        ctx.beginPath(); 
        ctx.moveTo(n.x, n.y); 
        ctx.lineTo(mouseX, mouseY);
        ctx.strokeStyle = `rgba(99,179,255,${(1 - d / 170) * 0.28})`; 
        ctx.lineWidth = 0.6; 
        ctx.stroke();
      }
    });
    
    // Connections between nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
        if (d < 115) {
          ctx.beginPath(); 
          ctx.moveTo(nodes[i].x, nodes[i].y); 
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(99,179,255,${(1 - d / 115) * 0.13})`; 
          ctx.lineWidth = 0.5; 
          ctx.stroke();
        }
      }
    }
    
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { 
    resize(); 
    nodes.forEach(n => n.reset()); 
  });
  
  init(); 
  draw();
})();

/* SCROLL REVEAL */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { 
    if (e.isIntersecting) e.target.classList.add('visible'); 
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* FAQ */
function toggleFaq(el) {
  const isOpen = el.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
  if (!isOpen) el.classList.add('open');
}

/* FORM */
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.form-btn span');
  btn.textContent = 'Sent! ✦';
  setTimeout(() => btn.textContent = 'Send Message →', 3000);
}
