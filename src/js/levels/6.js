import "../../scss/style.scss";
import "../../scss/levels.scss";
import React from 'react';
import ReactDOM from 'react-dom';
const THREE = require('three');
import {VRButton} from '../support/VRButton.js';

let scene, camera, renderer, cube;
let levelNum, csrf;
let targetNum = "";
const keyLength = 5;

const Level6 = (props) => {
    return (
        <div id="overhead">
            <h1 className="tight">Level 6: WebVR</h1>
            <h2>Let's get motion sick!</h2>
            <canvas id="three-canvas" width="640" height="480"></canvas>
        </div>
    );
}


const init = () => {
    fetch('/csrf')
    .then(res => res.json())
    .then(data => {
        csrf = data.csrfToken;
        main();
    });
}

const main = () => {
    console.log("Hint: Think about what base this string of numbers is in.");
    console.log("Another hint: You'll need a VR Headset of some sort to complete this level.");
    console.log("Oh, and if you have a PC-based VR headset, try Firefox.");
    const app = document.querySelector('#app');
    ReactDOM.render(
        <Level6 />,
        app
    );
    const urlParams = new URLSearchParams(window.location.search);
    levelNum = parseInt(urlParams.get('num'));

    const canvas = document.querySelector('#three-canvas');
    renderer = new THREE.WebGLRenderer({canvas});
    renderer.setClearColor(0x111111);

    camera = new THREE.PerspectiveCamera(75, 640/480, 0.1, 10);
    camera.position.set(0, 0, 0);
    camera.near = 0.01;
    camera.far = 30;

    scene = new THREE.Scene();

    // Generate the binary hacker stuff
    let binaryGroup = new THREE.Group();
    const binaryString = [];
    let fontLoader = new THREE.FontLoader();
    fontLoader.load('assets/media/helvetiker_bold.typeface.json', font => {
        const material = new THREE.MeshBasicMaterial({color: 0x00FF00});
        const keyMaterial = new THREE.MeshBasicMaterial({color: 0xFFFF00});
        const height = 50;
        const rings = 10;
        const radius = 10;
        const vertsPerRing = 20;
        for (let i = 0; i < rings; ++i) {
            let center = new THREE.Vector3(camera.position.x, (camera.position.y - height/2) + (i / rings) * height, camera.position.z);
            for (let j = 0; j < vertsPerRing; ++j) {
                const angle = (j / vertsPerRing) * (Math.PI * 2);
                const vertPos = new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius).add(center);
                let text = Math.random() < 0.5 ? '0' : '1';
                const geometry = new THREE.TextGeometry(text, {font, size: 1, height: 1});
                const textMesh = new THREE.Mesh(geometry, material);
                textMesh.position.copy(vertPos);
                textMesh.lookAt(camera.position);
                binaryGroup.add(textMesh);
                binaryString.push(text);
            }
        }
        scene.add(binaryGroup);

        // Figure out what the secret key is
        let startIndex = parseInt(Math.random() * (binaryString.length - keyLength));
        for (let i = startIndex; i < startIndex + keyLength; ++i) {
            targetNum += binaryString[i];
            binaryGroup.children[i].material = keyMaterial;
        }
    });


    const dirLight = new THREE.DirectionalLight("white", 1.0);
    dirLight.position.set(1, 2, 4);
    scene.add(dirLight);


    renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
    });

    app.appendChild(VRButton.createButton(renderer));
    renderer.vr.enabled = true;
};

window.binary = (key) => {
    if (key !== targetNum) {
        console.error('The number provided is incorrect. Make sure the number is passed in as a string');
        return;
    }
    
    fetch(`/level?num=${levelNum}&_csrf=${csrf}`, {
        method: 'POST',
    })
    .then(res => {
        if (res.status === 200) {
            window.location.href = '/level-select';
        }
    })
    .catch(err => {
        console.log(err);
    });
}

window.onload = init;
