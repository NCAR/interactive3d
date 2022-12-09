import 'style.css';
import * as THREE from 'node_modules/three';
import {OrbitControls} from 'node_modules/three/examples/jsm/controls/OrbitControls.js';
// import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {GLTFLoader} from 'node_modules/three/examples/jsm/loaders/GLTFLoader.js';

console.log("no .");

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(5);
camera.position.setY(10);

// renderer.render(scene, camera);




const gltfLoader = new GLTFLoader();
const url = './objects/Greenland.glb';
// const texture = new THREE.TextureLoader().load('img/i.1.jpg');

// https://stackoverflow.com/questions/37884013/adding-video-as-texture-in-three-js
// let video = document.createElement('video');
let video = document.getElementById('video');
// video.src = 'media/streamlines_test.mp4';
// video.load();
// video.play();
// let videoImage = document.createElement('canvas');
// videoImage.width = 512;
// videoImage.height = 512;

let texture = new THREE.VideoTexture(video);


gltfLoader.load(url, (gltf) => {
    const root = gltf.scene;
    scene.add(root);

    root.children[0].material.map = texture;
});




/*
let MTLFile = 'objects/Greenland.mtl'
let OBJFile = 'objects/Greenland.obj'
let JPGFile = 'img/i.0.jpg'

new THREE.MTLLoader().load(MTLFile, function (materials) {
    materials.preload();
    new THREE.OBJLoader()
        .setMaterials(materials)
        .load(OBJFile, function (object) {
            let texture = new THREE.TextureLoader().load(JPGFile);

            object.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material.map = texture;
                }
            });
            scene.add(object);
        });
});

*/


// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(15, 12, 9);
// scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);





// Background

// const spaceTexture = new THREE.TextureLoader().load('space.jpg');
// scene.background = spaceTexture;


// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  // controls.update();


  renderer.render(scene, camera);
}

animate();
