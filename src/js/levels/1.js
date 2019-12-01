import "../../scss/style.scss";
import "../../scss/levels.scss";
import React from 'react';
import ReactDOM from 'react-dom';
const THREE = require('three');
const ObjLoader = require('three-obj-loader');


let scene, camera, renderer, cube;
let levelNum, csrf;

const init = () => {
    fetch('/csrf')
    .then(res => res.json())
    .then(data => {
        main(data.csrfToken);
    });
}

const main = (csrf) => {


    ReactDOM.render(
        <div id="overhead">
            <h1 className="tight">Level 1: No Context</h1>
            <h2>There are at least <a href="https://threejs.org/">Three</a> ways of solving this.</h2>
            <canvas id="three-canvas" width="640" height="480"></canvas>
        </div>,
        document.querySelector('#app')
    );

    console.log('Welcome to Level 1! You are in the right place! Start typing \"set\" and see what options are available to you...');

    const urlParams = new URLSearchParams(window.location.search);
    levelNum = parseInt(urlParams.get('num'));

    const canvas = document.querySelector('#three-canvas');
    renderer = new THREE.WebGLRenderer({canvas});
    renderer.setClearColor(0x111111);

    camera = new THREE.PerspectiveCamera(75, 640/480, 0.1, 10);
    camera.position.z = 2;

    scene = new THREE.Scene();


    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({color: 0x00FF00});
    cube = new THREE.Mesh(boxGeometry, material);
    cube.position.set(4, 0, 0);
    scene.add(cube);
    

    // Load the arrow model
    ObjLoader(THREE);
    let loader = new THREE.OBJLoader();
    loader.load(
        'assets/media/arrow.obj',
        (obj) => {            
            obj.scale.set(0.1,0.1,0.1);
            const arrowsPerRing = 15;
            const rings = 20;
            const radius = 5;
            for (let i = 0; i < rings; ++i) {
                let axis = new THREE.Vector3(radius, 0, 0);
                let axisPitch = Math.PI * 2 * (i / rings);
                axis.applyEuler(new THREE.Euler(0, 0, axisPitch));
                for (let j = 0; j < arrowsPerRing; ++j) {
                    let axisYaw = Math.PI * 2 / arrowsPerRing;
                    axis.applyEuler(new THREE.Euler(0, axisYaw, 0));
                    let clone = obj.clone();
                    clone.position.set(axis.x, axis.y, axis.z);
                    clone.lookAt(cube.position);
                    scene.add(clone); 
                }
            }

        }
    );


    canvas.onclick = e => {
        // @see https://discourse.threejs.org/t/click-event-on-object/1320/2
        // @see https://www.pericror.com/software/creating-3d-objects-with-click-handlers-using-three-js/
        let raycaster = new THREE.Raycaster();
        let mouse = {
            x: (e.layerX / canvas.clientWidth) * 2 - 1,
            y: -(e.layerY / canvas.clientHeight) * 2 + 1
        }
        raycaster.setFromCamera(mouse, camera);
        let intersects = raycaster.intersectObject(cube, true);
        if (intersects.length > 0) {

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
    }


    const dirLight = new THREE.DirectionalLight("white", 1.0);
    dirLight.position.set(1, 2, 4);
    scene.add(dirLight);

    renderer.render(scene, camera);
    requestAnimationFrame(render);

};

window.setPitch = (pitch) => {
    camera.rotation.x = pitch;
}

window.setYaw = (yaw) => {
    camera.rotation.y = yaw;
}

const render = (time) => {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
};

window.onload = init;
