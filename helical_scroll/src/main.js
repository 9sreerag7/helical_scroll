import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

let scene, camera, renderer, cards = [], light, cylinder, logoTexture, logoMesh;
let scrollY = 0;

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000); // Dark background

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 20); // Adjust camera position

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Load the logo texture
    const textureLoader = new THREE.TextureLoader();
    logoTexture = textureLoader.load("public/advyka_logo.jpg");

    // Spotlight effect
    const cylinderGeometry = new THREE.CylinderGeometry(4, 4, 100, 64);
    const cylinderMaterial = new THREE.MeshBasicMaterial({
        color: 0xcccccc,
        emissive: 0xcccccc,
        transparent: true,
        opacity: 0.4
    });
    cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    scene.add(cylinder);

    light = new THREE.PointLight(0xffffff, 10, 100);
    light.position.set(0, 0, 5);
    scene.add(light);

    // Add logo
    const logoGeometry = new THREE.PlaneGeometry(6, 6);
    const logoMaterial = new THREE.MeshBasicMaterial({ map: logoTexture, transparent: true });
    logoMesh = new THREE.Mesh(logoGeometry, logoMaterial);
    logoMesh.position.set(0, 0, 5);
    scene.add(logoMesh);

    // Image file paths (from your uploaded files)
    const imagePaths = [
        "public/IMG_3419.JPG",
        "public/IMG_3723.JPG",
        "public/IMG_6027.JPG",
        "public/IMG_6003.JPG",
        "public/IMG_5604.JPG",
        "public/IMG_4133.JPG",
        "public/IMG_4844.JPG",
        "public/IMG_4731.JPG",
        "public/IMG_4674.JPG",
        "public/IMG_4352.JPG"
    ];

    // Load images as textures and create cards
    imagePaths.forEach((path, i) => {
        const texture = textureLoader.load(path);
        const cardGeometry = new THREE.PlaneGeometry(6, 4);
        const cardMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
        const card = new THREE.Mesh(cardGeometry, cardMaterial);
        scene.add(card);
        cards.push(card);
    });

    updateCardPositions();
    window.addEventListener("wheel", onScroll);
    animate();
}

function updateCardPositions() {
    cards.forEach((card, i) => {
        const angle = (i - scrollY * 0.1) * 1.2;
        card.position.set(
            Math.cos(angle) * 7,
            (i - scrollY * 0.1) * 2.5 - 7,
            Math.sin(angle) * 7
        );
        card.lookAt(new THREE.Vector3(0, (i - scrollY * 0.1) * 2.5 - 7, 0));
    });
}

function onScroll(event) {
    scrollY += event.deltaY * 0.01;
    gsap.to(cards, { duration: 0.5, onUpdate: updateCardPositions, ease: "power1.out" });
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

init();













