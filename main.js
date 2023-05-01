var nodes = [{ id: 1, label: "Parent", color: "rgb(55, 165, 4)" }];

var edges = [];

function addNode() {
  var lastNode = nodes[nodes.length - 1];
  var newNodeId = lastNode.id + 1;
  var newNodeLabel = document.getElementById("node-label-input").value;
  var newNodeColor = lastNode.color === "rgb(86, 219, 25)" ? "rgb(238, 224, 29)" : "rgb(86, 219, 25)";
  var newNode = { id: newNodeId, label: newNodeLabel, color: newNodeColor };
  nodes.push(newNode);
  var updatedNodes = new vis.DataSet(nodes);
  network.setData({ nodes: updatedNodes, edges: edges });
  if (nodes.length > 1) {
    var fromNodeId = lastNode.id;
    var toNodeId = newNodeId;
    var newEdge = { from: fromNodeId, to: toNodeId };
    edges.push(newEdge);
    var updatedEdges = new vis.DataSet(edges);
    network.setData({ nodes: updatedNodes, edges: updatedEdges });
  }
}

function onNodeClick(event) {
  var nodeId = event.nodes[0];
  if (nodeId) {
    // Redirect to a new page with nodeId as a query parameter
    var url = "index.html?nodeId=" + nodeId;
    console.log("Redirecting to " + url);
    window.location.href = url;
  }
}

var container = document.getElementById("mynetwork");
var data = {
  nodes: nodes,
  edges: edges,
};
var options = {
  interaction: {
    selectConnectedEdges: false
  }
};

var network = new vis.Network(container, data, options);

// Add listener to input field
var nodeLabelInput = document.getElementById("node-label-input");
nodeLabelInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addNode();
  }
});

// Add click event listener to nodes
network.on("click", onNodeClick);

// Set color of child nodes when added
network.on("addNode", function (event) {
  var lastNode = nodes[nodes.length - 1];
  if (lastNode.color === "rgb(86, 219, 25)") {
    event.node.color = "rgb(238, 224, 29)";
  } else {
    event.node.color = "rgb(86, 219, 25)";
  }
});

