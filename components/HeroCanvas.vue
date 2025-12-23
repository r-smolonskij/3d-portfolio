<template>
  <div class="relative flex h-full items-center justify-center">
    <div class="absolute inset-6 rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-white/0 blur-3xl" />
    <canvas ref="canvasRef" class="relative h-[420px] w-full rounded-3xl border border-white/10 bg-night-500/60 shadow-2xl" />
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three';

const canvasRef = ref<HTMLCanvasElement | null>(null);

let renderer: THREE.WebGLRenderer | null = null;
let scene: THREE.Scene | null = null;
let camera: THREE.PerspectiveCamera | null = null;
let animationId: number | null = null;
let mesh: THREE.Mesh | null = null;
let clock: THREE.Clock | null = null;
let basePositions: Float32Array | null = null;
let baseNormals: Float32Array | null = null;
let positionAttr: THREE.BufferAttribute | null = null;
let vertexSeeds: Float32Array | null = null;

const resize = () => {
  if (!canvasRef.value || !renderer || !camera) return;
  const { clientWidth } = canvasRef.value.parentElement || { clientWidth: 640 };
  const height = 420;
  camera.aspect = clientWidth / height;
  camera.updateProjectionMatrix();
  renderer.setSize(clientWidth, height, false);
};

const animate = () => {
  if (!mesh || !renderer || !scene || !camera) return;
  const t = clock ? clock.getElapsedTime() : 0;

  if (positionAttr && basePositions && baseNormals && vertexSeeds) {
    const arr = positionAttr.array as Float32Array;
    const count = basePositions.length / 3;
    for (let i = 0; i < count; i += 1) {
      const seed = vertexSeeds[i];
      const wobble = Math.sin(t * 1.3 + seed) * 0.12;
      const bx = basePositions[i * 3];
      const by = basePositions[i * 3 + 1];
      const bz = basePositions[i * 3 + 2];
      const nx = baseNormals[i * 3];
      const ny = baseNormals[i * 3 + 1];
      const nz = baseNormals[i * 3 + 2];
      arr[i * 3] = bx + nx * wobble;
      arr[i * 3 + 1] = by + ny * wobble;
      arr[i * 3 + 2] = bz + nz * wobble;
    }
    positionAttr.needsUpdate = true;
    mesh.geometry.computeVertexNormals();
  }

  mesh.rotation.y += 0.004;
  mesh.rotation.x += 0.002;
  renderer.render(scene, camera);
  animationId = requestAnimationFrame(animate);
};

onMounted(() => {
  if (!canvasRef.value) return;

  scene = new THREE.Scene();
  scene.background = new THREE.Color('#0b1021');

  camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0, 4.3);

  renderer = new THREE.WebGLRenderer({ canvas: canvasRef.value, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const geometry = new THREE.IcosahedronGeometry(1.2, 2);
  const material = new THREE.MeshStandardMaterial({
    color: '#6f7cff',
    roughness: 0.35,
    metalness: 0.4,
    emissive: '#52e1e2',
    emissiveIntensity: 0.25
  });
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  positionAttr = geometry.attributes.position as THREE.BufferAttribute;
  basePositions = new Float32Array(positionAttr.array);
  baseNormals = new Float32Array((geometry.attributes.normal as THREE.BufferAttribute).array);
  vertexSeeds = new Float32Array(basePositions.length / 3);
  for (let i = 0; i < vertexSeeds.length; i += 1) {
    vertexSeeds[i] = Math.random() * Math.PI * 2;
  }

  const ambient = new THREE.AmbientLight('#cbd5e1', 0.4);
  const keyLight = new THREE.PointLight('#52e1e2', 1.2);
  keyLight.position.set(2, 1, 3);
  const rimLight = new THREE.PointLight('#6f7cff', 1.5);
  rimLight.position.set(-3, 2, -1);
  scene.add(ambient, keyLight, rimLight);

  const starGeometry = new THREE.BufferGeometry();
  const starCount = 250;
  const positions = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
  }
  starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const starMaterial = new THREE.PointsMaterial({ color: '#94a3b8', size: 0.01 });
  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);

  clock = new THREE.Clock();
  resize();
  window.addEventListener('resize', resize);
  animate();
});

onBeforeUnmount(() => {
  if (animationId) cancelAnimationFrame(animationId);
  window.removeEventListener('resize', resize);
  renderer?.dispose();
  mesh?.geometry.dispose();
  if (mesh && mesh.material instanceof THREE.Material) {
    mesh.material.dispose();
  }
});
</script>
