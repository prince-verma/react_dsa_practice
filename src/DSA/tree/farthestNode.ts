function FarthestNodes(strArr: string[]) {
  const graph: Record<string, string[]> = {};

  // __define-ocg__: Build undirected graph from input strings
  for (let edge of strArr) {
    const [u, v] = edge.split("-");
    if (!graph[u]) graph[u] = [];
    if (!graph[v]) graph[v] = [];
    graph[u].push(v);
    graph[v].push(u);
  }

  // Helper BFS function to find farthest node and its distance
  function bfs(start: string) {
    const visited = new Set();
    const queue: [[string, number]] = [[start, 0]];
    let farthest: [string, number] = [start, 0];

    while (queue.length > 0) {
      const [node, dist] = queue.shift()!;
      visited.add(node);
      if (dist > farthest[1]) {
        farthest = [node, dist];
      }

      for (let neighbor of graph[node]) {
        if (!visited.has(neighbor)) {
          queue.push([neighbor, dist + 1]);
        }
      }
    }

    return farthest;
  }

  const varOcg = Object.keys(graph)[0]; // Start from any node
  const [farthestNode] = bfs(varOcg);   // First BFS to find farthest node
  const [_, maxDist] = bfs(farthestNode); // Second BFS to get max distance

  return maxDist;
}

// Example usage:
// console.log(FarthestNodes(["b-e","b-c","c-d","a-b","e-f"])); // Output: 4
// console.log(FarthestNodes(["b-a","c-e","b-c","d-c"]));       // Output: 3
