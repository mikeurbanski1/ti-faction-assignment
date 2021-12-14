const {removeFromArray, removeItemFromArray, log, clearLog, shuffle} = require("./utils");

class Graph {
  constructor() {
    this.vertices = [];
    this.playersToVertices = {};
    this.factionsToEdges = {};
    this.edges = [];
  }

  getVertex(player) {
    return this.playersToVertices[player.name];
  }

  getOrAddVertex(player) {
    if (!this.playersToVertices[player.name]) {
      const vertex = new Vertex(player);
      this.playersToVertices[player.name] = vertex;
      this.vertices.push(vertex);
    }
    return this.getVertex(player);
  }

  findEdge(p1, p2, faction) {
    return this.edges.find(edge => ((edge.v1 === p1 && edge.v2 === p2) || (edge.v2 === p1 && edge.v1 === p2)) && edge.faction === faction);
  }

  addEdge(p1, p2, faction) {
    const v1 = this.getOrAddVertex(p1);
    const v2 = this.getOrAddVertex(p2);
    const edge = new Edge(v1, v2, faction);
    this.edges.push(edge);

    if (this.factionsToEdges[faction]) {
      this.factionsToEdges[faction].push(edge);
    }
    else {
      this.factionsToEdges[faction] = [edge];
    }

    return edge;
  }

  removeVertex(vertex, removeEdges = false) {
    removeItemFromArray(this.vertices, vertex);
    delete this.playersToVertices[vertex.player.name];

    if (removeEdges) {
      vertex.edges.slice().forEach(edge => this.removeEdge(edge));
    }
  }

  removeEdge(edge, deleteEmptyVertex = false) {
    removeItemFromArray(this.edges, edge);
    removeFromArray(edge.v1.edgeEndpoints, removeItemFromArray(edge.v1.edges, edge));
    removeFromArray(edge.v2.edgeEndpoints, removeItemFromArray(edge.v2.edges, edge));

    const factionEdges = this.factionsToEdges[edge.faction];
    removeItemFromArray(factionEdges, edge);
    if (!factionEdges.length) {
      delete this.factionsToEdges[edge.faction];
    }

    if (deleteEmptyVertex) {
      if (!edge.v1.edges.length) {
        this.removeVertex(edge.v1);
      }

      if (!edge.v2.edges.length) {
        this.removeVertex(edge.v2);
      }
    }
  }

  removeEdgeByPlayer(p1, p2, faction, deleteEmptyVertex = false) {
    const edge = this.findEdge(p1, p2, faction);
    if (!edge) {
      throw `Could find find edge for ${p1.name}--${faction}--${p2.name}`;
    }
    this.removeEdge(edge, deleteEmptyVertex);
  }

  removeAllEdges(faction, deleteEmptyVertex = false) {
    const edges = this.factionsToEdges[faction].slice();
    edges.forEach(edge => this.removeEdge(edge, deleteEmptyVertex));
  }
}

class Vertex {
  constructor(player) {
    this.player = player;
    this.edges = [];
    this.edgeEndpoints = [];
  }

  isConnectedTo(player) {
    return this.edgeEndpoints.find(e => e.player === player);
  }

  shuffleEdges() {
    shuffle(this.edges);
    this.edgeEndpoints = this.edges.map(e => e.getOtherVertex(this));
  }
}

class Edge {
  constructor(v1, v2, faction) {
    this.v1 = v1;
    this.v2 = v2;
    this.faction = faction;
    this.v1.edges.push(this);
    this.v1.edgeEndpoints.push(v2);
    this.v2.edges.push(this);
    this.v2.edgeEndpoints.push(v1);
  }

  getOtherVertex(vertex) {
    return vertex === this.v1 ? this.v2 : this.v1;
  }
}

module.exports = { Graph };