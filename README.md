# Knight's Shortest Path Finder

This project visualizes the shortest path a knight can take between two positions on a chessboard using Breadth-First Search (BFS).

## Features

- Interactive chessboard where you can select start and end positions
- Visualizes the shortest path with different colors
- Shows step-by-step path information
- Random position generator
- Responsive design that works on mobile and desktop

## How to Use

1. Select a start position by clicking on a square and choosing "Start"
2. Select an end position by clicking on a square and choosing "End"
3. Click "Find Path" to see the shortest path
4. Alternatively, click "Random Positions" to generate random start and end positions

The path will be displayed on the chessboard with:
- Blue for the starting position
- Red for the ending position
- Green for the path squares
- Gold for the intermediate moves

## Implementation Details

The algorithm uses Breadth-First Search (BFS) to find the shortest path. BFS is ideal for unweighted graphs where we want to find the shortest path between two nodes.

The chessboard is represented implicitly - we don't build a graph structure but instead calculate possible moves dynamically during traversal.

## Technologies Used

- HTML5, CSS3, JavaScript (ES6)
- No external libraries or frameworks# Knight Travails
