const canvas = document.getElementById('holograma');
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize(140, 140);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000, 0);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
camera.position.set(0, 2.5, 6);
camera.lookAt(0, 0.5, 0);

// Luces
const ambientLight = new THREE.AmbientLight(0x00ffcc, 0.5);
scene.add(ambientLight);
const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
dirLight.position.set(3, 5, 3);
scene.add(dirLight);
const backLight = new THREE.DirectionalLight(0x0088ff, 0.4);
backLight.position.set(-3, 2, -2);
scene.add(backLight);

// Material tipo holograma
const mat = new THREE.MeshStandardMaterial({
  color: 0x00ffcc,
  emissive: 0x003322,
  metalness: 0.3,
  roughness: 0.4,
  transparent: true,
  opacity: 0.9
});

const matOscuro = new THREE.MeshStandardMaterial({
  color: 0x009977,
  emissive: 0x001a11,
  metalness: 0.5,
  roughness: 0.3,
  transparent: true,
  opacity: 0.85
});

const grupo = new THREE.Group();

// ── Base del robot ──
const base = new THREE.Mesh(
  new THREE.CylinderGeometry(0.65, 0.75, 0.25, 24),
  matOscuro
);
base.position.y = 0;
grupo.add(base);

// ── Columna vertical (cuerpo) ──
const columna = new THREE.Mesh(
  new THREE.CylinderGeometry(0.22, 0.25, 0.9, 16),
  mat
);
columna.position.y = 0.575;
grupo.add(columna);

// ── Articulación J1 ──
const j1 = new THREE.Mesh(
  new THREE.SphereGeometry(0.22, 16, 16),
  matOscuro
);
j1.position.y = 1.05;
grupo.add(j1);

// ── Brazo 1 ──
const brazo1 = new THREE.Mesh(
  new THREE.BoxGeometry(1.3, 0.18, 0.22),
  mat
);
brazo1.position.set(0.65, 1.05, 0);
grupo.add(brazo1);

// ── Articulación J2 ──
const j2 = new THREE.Mesh(
  new THREE.SphereGeometry(0.17, 16, 16),
  matOscuro
);
j2.position.set(1.3, 1.05, 0);
grupo.add(j2);

// ── Brazo 2 ──
const brazo2 = new THREE.Mesh(
  new THREE.BoxGeometry(0.95, 0.15, 0.18),
  mat
);
brazo2.position.set(1.82, 1.05, 0);
grupo.add(brazo2);

// ── Eje Z (cabezal) ──
const ejeZ = new THREE.Mesh(
  new THREE.CylinderGeometry(0.09, 0.09, 0.55, 12),
  matOscuro
);
ejeZ.position.set(2.33, 0.77, 0);
grupo.add(ejeZ);

// ── Efector final ──
const efector = new THREE.Mesh(
  new THREE.CylinderGeometry(0.07, 0.11, 0.18, 12),
  mat
);
efector.position.set(2.33, 0.47, 0);
grupo.add(efector);

// Centrar el grupo
grupo.position.x = -1.1;
scene.add(grupo);

// ── Animación ──
function animar() {
  requestAnimationFrame(animar);
  grupo.rotation.y += 0.012;
  renderer.render(scene, camera);
}
animar();
