// Enclosed Loop Polygon Area & Point-in-Polygon Math
export function polyArea(pts) {
  let a = 0;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    a += (pts[j][0] + pts[i][0]) * (pts[j][1] - pts[i][1]);
  }
  return Math.abs(a / 2);
}

export function inPoly(x, y, pts) {
  let inside = false;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const [xi, yi] = pts[i];
    const [xj, yj] = pts[j];
    const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

export function checkLoop(outing, onClaimCallback) {
  const tr = outing.trail;
  const n = tr.length;
  if (n < 20) return;
  const [ex, ey] = tr[n - 1];
  const from = outing.loopFrom || 0;

  for (let j = from; j < n - 18; j++) {
    const [jx, jy] = tr[j];
    if (Math.hypot(jx - ex, jy - ey) < 22) {
      const poly = tr.slice(j, n);
      const area = polyArea(poly);
      outing.loopFrom = n - 1;
      // Loop between 1,000 sq m (approx 1 block) and 4 sq km
      if (area > 1000 && area < 4e6) {
        if (onClaimCallback) onClaimCallback(poly, area);
      }
      return;
    }
  }
}
