/* =============================================
   SCDIS — Charts (canvas-based, no deps)
   ============================================= */

const Charts = {

  // Line chart for analytics page
  drawLineChart(canvasId, labels, datasets, opts = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const pad = { top: 12, right: 12, bottom: 28, left: 44 };
    const cW = W - pad.left - pad.right;
    const cH = H - pad.top - pad.bottom;

    const allVals = datasets.flatMap(d => d.data);
    const maxVal = Math.max(...allVals) * 1.15;

    ctx.clearRect(0, 0, W, H);

    // Grid lines
    const gridCount = 4;
    ctx.strokeStyle = '#e5edf3';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= gridCount; i++) {
      const y = pad.top + (cH / gridCount) * i;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(pad.left + cW, y);
      ctx.stroke();
      // Y labels
      const val = Math.round(maxVal * (1 - i / gridCount));
      ctx.fillStyle = '#9ab0c0';
      ctx.font = `9px 'DM Mono', monospace`;
      ctx.textAlign = 'right';
      ctx.fillText(val >= 1000 ? (val/1000).toFixed(1)+'K' : val, pad.left - 5, y + 3);
    }

    // X labels
    ctx.fillStyle = '#9ab0c0';
    ctx.font = `9px 'DM Mono', monospace`;
    ctx.textAlign = 'center';
    labels.forEach((lbl, i) => {
      const x = pad.left + (i / (labels.length - 1)) * cW;
      ctx.fillText(lbl, x, H - 6);
    });

    // Lines + fill
    datasets.forEach(ds => {
      const pts = ds.data.map((v, i) => ({
        x: pad.left + (i / (labels.length - 1)) * cW,
        y: pad.top + cH - (v / maxVal) * cH
      }));

      // Fill
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      pts.slice(1).forEach(p => ctx.lineTo(p.x, p.y));
      ctx.lineTo(pts[pts.length-1].x, pad.top + cH);
      ctx.lineTo(pts[0].x, pad.top + cH);
      ctx.closePath();
      ctx.fillStyle = ds.fillColor || 'rgba(59,130,246,0.06)';
      ctx.fill();

      // Line
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      pts.slice(1).forEach(p => ctx.lineTo(p.x, p.y));
      ctx.strokeStyle = ds.color || '#3b82f6';
      ctx.lineWidth = 1.8;
      ctx.lineJoin = 'round';
      ctx.stroke();

      // Dots
      pts.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI*2);
        ctx.fillStyle = ds.color || '#3b82f6';
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });
    });
  },

  // Donut chart (SVG-based for crisp rendering)
  drawDonut(containerId, segments, total, centerLabel) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const size = 110;
    const cx = size / 2, cy = size / 2;
    const r = 38, strokeW = 12;
    const circumference = 2 * Math.PI * r;

    let offset = -Math.PI / 2;
    let paths = '';
    segments.forEach(seg => {
      const fraction = seg.value / total;
      const arcLen = circumference * fraction;
      const dashArr = `${arcLen} ${circumference - arcLen}`;
      const dashOff = -(offset / (2 * Math.PI)) * circumference;
      paths += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${seg.color}" stroke-width="${strokeW}" stroke-dasharray="${dashArr}" stroke-dashoffset="${dashOff}" stroke-linecap="butt" style="transition:stroke-dasharray .5s ease"/>`;
      offset += 2 * Math.PI * fraction;
    });

    container.innerHTML = `
      <div style="position:relative;display:inline-block">
        <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
          <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#f0f4f8" stroke-width="${strokeW}"/>
          ${paths}
        </svg>
        <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center">
          <div style="font-family:'Fraunces',serif;font-size:20px;font-weight:300;color:#0f2b3d">${centerLabel.val}</div>
          <div style="font-size:8px;letter-spacing:.5px;color:#5a7a94;text-transform:uppercase">${centerLabel.lbl}</div>
        </div>
      </div>
    `;
  },

  // Mini sparkline bars
  drawSparkline(containerId, values, color = '#3d8ec4') {
    const el = document.getElementById(containerId);
    if (!el) return;
    const max = Math.max(...values);
    el.innerHTML = values.map(v => {
      const h = Math.max(15, Math.round((v / max) * 100));
      return `<div class="spark-bar" style="height:${h}%;background:${color}"></div>`;
    }).join('');
  },

  // Simple bar chart in canvas
  drawBarChart(canvasId, labels, values, color = '#3d8ec4') {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const pad = { top:10, right:8, bottom:20, left:8 };
    const cW = W - pad.left - pad.right;
    const cH = H - pad.top - pad.bottom;
    const maxVal = Math.max(...values);
    const barW = cW / values.length * 0.65;
    const gap   = cW / values.length * 0.35;

    ctx.clearRect(0, 0, W, H);

    values.forEach((v, i) => {
      const barH = (v / maxVal) * cH;
      const x = pad.left + i * (barW + gap);
      const y = pad.top + cH - barH;
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.75;
      ctx.beginPath();
      ctx.roundRect(x, y, barW, barH, [2,2,0,0]);
      ctx.fill();
      ctx.globalAlpha = 1;

      ctx.fillStyle = '#9ab0c0';
      ctx.font = `8px 'DM Mono', monospace`;
      ctx.textAlign = 'center';
      ctx.fillText(labels[i], x + barW/2, H - 4);
    });
  }
};
