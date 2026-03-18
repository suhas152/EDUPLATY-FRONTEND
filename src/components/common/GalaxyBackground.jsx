import { useEffect, useRef } from 'react';

const NUM_STARS = 320;
const NUM_NEBULA = 6;

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

const GalaxyBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let W, H;

    // ── Stars ──────────────────────────────────────────────────────────────
    const stars = Array.from({ length: NUM_STARS }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: randomBetween(0.4, 1.8),
      speed: randomBetween(0.00003, 0.00012),
      opacity: randomBetween(0.3, 1),
      twinkleSpeed: randomBetween(0.005, 0.02),
      twinklePhase: Math.random() * Math.PI * 2,
      color: Math.random() > 0.85
        ? `hsl(${randomBetween(220, 280)}, 80%, 85%)`
        : '#ffffff',
    }));

    // ── Nebula blobs ───────────────────────────────────────────────────────
    const nebulae = Array.from({ length: NUM_NEBULA }, () => ({
      x: Math.random(),
      y: Math.random(),
      rx: randomBetween(0.12, 0.32),
      ry: randomBetween(0.08, 0.22),
      hue: randomBetween(220, 310),
      alpha: randomBetween(0.04, 0.10),
      driftX: randomBetween(-0.00004, 0.00004),
      driftY: randomBetween(-0.00003, 0.00003),
    }));

    // ── Shooting stars ─────────────────────────────────────────────────────
    const shoots = [];
    const spawnShoot = () => {
      shoots.push({
        x: Math.random(),
        y: Math.random() * 0.5,
        len: randomBetween(0.06, 0.14),
        speed: randomBetween(0.003, 0.007),
        alpha: 1,
        angle: randomBetween(20, 50) * (Math.PI / 180),
      });
    };
    let shootTimer = 0;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let t = 0;
    const draw = () => {
      t += 1;
      ctx.clearRect(0, 0, W, H);

      // Deep space gradient
      const bg = ctx.createRadialGradient(W * 0.5, H * 0.4, 0, W * 0.5, H * 0.4, Math.max(W, H) * 0.85);
      bg.addColorStop(0,   '#0d0820');
      bg.addColorStop(0.4, '#080518');
      bg.addColorStop(1,   '#020108');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Nebulae
      nebulae.forEach((n) => {
        n.x += n.driftX;
        n.y += n.driftY;
        if (n.x < -0.3) n.x = 1.3;
        if (n.x > 1.3)  n.x = -0.3;
        if (n.y < -0.3) n.y = 1.3;
        if (n.y > 1.3)  n.y = -0.3;

        const grd = ctx.createRadialGradient(
          n.x * W, n.y * H, 0,
          n.x * W, n.y * H, n.rx * W
        );
        grd.addColorStop(0,   `hsla(${n.hue}, 70%, 55%, ${n.alpha})`);
        grd.addColorStop(0.5, `hsla(${n.hue + 30}, 60%, 40%, ${n.alpha * 0.5})`);
        grd.addColorStop(1,   'transparent');

        ctx.save();
        ctx.scale(1, n.ry / n.rx);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(n.x * W, (n.y * H) / (n.ry / n.rx), n.rx * W, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Stars
      stars.forEach((s) => {
        s.x -= s.speed;
        if (s.x < 0) { s.x = 1; s.y = Math.random(); }

        s.twinklePhase += s.twinkleSpeed;
        const twinkle = 0.5 + 0.5 * Math.sin(s.twinklePhase);
        const alpha = s.opacity * (0.6 + 0.4 * twinkle);

        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.color.replace(')', `, ${alpha})`).replace('rgb', 'rgba').replace('#ffffff', `rgba(255,255,255,${alpha})`);

        // glow for bigger stars
        if (s.r > 1.2) {
          ctx.shadowBlur = 6;
          ctx.shadowColor = s.color;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Shooting stars
      shootTimer++;
      if (shootTimer > 180 + Math.random() * 240) {
        spawnShoot();
        shootTimer = 0;
      }
      for (let i = shoots.length - 1; i >= 0; i--) {
        const sh = shoots[i];
        sh.x += Math.cos(sh.angle) * sh.speed;
        sh.y += Math.sin(sh.angle) * sh.speed;
        sh.alpha -= 0.018;
        if (sh.alpha <= 0 || sh.x > 1.1 || sh.y > 1.1) {
          shoots.splice(i, 1);
          continue;
        }
        const x1 = sh.x * W;
        const y1 = sh.y * H;
        const x0 = x1 - Math.cos(sh.angle) * sh.len * W;
        const y0 = y1 - Math.sin(sh.angle) * sh.len * H;
        const grad = ctx.createLinearGradient(x0, y0, x1, y1);
        grad.addColorStop(0, `rgba(255,255,255,0)`);
        grad.addColorStop(1, `rgba(255,255,255,${sh.alpha})`);
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="galaxy-canvas"
      style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}
    />
  );
};

export default GalaxyBackground;
