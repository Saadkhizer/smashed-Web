/* SmashedBurger — procedural 3D burger for three.js r149 (UMD global THREE).
   No external assets: every texture is generated on a canvas, every mesh is built from primitives.
   API:
     SmashedBurger.init(THREE)                       // once, before anything else
     var b = SmashedBurger.create('og' | 'smokey' | 'fiery' | 'classic' | 'hero')
       b.group      THREE.Group (origin at the base of the stack)
       b.layers     [{mesh, restY}]
       b.height     rest height of the stack
       b.setExplode(e)  e in [0,1]: spreads the layers vertically
     SmashedBurger.environment(renderer)             // PMREM env map for reflections
     SmashedBurger.shadowBlob()                      // soft contact shadow mesh
*/
const __g = {};
(function (global) {
  'use strict';
  var T;

  function rng(seed) {
    var s = seed >>> 0;
    return function () {
      s = (s + 0x6D2B79F5) >>> 0;
      var t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function srgb(tex) {
    if ('colorSpace' in tex) tex.colorSpace = T.SRGBColorSpace; else tex.encoding = T.sRGBEncoding;
    return tex;
  }

  function hexA(hex, a) {
    var n = parseInt(hex.slice(1), 16);
    return 'rgba(' + ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a.toFixed(3) + ')';
  }
  // Blotchy canvas texture: base fill + many soft translucent dots.
  function blotch(size, base, palette, count, rMin, rMax, alpha, seed, isColor) {
    var c = document.createElement('canvas'); c.width = c.height = size;
    var g = c.getContext('2d'), rnd = rng(seed);
    g.fillStyle = base; g.fillRect(0, 0, size, size);
    for (var i = 0; i < count; i++) {
      var col = palette[(rnd() * palette.length) | 0];
      var r = rMin + rnd() * (rMax - rMin), x = rnd() * size, y = rnd() * size;
      var a0 = alpha * (0.35 + rnd() * 0.65);
      [[0, 0], [size, 0], [0, size], [-size, 0], [0, -size]].forEach(function (o, oi) {
        if (oi && !(x + o[0] < r || x + o[0] > size - r || y + o[1] < r || y + o[1] > size - r)) { return; }
        var gx = x + o[0], gy = y + o[1];
        if (oi && (gx < -r || gx > size + r || gy < -r || gy > size + r)) return;
        var gr = g.createRadialGradient(gx, gy, 0, gx, gy, r);
        gr.addColorStop(0, hexA(col, a0)); gr.addColorStop(1, hexA(col, 0));
        g.fillStyle = gr; g.fillRect(gx - r, gy - r, r * 2, r * 2);
      });
    }
    g.globalAlpha = 1;
    var t = new T.CanvasTexture(c);
    t.wrapS = t.wrapT = T.RepeatWrapping; t.anisotropy = 4;
    return isColor ? srgb(t) : t;
  }

  function lathe(pts, seg) {
    return new T.LatheGeometry(pts.map(function (p) { return new T.Vector2(p[0], p[1]); }), seg || 96);
  }

  // ---------- bun ----------
  var BUN_R = 1.0, BUN_TOP_H = 0.62;
  function domeY(r, base) {
    var a = Math.asin(Math.min(0.999, r / BUN_R));
    return base + BUN_TOP_H * Math.pow(Math.cos(a), 0.85);
  }

  function bunTop(seed) {
    var pts = [[0.0001, 0], [BUN_R * 0.9, 0], [BUN_R * 1.0, 0.03], [BUN_R * 1.025, 0.1]];
    for (var i = 36; i >= 1; i--) {
      var a = (i / 36) * (Math.PI / 2) * 0.97;
      pts.push([BUN_R * Math.sin(a), BUN_TOP_H * Math.pow(Math.cos(a), 0.85)]);
    }
    pts.push([0.0001, BUN_TOP_H]);
    var geo = lathe(pts, 96);
    var map = blotch(512, '#B8681F', ['#9C5014', '#D58A32', '#C97A28', '#7E3F0E', '#E9A24A'], 700, 6, 26, 0.26, seed, true);
    var bump = blotch(256, '#808080', ['#606060', '#a0a0a0', '#707070'], 420, 6, 20, 0.45, seed + 3, false);
    map.repeat.set(3, 1); bump.repeat.set(3, 1);
    var mat = new T.MeshPhysicalMaterial({
      map: map, roughness: 0.46, metalness: 0,
      clearcoat: 0.3, clearcoatRoughness: 0.4, side: T.DoubleSide
    });
    var mesh = new T.Mesh(geo, mat);
    // sesame
    var seeds = 80, rnd = rng(seed + 11);
    var sg = new T.SphereGeometry(0.036, 10, 7);
    var sm = new T.MeshStandardMaterial({ color: '#F1DDA8', roughness: 0.5 });
    var inst = new T.InstancedMesh(sg, sm, seeds);
    var m4 = new T.Matrix4(), q = new T.Quaternion(), q2 = new T.Quaternion(), up = new T.Vector3(0, 1, 0),
      n = new T.Vector3(), p = new T.Vector3(), s = new T.Vector3();
    for (var k = 0; k < seeds; k++) {
      var r = BUN_R * 0.83 * Math.sqrt(rnd()), ph = rnd() * 6.2832;
      var y = domeY(r, 0), dy = (domeY(r + 0.01, 0) - domeY(Math.max(0, r - 0.01), 0)) / 0.02;
      p.set(Math.cos(ph) * r, y + 0.006, Math.sin(ph) * r);
      n.set(-dy * Math.cos(ph), 1, -dy * Math.sin(ph)).normalize();
      q.setFromUnitVectors(up, n);
      q2.setFromAxisAngle(n, rnd() * 6.2832); q.premultiply(q2);
      var sc = 0.8 + rnd() * 0.5; s.set(1.5 * sc, 0.5 * sc, 0.8 * sc);
      m4.compose(p, q, s); inst.setMatrixAt(k, m4);
    }
    mesh.add(inst);
    return mesh;
  }

  function bunBottom(seed) {
    var pts = [[0.0001, 0], [BUN_R * 0.82, 0], [BUN_R * 0.97, 0.025], [BUN_R * 1.02, 0.1], [BUN_R * 1.015, 0.19],
      [BUN_R * 0.98, 0.255], [BUN_R * 0.9, 0.27], [0.0001, 0.26]];
    var geo = lathe(pts, 96);
    var map = blotch(512, '#B9742B', ['#A45F1C', '#D79A48', '#8E4E14', '#E3A957'], 700, 3, 20, 0.25, seed, true);
    map.repeat.set(3, 1);
    var mat = new T.MeshPhysicalMaterial({ map: map, roughness: 0.5, clearcoat: 0.3, clearcoatRoughness: 0.5, side: T.DoubleSide });
    return new T.Mesh(geo, mat);
  }

  // ---------- smashed beef ----------
  function patty(seed, thick) {
    thick = thick || 0.15;
    var R = 1.07, g = new T.CylinderGeometry(R, R * 0.96, thick, 140, 4, false);
    var pos = g.attributes.position, rnd = rng(seed);
    var ph = [rnd() * 6.28, rnd() * 6.28, rnd() * 6.28, rnd() * 6.28];
    var cols = new Float32Array(pos.count * 3), c = new T.Color();
    for (var i = 0; i < pos.count; i++) {
      var x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
      var ang = Math.atan2(z, x), rr = Math.sqrt(x * x + z * z), k = rr / R;
      var n = 1 + 0.032 * Math.sin(5 * ang + ph[0]) + 0.024 * Math.sin(11 * ang + ph[1]) +
        0.02 * Math.sin(23 * ang + ph[2]) + 0.014 * Math.sin(41 * ang + ph[3]) + 0.008 * Math.sin(67 * ang + ph[1]);
      var sc = 1 + (n - 1) * Math.pow(k, 2.5);
      x *= sc; z *= sc;
      var face = Math.abs(y) > thick * 0.45;
      if (face) y += (Math.sin(x * 9 + ph[0]) * Math.sin(z * 8 + ph[1]) * 0.016 + Math.sin(x * 23 + ph[2]) * Math.sin(z * 21) * 0.008) * (y > 0 ? 1 : 0.5);
      if (!face) { var wn = Math.sin(ang * 37 + y * 90 + ph[1]) * 0.014 + Math.sin(ang * 61 + ph[2]) * 0.01; x *= 1 + wn; z *= 1 + wn; }
      pos.setXYZ(i, x, y, z);
      // colour: seared crust at the rim + lacy dark spots, juicy lighter centre
      var crust = Math.max(0, (k - 0.78) / 0.22);
      var speck = (Math.sin(x * 31 + ph[2]) * Math.sin(z * 29 + ph[3]) + 1) * 0.5;
      c.set('#6a402a').lerp(new T.Color('#3a1f12'), 0.35 + 0.5 * speck).lerp(new T.Color('#1a0d08'), crust * 0.85);
      if (y > 0 && k < 0.7) c.lerp(new T.Color('#7a4c30'), 0.25 * (1 - speck));
      cols[i * 3] = c.r; cols[i * 3 + 1] = c.g; cols[i * 3 + 2] = c.b;
    }
    g.setAttribute('color', new T.BufferAttribute(cols, 3));
    g.computeVertexNormals();
    var mat = new T.MeshPhysicalMaterial({
      vertexColors: true, roughness: 0.6, metalness: 0,
      clearcoat: 0.25, clearcoatRoughness: 0.45
    });
    return new T.Mesh(g, mat);
  }

  // ---------- cheese (draped square) ----------
  function cheese(color, seed) {
    var N = 44, g = new T.BoxGeometry(1.82, 0.05, 1.82, N, 1, N), pos = g.attributes.position;
    function sstep(a, b, x) { var t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); }
    var rnd = rng(seed || 4), ph = rnd() * 6;
    for (var i = 0; i < pos.count; i++) {
      var x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i), rho = Math.sqrt(x * x + z * z);
      var drape = 0.34 * Math.pow(sstep(0.55, 1.29, rho), 1.6);
      y -= drape + Math.sin(x * 5 + ph) * Math.sin(z * 4.3) * 0.006;
      pos.setY(i, y);
    }
    g.rotateY(Math.PI / 4);
    g.computeVertexNormals();
    var mat = new T.MeshPhysicalMaterial({ color: color || '#F4A91E', roughness: 0.3, clearcoat: 0.7, clearcoatRoughness: 0.25, sheen: 0.4, sheenColor: new T.Color('#ffd27a') });
    return new T.Mesh(g, mat);
  }

  function pickles(seed) {
    var grp = new T.Group(), rnd = rng(seed);
    var mat = new T.MeshPhysicalMaterial({ color: '#86A23A', roughness: 0.3, clearcoat: 0.5, clearcoatRoughness: 0.3 });
    var mat2 = new T.MeshStandardMaterial({ color: '#C9D77F', roughness: 0.6 });
    for (var i = 0; i < 4; i++) {
      var a = i / 4 * 6.2832 + rnd() * 0.5, r = 0.46 + rnd() * 0.12;
      var m = new T.Mesh(new T.CylinderGeometry(0.22, 0.22, 0.04, 28), mat);
      m.position.set(Math.cos(a) * r, 0.02, Math.sin(a) * r);
      m.rotation.set((rnd() - 0.5) * 0.12, 0, (rnd() - 0.5) * 0.12);
      var core = new T.Mesh(new T.CylinderGeometry(0.12, 0.12, 0.045, 20), mat2);
      m.add(core);
      grp.add(m);
    }
    return grp;
  }

  function lettuce(seed, col) {
    var R = 1.22, g = new T.RingGeometry(0.02, R, 140, 22), pos = g.attributes.position, rnd = rng(seed);
    var ph = [rnd() * 6, rnd() * 6, rnd() * 6];
    for (var i = 0; i < pos.count; i++) {
      var x = pos.getX(i), y = pos.getY(i), r = Math.sqrt(x * x + y * y), a = Math.atan2(y, x), k = r / R;
      var ruffle = 1 + 0.07 * Math.sin(9 * a + ph[0]) * k + 0.045 * Math.sin(17 * a + ph[1]) * k + 0.02 * Math.sin(31 * a + ph[2]) * k;
      var z = 0.11 * Math.sin(13 * a + ph[2] + k * 5) * k * k + 0.06 * Math.sin(7 * a + ph[0]) * k;
      pos.setXYZ(i, x * ruffle, y * ruffle, Math.max(0.0, z + 0.075));
    }
    g.rotateX(-Math.PI / 2);
    g.computeVertexNormals();
    var mat = new T.MeshStandardMaterial({ color: col || '#4F9426', roughness: 0.5, side: T.DoubleSide });
    return new T.Mesh(g, mat);
  }

  function tomato() {
    var m = new T.Mesh(new T.CylinderGeometry(0.88, 0.88, 0.075, 48),
      new T.MeshPhysicalMaterial({ color: '#D53D26', roughness: 0.25, clearcoat: 0.8, clearcoatRoughness: 0.2 }));
    return m;
  }

  function chicken(seed, o) {
    o = o || {};
    var g = new T.SphereGeometry(1, 72, 28), pos = g.attributes.position, rnd = rng(seed);
    var ph = [rnd() * 6, rnd() * 6, rnd() * 6];
    var uv = g.attributes.uv;
    for (var i = 0; i < pos.count; i++) {
      var x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
      var a = Math.atan2(z, x);
      var e = 1 + 0.07 * Math.sin(4 * a + ph[0]) + 0.04 * Math.sin(9 * a + ph[1]) + 0.025 * Math.sin(19 * a + ph[2]);
      x *= 1.1 * e; z *= 1.0 * e; y *= (o.thick || 0.24);
      y += Math.sin(x * 14 + ph[0]) * Math.sin(z * 13 + ph[1]) * 0.018 + Math.sin(x * 33) * Math.sin(z * 29) * 0.01;
      pos.setXYZ(i, x, y, z);
      if (o.grill) uv.setXY(i, x * 0.45 + 0.5, z * 0.45 + 0.5);
    }
    g.computeVertexNormals();
    var map, bump;
    if (o.grill) {
      var c = document.createElement('canvas'); c.width = c.height = 512;
      var cx = c.getContext('2d');
      cx.fillStyle = o.base || '#C9894A'; cx.fillRect(0, 0, 512, 512);
      var r2 = rng(seed + 5);
      for (var k = 0; k < 500; k++) { cx.fillStyle = 'rgba(' + (150 + r2() * 60 | 0) + ',' + (90 + r2() * 40 | 0) + ',40,0.12)'; cx.beginPath(); cx.arc(r2() * 512, r2() * 512, 4 + r2() * 14, 0, 6.3); cx.fill(); }
      cx.strokeStyle = 'rgba(52,26,10,0.78)'; cx.lineWidth = 26; cx.lineCap = 'round';
      for (var l = -2; l < 6; l++) { cx.beginPath(); cx.moveTo(-40 + l * 110, 560); cx.lineTo(300 + l * 110, -40); cx.stroke(); }
      map = srgb(new T.CanvasTexture(c)); bump = null;
    } else {
      map = blotch(512, o.base || '#D69A36', o.palette || ['#E6AF4A', '#BE822A', '#F0C468', '#A9701F'], 900, 4, 18, 0.22, seed, true);
      bump = blotch(256, '#808080', ['#606060', '#a0a0a0'], 500, 3, 10, 0.35, seed + 2, false);
      map.repeat.set(2, 2); bump.repeat.set(2, 2);
    }
    var mat = new T.MeshStandardMaterial({ map: map, roughness: o.grill ? 0.55 : 0.7 });
    if (bump) { mat.bumpMap = bump; mat.bumpScale = 0.8; }
    return new T.Mesh(g, mat);
  }

  function glaze(color, rough, radius, seed) {
    var g = new T.CylinderGeometry(radius, radius, 0.022, 80, 1), pos = g.attributes.position, rnd = rng(seed), ph = rnd() * 6;
    for (var i = 0; i < pos.count; i++) {
      var x = pos.getX(i), z = pos.getZ(i), a = Math.atan2(z, x), r = Math.sqrt(x * x + z * z), k = r / radius;
      var s = 1 + 0.06 * Math.sin(6 * a + ph) * k + 0.04 * Math.sin(13 * a + ph * 2) * k;
      pos.setX(i, x * s); pos.setZ(i, z * s);
    }
    g.computeVertexNormals();
    return new T.Mesh(g, new T.MeshPhysicalMaterial({ color: color, roughness: rough, clearcoat: 1, clearcoatRoughness: 0.1 }));
  }

  function rings(seed, n, tube, color) {
    var grp = new T.Group(), rnd = rng(seed);
    var map = blotch(256, '#C98A2B', ['#E1A94A', '#A8701C', '#F0C068'], 500, 2, 10, 0.4, seed, true);
    var mat = new T.MeshStandardMaterial({ map: map, roughness: 0.72, color: color || '#ffffff' });
    for (var i = 0; i < n; i++) {
      var m = new T.Mesh(new T.TorusGeometry(0.33 + rnd() * 0.08, tube || 0.075, 12, 40), mat);
      m.rotation.x = Math.PI / 2 + (rnd() - 0.5) * 0.2;
      var a = i / n * 6.2832 + rnd();
      m.position.set(Math.cos(a) * 0.38, 0.05 + i * 0.012, Math.sin(a) * 0.38);
      grp.add(m);
    }
    return grp;
  }

  function jalapenos(seed) {
    var grp = new T.Group(), rnd = rng(seed);
    var mat = new T.MeshPhysicalMaterial({ color: '#4B8A2A', roughness: 0.3, clearcoat: 0.6 });
    for (var i = 0; i < 6; i++) {
      var a = i / 6 * 6.2832 + rnd() * 0.4, r = 0.35 + rnd() * 0.3;
      var m = new T.Mesh(new T.TorusGeometry(0.1, 0.028, 8, 22), mat);
      m.rotation.x = Math.PI / 2; m.position.set(Math.cos(a) * r, 0.03, Math.sin(a) * r);
      grp.add(m);
    }
    return grp;
  }


  // ---------- extra layers (shroom / breakfast / chicken variants) ----------
  function mushrooms(seed) {
    var grp = new T.Group(), rnd = rng(seed);
    var mat = new T.MeshStandardMaterial({ color: '#8A6540', roughness: 0.55 });
    var mat2 = new T.MeshStandardMaterial({ color: '#E7D5B0', roughness: 0.6 });
    for (var i = 0; i < 6; i++) {
      var a = i / 6 * 6.2832 + rnd() * 0.5, r = i === 5 ? 0.2 : 0.86 + rnd() * 0.14;
      var cap = new T.Mesh(new T.SphereGeometry(0.38, 18, 10, 0, 6.2832, 0, 1.45), mat);
      cap.scale.set(1, 0.5, 0.85); cap.position.set(Math.cos(a) * r, 0.06, Math.sin(a) * r);
      cap.rotation.y = rnd() * 6; cap.rotation.z = (rnd() - 0.5) * 0.3;
      var stem = new T.Mesh(new T.CylinderGeometry(0.09, 0.11, 0.1, 10), mat2); stem.position.y = -0.02;
      cap.add(stem); grp.add(cap);
    }
    return grp;
  }
  function bacon(seed) {
    var grp = new T.Group(), rnd = rng(seed);
    for (var i = 0; i < 3; i++) {
      var g = new T.BoxGeometry(1.7, 0.035, 0.26, 40, 1, 2), p = g.attributes.position;
      var ph = rnd() * 6;
      for (var k = 0; k < p.count; k++) { var x = p.getX(k); p.setY(k, p.getY(k) + Math.sin(x * 5 + ph) * 0.05 + Math.sin(x * 11 + ph) * 0.02); p.setZ(k, p.getZ(k) + Math.sin(x * 4 + ph * 2) * 0.04); }
      g.computeVertexNormals();
      var c = document.createElement('canvas'); c.width = 256; c.height = 64; var cx = c.getContext('2d');
      cx.fillStyle = '#A8392A'; cx.fillRect(0, 0, 256, 64);
      cx.fillStyle = '#E8C2A4'; cx.fillRect(0, 12, 256, 10); cx.fillRect(0, 40, 256, 8);
      var m = new T.Mesh(g, new T.MeshPhysicalMaterial({ map: srgb(new T.CanvasTexture(c)), roughness: 0.4, clearcoat: 0.5 }));
      m.position.set((rnd() - 0.5) * 0.3, 0.02 * i, (i - 1) * 0.5);
      m.rotation.y = (rnd() - 0.5) * 0.5; grp.add(m);
    }
    return grp;
  }
  function egg(seed) {
    var grp = new T.Group(), rnd = rng(seed);
    var wg = new T.CylinderGeometry(0.85, 0.8, 0.05, 64, 1), p = wg.attributes.position, ph = [rnd() * 6, rnd() * 6];
    for (var i = 0; i < p.count; i++) { var x = p.getX(i), z = p.getZ(i), a = Math.atan2(z, x), r = Math.sqrt(x * x + z * z) / 0.85; var s = 1 + 0.12 * Math.sin(3 * a + ph[0]) * r + 0.06 * Math.sin(5 * a + ph[1]) * r; p.setX(i, x * s); p.setZ(i, z * s); }
    wg.computeVertexNormals();
    grp.add(new T.Mesh(wg, new T.MeshPhysicalMaterial({ color: '#FFFDF4', roughness: 0.2, clearcoat: 0.9, clearcoatRoughness: 0.15 })));
    var yolk = new T.Mesh(new T.SphereGeometry(0.34, 32, 20), new T.MeshPhysicalMaterial({ color: '#F6A800', roughness: 0.15, clearcoat: 1, clearcoatRoughness: 0.08 }));
    yolk.scale.set(1, 0.55, 1); yolk.position.set(0.05, 0.1, 0); grp.add(yolk);
    return grp;
  }
  function ooze(seed) {
    var m = new T.Mesh(new T.TorusGeometry(1.0, 0.09, 12, 64), new T.MeshPhysicalMaterial({ color: '#F8E6A6', roughness: 0.3, clearcoat: 0.6 }));
    m.rotation.x = Math.PI / 2; m.scale.set(1.05, 1, 0.95); return m;
  }

  // ---------- side props (not layered) ----------
  var GOLD = '#E8B54A';
  function crumbMat(seed, base) {
    var map = blotch(256, base || '#D19A3A', ['#E9B45A', '#B97A22', '#F3CC7A', '#9C6418'], 700, 2, 8, 0.45, seed, true);
    map.repeat.set(2, 2);
    return new T.MeshStandardMaterial({ map: map, roughness: 0.75 });
  }
  function carton(w, h, color) {
    var g = new T.CylinderGeometry(w * 0.82, w * 0.58, h, 4, 1, true); g.rotateY(Math.PI / 4);
    var m = new T.Mesh(g, new T.MeshStandardMaterial({ color: color || '#C0281A', roughness: 0.5, side: T.DoubleSide }));
    m.position.y = h / 2; return m;
  }
  function fries(seed, n, tint) {
    var grp = new T.Group(), rnd = rng(seed);
    grp.add(carton(1.0, 0.85));
    var geo = new T.BoxGeometry(0.085, 1, 0.085), mat = new T.MeshStandardMaterial({ color: '#ffffff', roughness: 0.6 });
    var inst = new T.InstancedMesh(geo, mat, n), m4 = new T.Matrix4(), q = new T.Quaternion(), e = new T.Euler(), pv = new T.Vector3(), sv = new T.Vector3(), col = new T.Color();
    for (var i = 0; i < n; i++) {
      var x = (rnd() - 0.5) * 0.7, z = (rnd() - 0.5) * 0.7, L = 0.85 + rnd() * 0.4;
      var tx = x * 0.5 + (rnd() - 0.5) * 0.12, tz = z * 0.5 + (rnd() - 0.5) * 0.12;
      e.set(tz, rnd() * 3, -tx); q.setFromEuler(e);
      var bottom = 0.14 + rnd() * 0.12;
      pv.set(x, bottom + L / 2, z); sv.set(1, L, 1);
      m4.compose(pv, q, sv); inst.setMatrixAt(i, m4);
      col.set(GOLD).lerp(new T.Color(rnd() < 0.3 ? '#C98A2A' : '#F6D27A'), rnd() * 0.6); if (tint) col.lerp(new T.Color(tint), 0.35 + rnd() * 0.35); inst.setColorAt(i, col);
    }
    grp.add(inst); grp.userData.h = 1.7; return grp;
  }
  function loadedFries(seed) {
    var grp = fries(seed, 90), rnd = rng(seed + 9);
    var sm = new T.MeshPhysicalMaterial({ color: '#E2582A', roughness: 0.25, clearcoat: 0.8 });
    for (var i = 0; i < 5; i++) { var b = new T.Mesh(new T.SphereGeometry(0.2, 16, 10), sm); b.scale.set(1.5 + rnd(), 0.28, 0.5 + rnd() * 0.3); b.position.set((rnd() - 0.5) * 0.6, 1.36 + rnd() * 0.1, (rnd() - 0.5) * 0.6); b.rotation.y = rnd() * 3; grp.add(b); }
    var cm = crumbMat(seed + 2);
    for (var j = 0; j < 6; j++) { var c = new T.Mesh(new T.SphereGeometry(0.16, 16, 10), cm); c.scale.set(1.2, 0.8, 1); c.position.set((rnd() - 0.5) * 0.7, 1.3 + rnd() * 0.12, (rnd() - 0.5) * 0.7); grp.add(c); }
    var jm = new T.MeshPhysicalMaterial({ color: '#4B8A2A', roughness: 0.3, clearcoat: 0.6 });
    for (var k = 0; k < 6; k++) { var t = new T.Mesh(new T.TorusGeometry(0.09, 0.028, 8, 20), jm); t.rotation.x = Math.PI / 2 + (rnd() - 0.5) * 0.4; t.position.set((rnd() - 0.5) * 0.7, 1.45 + rnd() * 0.08, (rnd() - 0.5) * 0.7); grp.add(t); }
    return grp;
  }
  function onionPile(seed) {
    var grp = new T.Group(), rnd = rng(seed), mat = crumbMat(seed, '#CF9433');
    for (var i = 0; i < 9; i++) {
      var layer = i < 4 ? 0 : i < 7 ? 1 : 2;
      var m = new T.Mesh(new T.TorusGeometry(0.42, 0.135, 14, 44), mat);
      m.rotation.x = Math.PI / 2 + (rnd() - 0.5) * 0.35; m.rotation.y = (rnd() - 0.5) * 0.3;
      var a = (i % 4) / 4 * 6.2832 + layer * 0.8;
      var rad = layer === 0 ? 0.55 : layer === 1 ? 0.3 : 0.0;
      m.position.set(Math.cos(a) * rad, 0.14 + layer * 0.22, Math.sin(a) * rad);
      grp.add(m);
    }
    grp.userData.h = 0.8; return grp;
  }
  function ramekin(color) {
    var grp = new T.Group();
    var cup = new T.Mesh(new T.CylinderGeometry(0.3, 0.24, 0.24, 32), new T.MeshStandardMaterial({ color: '#F4F0E6', roughness: 0.35 }));
    cup.position.y = 0.12; grp.add(cup);
    var sauce = new T.Mesh(new T.CylinderGeometry(0.26, 0.26, 0.02, 32), new T.MeshPhysicalMaterial({ color: color, roughness: 0.15, clearcoat: 1 }));
    sauce.position.y = 0.245; grp.add(sauce); return grp;
  }
  function fan(seed, kind) {
    var grp = new T.Group(), rnd = rng(seed), mat = crumbMat(seed);
    var rows = [[-0.46, 0.0, 0], [0.0, 0.0, 0], [0.46, 0.0, 0], [-0.23, 0.2, 0], [0.23, 0.2, 0], [0.0, 0.4, 0]];
    rows.forEach(function (r, i) {
      var m;
      if (kind === 'tender') {
        var g = new T.CapsuleGeometry(0.15, 0.9, 8, 20), p = g.attributes.position;
        for (var k = 0; k < p.count; k++) { var x = p.getX(k), y = p.getY(k), z = p.getZ(k); var n = 1 + 0.18 * Math.sin(y * 5 + i) + 0.08 * Math.sin(y * 11 + x * 9); p.setXYZ(k, x * n * 1.3, y, z * n * 0.8 + Math.sin(y * 3 + i) * 0.04); }
        g.computeVertexNormals(); m = new T.Mesh(g, mat);
      } else { m = new T.Mesh(new T.CapsuleGeometry(0.1, 1.05, 6, 16), mat); }
      m.rotation.z = Math.PI / 2; m.rotation.y = (r[0]) * 0.55 + (rnd() - 0.5) * 0.15;
      m.rotation.order = 'YZX'; m.rotation.x = (rnd() - 0.5) * 0.4;
      m.position.set(0, 0.14 + r[1], r[0] * 1.15);
      grp.add(m);
    });
    return grp;
  }
  function sticks(seed) {
    var grp = fan(seed, 'stick');
    var cheeseMat = new T.MeshPhysicalMaterial({ color: '#F6DA86', roughness: 0.3, clearcoat: 0.7 });
    var s1 = new T.Mesh(new T.CylinderGeometry(0.07, 0.07, 0.5, 14), cheeseMat); s1.rotation.z = Math.PI / 2; s1.position.set(0.95, 0.38, 0.5); grp.add(s1);
    var d = ramekin('#B3261A'); d.position.set(-0.55, 0, -0.65); grp.add(d); grp.userData.h = 0.7; return grp;
  }
  function tenders(seed) {
    var grp = fan(seed, 'tender');
    var d = ramekin('#E2582A'); d.position.set(-0.55, 0, -0.7); grp.add(d); grp.userData.h = 0.7; return grp;
  }
  function cup(color) {
    var grp = new T.Group();
    var pts = [[0.0001, 0], [0.36, 0], [0.4, 0.02], [0.5, 1.3], [0.0001, 1.3]];
    var cupm = new T.Mesh(lathe(pts, 48), new T.MeshPhysicalMaterial({ color: color || '#C0281A', roughness: 0.35, clearcoat: 0.6, side: T.DoubleSide }));
    grp.add(cupm);
    var band = new T.Mesh(lathe([[0.0001, 0.42], [0.4 + 0.115, 0.42], [0.4 + 0.15, 0.88], [0.0001, 0.88]].map(function (p, i) { return i === 1 || i === 2 ? [0.36 + (p[1] / 1.3) * 0.14 + 0.012, p[1]] : p; }), 48),
      new T.MeshStandardMaterial({ color: '#FFC21F', roughness: 0.45, side: T.DoubleSide }));
    grp.add(band);
    var lid = new T.Mesh(new T.CylinderGeometry(0.54, 0.52, 0.09, 48), new T.MeshStandardMaterial({ color: '#2A1B15', roughness: 0.45 })); lid.position.y = 1.33; grp.add(lid);
    var dome = new T.Mesh(new T.SphereGeometry(0.4, 32, 12, 0, 6.2832, 0, 0.9), new T.MeshStandardMaterial({ color: '#2A1B15', roughness: 0.4 })); dome.scale.set(1, 0.35, 1); dome.position.y = 1.36; grp.add(dome);
    var straw = new T.Mesh(new T.CylinderGeometry(0.035, 0.035, 1.1, 12), new T.MeshStandardMaterial({ color: '#FAF3E4', roughness: 0.4 }));
    straw.position.set(0.1, 1.85, 0); straw.rotation.z = -0.12; grp.add(straw);
    grp.userData.h = 2.3; return grp;
  }
  function bottle() {
    var grp = new T.Group();
    var pts = [[0.0001, 0], [0.42, 0], [0.44, 0.06], [0.44, 1.3], [0.36, 1.6], [0.17, 1.82], [0.16, 2.05], [0.0001, 2.05]];
    grp.add(new T.Mesh(lathe(pts, 48), new T.MeshPhysicalMaterial({ color: '#3A1810', roughness: 0.1, clearcoat: 1, transmission: 0, side: T.DoubleSide })));
    var label = new T.Mesh(new T.CylinderGeometry(0.45, 0.45, 0.6, 48, 1, true), new T.MeshStandardMaterial({ color: '#C0281A', roughness: 0.4, side: T.DoubleSide })); label.position.y = 0.75; grp.add(label);
    var stripe = new T.Mesh(new T.CylinderGeometry(0.452, 0.452, 0.12, 48, 1, true), new T.MeshStandardMaterial({ color: '#FFC21F', roughness: 0.4, side: T.DoubleSide })); stripe.position.y = 0.75; grp.add(stripe);
    var cap = new T.Mesh(new T.CylinderGeometry(0.17, 0.17, 0.14, 24), new T.MeshStandardMaterial({ color: '#FFC21F', roughness: 0.4 })); cap.position.y = 2.1; grp.add(cap);
    grp.userData.h = 2.2; return grp;
  }
  function ball(seed) {   // a ball of ground beef (for the story)
    var g = new T.SphereGeometry(0.6, 48, 32), p = g.attributes.position, rnd = rng(seed), ph = rnd() * 6;
    for (var i = 0; i < p.count; i++) { var x = p.getX(i), y = p.getY(i), z = p.getZ(i); var n = 1 + 0.045 * Math.sin(x * 11 + ph) * Math.sin(y * 9) + 0.035 * Math.sin(z * 13 + y * 7); p.setXYZ(i, x * n, y * n * 0.95, z * n); }
    g.computeVertexNormals();
    var m = new T.Mesh(g, new T.MeshPhysicalMaterial({ color: '#B2594A', roughness: 0.55, clearcoat: 0.25, clearcoatRoughness: 0.5 }));
    m.position.y = 0.58; var grp = new T.Group(); grp.add(m); grp.userData.h = 1.2; return grp;
  }
  var PROPS = {
    fries: function () { return fries(5, 80); },
    loaded: function () { return loadedFries(7); },
    masala: function () { return fries(9, 85, '#C9552A'); },
    rings: function () { return onionPile(3); },
    sticks: function () { return sticks(4); },
    tenders: function () { return tenders(6); },
    cup: function () { return cup('#C0281A'); },
    bottle: function () { return bottle(); },
    ball: function () { return ball(2); },
    pattyOnly: function () { var g = new T.Group(); var p = patty(5, 0.14); p.position.y = 0.07; g.add(p); g.userData.h = 0.3; return g; }
  };

  // ---------- recipes ----------
  // Each entry: [factory, thickness (how much vertical room it takes), lift (extra offset)]
  var RECIPES = {
    og: [['bunBottom', 0.26], ['patty', 0.16], ['cheese', 0.06], ['patty', 0.16, 11], ['cheese', 0.06, 2], ['pickles', 0.05], ['bunTop', 0.0]],
    classic: [['bunBottom', 0.26], ['lettuce', 0.05], ['tomato', 0.07], ['patty', 0.16], ['cheese', 0.06], ['pickles', 0.05], ['bunTop', 0]],
    smokey: [['bunBottom', 0.26], ['patty', 0.16], ['bbq', 0.025], ['cheese', 0.06, 3], ['rings', 0.2], ['bunTop', 0]],
    fiery: [['bunBottom', 0.26], ['lettuce', 0.05], ['chicken', 0.25], ['hot', 0.025], ['jalapenos', 0.06], ['bunTop', 0]],
    shroom: [['bunBottom', 0.26], ['patty', 0.16], ['swiss', 0.06, 6], ['mush', 0.22], ['bunTop', 0]],
    breakfast: [['bunBottom', 0.26], ['patty', 0.16], ['bacon', 0.1], ['cheese', 0.06, 4], ['egg', 0.16], ['bunTop', 0]],
    grilled: [['bunBottom', 0.26], ['lettuce', 0.05], ['tomato', 0.07], ['grilled', 0.25], ['ranch', 0.025], ['bunTop', 0]],
    dynamite: [['bunBottom', 0.26], ['slaw', 0.06], ['chicken', 0.25], ['dyn', 0.025], ['bunTop', 0]],
    mozz: [['bunBottom', 0.26], ['lettuce', 0.05], ['mozzp', 0.28], ['swiss', 0.06, 9], ['marinara', 0.025], ['bunTop', 0]],
    hero: [['bunBottom', 0.26], ['lettuce', 0.06], ['tomato', 0.07], ['patty', 0.16], ['cheese', 0.06], ['patty', 0.16, 11], ['cheese', 0.06, 5], ['pickles', 0.05], ['bunTop', 0]]
  };

  function make(kind, seed) {
    switch (kind) {
      case 'bunBottom': return bunBottom(seed);
      case 'bunTop': return bunTop(seed);
      case 'patty': return patty(seed);
      case 'cheese': return cheese('#F4A91E', seed);
      case 'pickles': return pickles(seed);
      case 'lettuce': return lettuce(seed);
      case 'tomato': return tomato();
      case 'chicken': return chicken(seed);
      case 'bbq': return glaze('#4A1A0C', 0.18, 1.0, seed);
      case 'hot': return glaze('#B3260F', 0.2, 0.9, seed);
      case 'rings': return rings(seed, 3);
      case 'jalapenos': return jalapenos(seed);
      case 'swiss': return cheese('#F2DC8A', seed);
      case 'mush': return mushrooms(seed);
      case 'bacon': return bacon(seed);
      case 'egg': return egg(seed);
      case 'ooze': return ooze(seed);
      case 'grilled': return chicken(seed, { grill: true, base: '#D49A5A' });
      case 'mozzp': return chicken(seed, { base: '#D8A547', palette: ['#EBC066', '#C48B2E', '#F4D58C'], thick: 0.3 });
      case 'slaw': return lettuce(seed, '#CFE08A');
      case 'ranch': return glaze('#F4ECD8', 0.2, 0.95, seed);
      case 'dyn': return glaze('#E2582A', 0.2, 0.95, seed);
      case 'marinara': return glaze('#B3261A', 0.18, 0.9, seed);
    }
  }

  function create(variant) {
    if (PROPS[variant]) { var pg = PROPS[variant](); return { group: pg, layers: [], height: pg.userData.h || 1, setExplode: function () {} }; }
    var recipe = RECIPES[variant] || RECIPES.og;
    var group = new T.Group(), layers = [], y = 0;
    recipe.forEach(function (r, i) {
      var seed = (r[2] || 3) + i * 17;
      var mesh = make(r[0], seed);
      // bun top & bottom pivot at their base; others are centred on their thickness
      var baseOffset = (r[0] === 'bunBottom' || r[0] === 'bunTop' || r[0] === 'pickles' || r[0] === 'rings' || r[0] === 'jalapenos' || r[0] === 'mush' || r[0] === 'bacon' || r[0] === 'egg') ? 0 : r[1] / 2;
      var cheeseLift = r[0] === 'cheese' ? 0.04 : 0;
      mesh.position.y = y + baseOffset + cheeseLift;
      mesh.rotation.y = i * 0.7;
      group.add(mesh);
      layers.push({ mesh: mesh, restY: mesh.position.y, restRotY: mesh.rotation.y, kind: r[0] });
      y += r[1];
    });
    var height = y + BUN_TOP_H;
    function setExplode(e) {
      var n = layers.length, gap = 0.5;
      layers.forEach(function (L, i) {
        L.mesh.position.y = L.restY + (i - (n - 1) / 2) * gap * e + (i === n - 1 ? 0.12 * e : 0);
        L.mesh.rotation.y = L.restRotY + (i % 2 ? 1 : -1) * 0.5 * e;
      });
    }
    return { group: group, layers: layers, height: height, setExplode: setExplode };
  }

  // ---------- environment & shadow ----------
  function environment(renderer) {
    var s = new T.Scene();
    var room = new T.Mesh(new T.BoxGeometry(30, 20, 30), new T.MeshBasicMaterial({ color: new T.Color('#1b1511'), side: T.BackSide }));
    s.add(room);
    function panel(w, h, x, y, z, rx, ry, c) {
      var m = new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshBasicMaterial({ color: new T.Color(c, c, c), side: T.DoubleSide, toneMapped: false }));
      m.position.set(x, y, z); m.rotation.set(rx, ry, 0); s.add(m);
    }
    panel(9, 6, -8, 7, 6, -0.7, 0.9, 7);     // big warm key softbox
    panel(5, 8, 10, 3, 3, 0, -1.2, 3.2);     // cool-ish fill strip
    panel(14, 3, 0, 9, -8, 0.9, 0, 4);       // top/back rim
    var pm = new T.PMREMGenerator(renderer);
    var tex = pm.fromScene(s, 0.035).texture;
    pm.dispose();
    return tex;
  }

  function shadowBlob() {
    var c = document.createElement('canvas'); c.width = c.height = 256;
    var g = c.getContext('2d'), gr = g.createRadialGradient(128, 128, 8, 128, 128, 126);
    gr.addColorStop(0, 'rgba(0,0,0,0.62)'); gr.addColorStop(0.5, 'rgba(0,0,0,0.28)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 256, 256);
    var tex = new T.CanvasTexture(c);
    var m = new T.Mesh(new T.PlaneGeometry(3.6, 3.6), new T.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false }));
    m.rotation.x = -Math.PI / 2;
    return m;
  }

  function init(THREE_) {
    T = THREE_;
    if (T.ColorManagement) { if ('legacyMode' in T.ColorManagement) T.ColorManagement.legacyMode = false; else T.ColorManagement.enabled = true; }
  }

  global.SmashedBurger = { init: init, create: create, environment: environment, shadowBlob: shadowBlob, BUN_R: BUN_R, blotch: blotch, rng: rng };
})(__g);

export default __g.SmashedBurger;
