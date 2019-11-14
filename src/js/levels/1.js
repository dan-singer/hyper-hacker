import "../../scss/style.scss";
import "../../scss/level1.scss";
const THREE = require('three');
const ObjLoader = require('three-obj-loader');

let scene, camera, renderer, cube;

const main = () => {
    const canvas = document.querySelector('#three-canvas');
    renderer = new THREE.WebGLRenderer({canvas});
    renderer.setClearColor(0x111111);

    camera = new THREE.PerspectiveCamera(75, 640/480, 0.1, 5);
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
            const arrowsPerRing = 50;
            const radius = 5;
            for (let i = 0; i < arrowsPerRing; ++i) {
                let angle = Math.PI * 2 * (i / arrowsPerRing);
                let x = Math.cos(angle) * radius;
                let z = Math.sin(angle) * radius;
                let pos = new THREE.Vector3(x, 0, z);
                let clone = obj.clone();
                clone.position.set(pos);
                clone.lookAt(cube.position);

                scene.add(clone); 
            }
        }
    );



    const dirLight = new THREE.DirectionalLight("white", 1.0);
    dirLight.position.set(1, 2, 4);
    scene.add(dirLight);

    renderer.render(scene, camera);
    requestAnimationFrame(render);

    // Bind variables to window so hackers can access them
    window.camera = camera;

};

const render = (time) => {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
};

window.onload = main;
