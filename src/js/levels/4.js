import '../../scss/style.scss';
import '../../scss/levels.scss';
import {toggleProfile} from '../support/utils.js'
import {Node, Graph} from '../support/graph.js';

let curLocation;
const inventory = new Set();
let levelNum, csrf;

const buildGraph = (data) => {
    const graph = new Graph();
    for (let i = 0; i < data.rooms.length; ++i) {
        // Build the individual nodes. Link them below
        let node = new Node(data.rooms[i], null);
        graph.nodes.push(node);
    }
    for (let i = 0; i < data.adjacencyList.length; ++i) {
        // Convert the index-based adjacency list into Node pointers
        let neighbors = [];
        for (let j = 0; j < data.adjacencyList[i].length; ++j) {
            let nodeIndex = data.adjacencyList[i][j];
            let neighborNode = graph.nodes[nodeIndex];
            neighbors.push(neighborNode);
        }
        graph.nodes[i].neighbors = neighbors;
    }
    return graph;
}

const startGame = (graph) => {
    curLocation = graph.nodes[0];
    console.log('Welcome to Level 4: Console Text Adventure!');
    console.log('To view the available commands at any time, type \"help()\"');
    console.log('-----------------------------------------------------------');
    printNode(curLocation);
}

const printNode = (node) => {
    console.log(node.room.description);
    lookAround();
}

const init = () => {

    const urlParams = new URLSearchParams(window.location.search);
    levelNum = parseInt(urlParams.get('num'));
    csrf = document.querySelector('#_csrf').value;

    document.querySelector('#profile-toggle').onclick = e => toggleProfile();
    fetch('/assets/data/rooms.json')
    .then(res => res.json())
    .then(data => {
        const graph = buildGraph(data);
        startGame(graph);
    })
    .catch(err => {
        console.log(err);
    })
}

const lookAround = () => {
    let locations = 'Adjacent Locations: ';
    for (let neighbor of curLocation.neighbors) {
        locations += neighbor.room.name + ' | ';
    }
    console.log(`%c${locations}`, 'color: orange');
};


// Hacker functions
window.goto = (destination) => {
    for (let neighbor of curLocation.neighbors) {
        if (neighbor.room.name === destination) {
            // Hard code a check for the key if this is the treasure room
            if (destination === 'Treasure Room') {
                if (inventory.has('key')) {
                    curLocation = neighbor;
                    printNode(curLocation);
                    return;
                }
                console.error('The Treasure Room requires a key!');
                return;
            }
            curLocation = neighbor;
            printNode(curLocation);
            return;
        }
    }
    console.error(`The destination ${destination} is not adjacent to you or does not exist!`);
};

window.whereAmI = () => {
    console.log(`%c${curLocation.room.name}`, 'color: green');
};
window.pickup = (target) => {
    if (curLocation.room.pickups.includes(target)) {
        inventory.add(target);
        console.log(`Picked up ${target}`);
    }
    else {
        console.error(`There is no ${target} to pick up!`);
    }
};
window.help = () => {
    console.log('Commands available:');
    console.log('%cwhereAmI() - Displays your current location', 'font-style: italic; color: orange');
    console.log('%cgoto(\"destination\") - Lets you go to a different location if you are near it', 'font-style: italic; color: orange');
    console.log('%cpickup(\"target\") - Picks up the target item', 'font-style: italic; color: orange');
};

window.win = (key) => {
    if (key !== 8675309) {
        console.error('The key you provided is incorrect! Keep looking around!');
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