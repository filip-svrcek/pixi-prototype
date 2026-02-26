// import { IHexagon } from "../core/interfaces";
// import { Container } from "pixi.js";

// /**
//  * Pathfinding service using Dijkstra's algorithm
//  */
// export class PathfindingService {
//   /**
//    * Find the shortest path between two hexagons using Dijkstra's algorithm
//    */
//   static findPath(start: IHexagon, end: IHexagon): IHexagon[] {
//     // Initialize start node
//     start.tempPathCalc = { previous: null, visited: false, cost: 0 };
//     const queue: IHexagon[] = [start];

//     while (queue.length > 0) {
//       // Sort by cost (priority queue behavior)
//       queue.sort((a, b) => (a.tempPathCalc?.cost ?? 0) - (b.tempPathCalc?.cost ?? 0));
//       const current = queue.shift()!;

//       // Check if we reached the destination
//       if (current === end) {
//         break;
//       }

//       if (current.tempPathCalc && !current.tempPathCalc.visited) {
//         current.tempPathCalc.visited = true;

//         // Process neighbors
//         for (const neighbor of current.neighbors) {
//           if (!neighbor.tempPathCalc) {
//             neighbor.tempPathCalc = {
//               previous: current,
//               visited: false,
//               cost: Infinity,
//             };
//           }

//           const newCost = current.tempPathCalc.cost + 1; // Cost is 1 for each move

//           if (!neighbor.tempPathCalc.visited && newCost < neighbor.tempPathCalc.cost) {
//             neighbor.tempPathCalc.cost = newCost;
//             neighbor.tempPathCalc.previous = current;
            
//             if (!queue.includes(neighbor)) {
//               queue.push(neighbor);
//             }
//           }
//         }
//       }
//     }

//     // Reconstruct path
//     const path: IHexagon[] = [];
//     let current: IHexagon | null = end;
    
//     while (current) {
//       path.unshift(current);
//       current = current.tempPathCalc?.previous ?? null;
//     }

//     // Clean up temporary pathfinding data
//     this.cleanupPathfindingData(start.parent as Container);

//     return path;
//   }

//   /**
//    * Clean up temporary pathfinding data from hexagons
//    */
//   private static cleanupPathfindingData(board: Container): void {
//     board.children.forEach((child) => {
//       if (this.isHexagon(child)) {
//         delete child.tempPathCalc;
//       }
//     });
//   }

//   /**
//    * Type guard to check if a display object is a hexagon
//    */
//   private static isHexagon(obj: any): obj is IHexagon {
//     return obj && 'hexagonGridCoords' in obj;
//   }
// }
