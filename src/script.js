import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Timer } from "three/addons/misc/Timer.js";
import GUI from "lil-gui";
import { Sky } from "three/examples/jsm/Addons.js";

const textureLoader = new THREE.TextureLoader();

const floorAlphaTexture = textureLoader.load("/floor/alpha.jpg");
const floorARMTexture = textureLoader.load(
  "/floor/coast_sand_rocks_arm_1k.jpg"
);
const floorColorTexture = textureLoader.load(
  "/floor/coast_sand_rocks_diff_1k.jpg"
);
const floorNormalTexture = textureLoader.load(
  "/floor/coast_sand_rocks_normal_1k.jpg"
);
const floorDisplacementTexture = textureLoader.load(
  "/floor/coast_sand_rocks_disp_1k.jpg"
);
floorColorTexture.colorSpace = THREE.SRGBColorSpace;
floorColorTexture.repeat.set(8, 8);
floorColorTexture.wrapS = THREE.RepeatWrapping;
floorColorTexture.wrapT = THREE.RepeatWrapping;
floorNormalTexture.repeat.set(8, 8);
floorNormalTexture.wrapS = THREE.RepeatWrapping;
floorNormalTexture.wrapT = THREE.RepeatWrapping;
floorARMTexture.repeat.set(8, 8);
floorARMTexture.wrapS = THREE.RepeatWrapping;
floorARMTexture.wrapT = THREE.RepeatWrapping;

const wallColorTexture = textureLoader.load("/wall/rock_wall_13_diff.jpg");
const wallARMTexture = textureLoader.load("/wall/rock_wall_13_arm.jpg");
const wallNormalTexture = textureLoader.load("/wall/rock_wall_13_nor.jpg");
wallColorTexture.colorSpace = THREE.SRGBColorSpace;
wallColorTexture.repeat.set(3, 3);
wallColorTexture.wrapS = THREE.RepeatWrapping;
wallColorTexture.wrapT = THREE.RepeatWrapping;
wallNormalTexture.repeat.set(3, 3);
wallNormalTexture.wrapS = THREE.RepeatWrapping;
wallNormalTexture.wrapT = THREE.RepeatWrapping;
wallARMTexture.repeat.set(3, 3);
wallARMTexture.wrapS = THREE.RepeatWrapping;
wallARMTexture.wrapT = THREE.RepeatWrapping;

const roofColorTexture = textureLoader.load("/roof/roof_slates_02_diff.jpg");
const roofARMTexture = textureLoader.load("/roof/roof_slates_02_arm.jpg");
const roofNormalTexture = textureLoader.load("/roof/roof_slates_02_nor.jpg");
roofColorTexture.colorSpace = THREE.SRGBColorSpace;
roofColorTexture.repeat.set(3, 1);
roofColorTexture.wrapS = THREE.RepeatWrapping;
roofNormalTexture.repeat.set(3, 1);
roofNormalTexture.wrapS = THREE.RepeatWrapping;
roofARMTexture.repeat.set(3, 1);
roofARMTexture.wrapS = THREE.RepeatWrapping;

const bushColorTexture = textureLoader.load(
  "/bush/leaves_forest_ground_diff.jpg"
);
const bushARMTexture = textureLoader.load("/bush/leaves_forest_ground_arm.jpg");
const bushNormalTexture = textureLoader.load(
  "/bush/leaves_forest_ground_nor.jpg"
);
bushColorTexture.colorSpace = THREE.SRGBColorSpace;
bushColorTexture.repeat.set(2, 1);
bushColorTexture.wrapS = THREE.RepeatWrapping;
bushNormalTexture.repeat.set(2, 1);
bushNormalTexture.wrapS = THREE.RepeatWrapping;
bushARMTexture.repeat.set(2, 1);
bushARMTexture.wrapS = THREE.RepeatWrapping;

const graveColorTexture = textureLoader.load(
  "/grave/plastered_stone_wall_diff.jpg"
);
const graveARMTexture = textureLoader.load(
  "/grave/plastered_stone_wall_arm.jpg"
);
const graveNormalTexture = textureLoader.load(
  "/grave/plastered_stone_wall_nor.jpg"
);
graveColorTexture.colorSpace = THREE.SRGBColorSpace;
graveColorTexture.repeat.set(0.3, 0.4);
graveNormalTexture.repeat.set(0.3, 0.4);
graveARMTexture.repeat.set(0.3, 0.4);

const doorColorTexture = textureLoader.load("/door/color.jpg");
doorColorTexture.colorSpace = THREE.SRGBColorSpace;
const doorAlphaTexture = textureLoader.load("/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("/door/height.jpg");
const doorNormalTexture = textureLoader.load("/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load("/door/metalness.jpg");
const doorRoughnessTexture = textureLoader.load("/door/roughness.jpg");

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
// scene.fog = new THREE.Fog("#ff0000", 10, 13);
scene.fog = new THREE.FogExp2("#04343f", 0.1);

/**
 * House
 */
// Temporary sphere
// const sphere = new THREE.Mesh(
//   new THREE.SphereGeometry(1, 32, 32),
//   new THREE.MeshStandardMaterial({ roughness: 0.7 })
// );
// scene.add(sphere);

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20, 100, 100),
  new THREE.MeshStandardMaterial({
    map: floorColorTexture,
    displacementMap: floorDisplacementTexture,
    displacementScale: 0.3,
    displacementBias: -0.2,
    normalMap: floorNormalTexture,
    aoMap: floorARMTexture,
    roughnessMap: floorARMTexture,
    metalnessMap: floorARMTexture,
    alphaMap: floorAlphaTexture,
    transparent: true,
  })
);
floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);
gui
  .add(floor.material, "displacementScale")
  .min(0)
  .max(1)
  .step(0.001)
  .name("floorDisplacementScale");
gui
  .add(floor.material, "displacementBias")
  .min(-1)
  .max(1)
  .step(0.001)
  .name("floorDisplacementBias");

const house = new THREE.Group();
scene.add(house);

const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({
    map: wallColorTexture,
    normalMap: wallNormalTexture,
    aoMap: wallARMTexture,
    roughnessMap: wallARMTexture,
    metalnessMap: wallARMTexture,
  })
);
walls.position.y += 1.25;
house.add(walls);

const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, 1.5, 4),
  new THREE.MeshStandardMaterial({
    map: roofColorTexture,
    normalMap: roofNormalTexture,
    aoMap: roofARMTexture,
    roughnessMap: roofARMTexture,
    metalnessMap: roofARMTexture,
  })
);
roof.position.y += 3.25;
roof.rotation.y = Math.PI * 0.25;
house.add(roof);

const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    normalMap: doorNormalTexture,
    aoMap: doorAmbientOcclusionTexture,
    roughnessMap: doorRoughnessTexture,
    metalnessMap: doorMetalnessTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.15,
    displacementBias: -0.04,
    alphaMap: doorAlphaTexture,
    transparent: true,
  })
);
door.position.y = 1;
door.position.z += 2.01;
house.add(door);

const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({
  color: "#ccffcc",
  map: bushColorTexture,
  normalMap: bushNormalTexture,
  aoMap: bushARMTexture,
  roughnessMap: bushARMTexture,
  metalnessMap: bushARMTexture,
});

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);
bush1.rotation.x = -0.75;

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.1);
bush2.rotation.x = -0.75;

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.8, 0.1, 2.2);
bush3.rotation.x = -0.75;

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1, 0.05, 2.6);
bush4.rotation.x = -0.75;

house.add(bush1, bush2, bush3, bush4);

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({
  map: graveColorTexture,
  normalMap: graveNormalTexture,
  aoMap: graveARMTexture,
  roughnessMap: graveARMTexture,
  metalnessMap: graveARMTexture,
});

const graves = new THREE.Group();
scene.add(graves);

for (let i = 0; i < 30; i++) {
  const angle = Math.random() * Math.PI * 2;
  const radius = 3 + Math.random() * 4;

  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  grave.position.set(
    Math.sin(angle) * radius,
    Math.random() * 0.4,
    Math.cos(angle) * radius
  );
  grave.rotation.set(
    (Math.random() - 0.5) * 0.4,
    (Math.random() - 0.5) * 0.4,
    (Math.random() - 0.5) * 0.4
  );

  graves.add(grave);
}

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#86cdff", 0.275);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight("#86cdff", 1);
directionalLight.position.set(3, 2, -8);
scene.add(directionalLight);

const doorLight = new THREE.PointLight("#ff7d46", 5);
doorLight.position.set(0, 2.2, 2.5);
house.add(doorLight);

/**
 * Ghosts
 */

const ghost1 = new THREE.PointLight("#8800ff", 6);
const ghost2 = new THREE.PointLight("#ff0088", 6);
const ghost3 = new THREE.PointLight("#ff0000", 6);
scene.add(ghost1, ghost2, ghost3);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

directionalLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;

walls.castShadow = true;
walls.receiveShadow = true;
roof.castShadow = true;
floor.receiveShadow = true;

graves.children.forEach((grave) => {
  grave.castShadow = true;
  grave.receiveShadow = true;
});

directionalLight.shadow.mapSize.width = 256;
directionalLight.shadow.mapSize.height = 256;
directionalLight.shadow.camera.top = 8;
directionalLight.shadow.camera.right = 8;
directionalLight.shadow.camera.bottom = -8;
directionalLight.shadow.camera.left = -8;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 20;

ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 10;
ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 10;
ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 10;

/**
 * Sky
 */
const sky = new Sky();
sky.scale.set(100, 100, 100);
sky.material.uniforms["turbidity"].value = 10;
sky.material.uniforms["rayleigh"].value = 3;
sky.material.uniforms["mieCoefficient"].value = 0.1;
sky.material.uniforms["mieDirectionalG"].value = 0.95;
sky.material.uniforms["sunPosition"].value.set(0.3, -0.038, -0.95);
scene.add(sky);

/**
 * Animate
 */
const timer = new Timer();

const tick = () => {
  // Timer
  timer.update();
  const elapsedTime = timer.getElapsed();

  const ghost1Angle = elapsedTime * 0.5;
  ghost1.position.x = Math.cos(ghost1Angle) * 4;
  ghost1.position.y = Math.sin(ghost1Angle) * Math.sin(ghost1Angle * 2.34);
  ghost1.position.z = Math.sin(ghost1Angle) * 4;
  const ghost2Angle = -elapsedTime * 0.38;
  ghost2.position.x = Math.cos(ghost2Angle) * 5;
  ghost2.position.y = Math.sin(ghost2Angle) * Math.sin(ghost2Angle * 2.34);
  ghost2.position.z = Math.sin(ghost2Angle) * 5;
  const ghost3Angle = elapsedTime * 0.23;
  ghost3.position.x = Math.cos(ghost3Angle) * 6;
  ghost3.position.y = Math.sin(ghost3Angle) * Math.sin(ghost3Angle * 2.34);
  ghost3.position.z = Math.sin(ghost3Angle) * 6;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
