import '../../scss/style.scss';
import '../../scss/levels.scss';
import {toggleProfile} from '../support/utils.js'

class Node {
    constructor(name, description, pickups, neighbors) {
        this.name = name;
        this.description = description;
        this.pickups = pickups;
        this.neighbors = neighbors;
    }
}

const nodes = [];
const graph = [];



const init = () => {
    document.querySelector('#profile-toggle').onclick = e => toggleProfile();
    fetch('/assets/data/rooms.json')
    .then(res => res.json())
    .then(rooms => {
        console.log(rooms);
    })
    .catch(err => {
        console.log(err);
    })
}

window.onload = init;