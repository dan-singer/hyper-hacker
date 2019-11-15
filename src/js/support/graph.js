class Node {
    constructor(room, neighbors) {
        this.room = room;
        this.neighbors = neighbors;
    }
}

class Graph {
    constructor() {
        this.nodes = [];
    }
}

export {Node, Graph};