// Create the scene with a white background
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

// Set up the camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 1, 5);

// Get the canvas element
const canvas = document.getElementById("three-canvas");

// Create the renderer using the canvas
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Add lighting to brighten the scene
const directionalLight = new THREE.DirectionalLight(0xffffff, 3.5);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 5.5);
scene.add(ambientLight);

const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 2);
hemisphereLight.position.set(0, 20, 0);
scene.add(hemisphereLight);

// Load the bike model using GLTFLoader
const loader = new THREE.GLTFLoader();
let bikeModel;
const modelURL = 'https://Surajcuriousanimator.github.io/3d-causal-graph/models/Bike.glb';
loader.load(
  modelURL,
  (gltf) => {
    bikeModel = gltf.scene;
    scene.add(bikeModel);
    bikeModel.position.set(0, 0, 0);
  },
  undefined,
  (error) => {
    console.error('Error loading bike model:', error);
  }
);

// Set up OrbitControls for free rotation
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1;
controls.rotateSpeed = 0.5;

// Handle window resizing
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
