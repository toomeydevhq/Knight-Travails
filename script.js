document.addEventListener('DOMContentLoaded', () => {
    const chessboard = document.getElementById('chessboard');
    const startXInput = document.getElementById('startX');
    const startYInput = document.getElementById('startY');
    const endXInput = document.getElementById('endX');
    const endYInput = document.getElementById('endY');
    const findPathBtn = document.getElementById('findPath');
    const randomizeBtn = document.getElementById('randomize');
    const pathSteps = document.getElementById('pathSteps');
    const pathInfo = document.getElementById('pathInfo');

    let selectedStart = [0, 0];
    let selectedEnd = [7, 7];
    let path = [];

    // Initialize chessboard
    function initializeBoard() {
        chessboard.innerHTML = '';
        for (let y = 7; y >= 0; y--) {
            for (let x = 0; x < 8; x++) {
                const square = document.createElement('div');
                square.className = `square ${(x + y) % 2 === 0 ? 'light' : 'dark'}`;
                square.dataset.x = x;
                square.dataset.y = y;

                // Add coordinates
                const xCoord = document.createElement('span');
                xCoord.className = 'coordinate x-coord';
                xCoord.textContent = x;
                square.appendChild(xCoord);

                const yCoord = document.createElement('span');
                yCoord.className = 'coordinate y-coord';
                yCoord.textContent = y;
                square.appendChild(yCoord);

                // Add click event
                square.addEventListener('click', () => handleSquareClick(x, y));

                chessboard.appendChild(square);
            }
        }
        updateBoard();
    }

    // Handle square click
    function handleSquareClick(x, y) {
        const isStartSelected = document.querySelector('.start-select');
        const isEndSelected = document.querySelector('.end-select');

        if (isStartSelected) {
            selectedStart = [x, y];
            startXInput.value = x;
            startYInput.value = y;
            isStartSelected.classList.remove('start-select');
        } else if (isEndSelected) {
            selectedEnd = [x, y];
            endXInput.value = x;
            endYInput.value = y;
            isEndSelected.classList.remove('end-select');
        } else {
            // Ask user what they want to select
            const selection = prompt("Select as (1) Start or (2) End point? Enter 1 or 2");
            if (selection === '1') {
                selectedStart = [x, y];
                startXInput.value = x;
                startYInput.value = y;
            } else if (selection === '2') {
                selectedEnd = [x, y];
                endXInput.value = x;
                endYInput.value = y;
            }
        }
        updateBoard();
    }

    // Update board visualization
    function updateBoard() {
        const squares = document.querySelectorAll('.square');
        squares.forEach(square => {
            square.classList.remove('start', 'end', 'path', 'move', 'start-select', 'end-select');
            
            const x = parseInt(square.dataset.x);
            const y = parseInt(square.dataset.y);

            // Check if square is in path
            const pathIndex = path.findIndex(pos => pos[0] === x && pos[1] === y);
            if (pathIndex !== -1) {
                square.classList.add('path');
                if (pathIndex === 0) square.classList.add('start');
                else if (pathIndex === path.length - 1) square.classList.add('end');
                else square.classList.add('move');

                // Add knight icon to path squares
                const knight = document.createElement('div');
                knight.className = 'knight';
                knight.textContent = '♞';
                square.appendChild(knight);
            }

            // Highlight start and end
            if (x === selectedStart[0] && y === selectedStart[1]) {
                square.classList.add('start');
                const knight = document.createElement('div');
                knight.className = 'knight';
                knight.textContent = '♞';
                square.appendChild(knight);
            }
            if (x === selectedEnd[0] && y === selectedEnd[1]) {
                square.classList.add('end');
            }
        });

        // Update path information
        updatePathInfo();
    }

    // Update path information display
    function updatePathInfo() {
        pathSteps.innerHTML = '';
        
        if (path.length === 0) {
            pathInfo.querySelector('p').textContent = 'Select start and end positions, then click "Find Path"';
            return;
        }

        pathInfo.querySelector('p').textContent = `You made it in ${path.length - 1} moves! Here's your path:`;
        
        path.forEach((pos, index) => {
            const step = document.createElement('div');
            step.className = `step ${index === 0 ? 'start' : ''} ${index === path.length - 1 ? 'end' : ''}`;
            step.textContent = `[${pos[0]}, ${pos[1]}]`;
            pathSteps.appendChild(step);
        });
    }

    // Knight's moves function
    function knightMoves(start, end) {
        // Possible knight moves (dx, dy)
        const moves = [
            [2, 1], [1, 2], [-1, 2], [-2, 1],
            [-2, -1], [-1, -2], [1, -2], [2, -1]
        ];

        // Queue for BFS
        const queue = [[start]];
        const visited = new Set();
        visited.add(start.toString());

        while (queue.length > 0) {
            const path = queue.shift();
            const [x, y] = path[path.length - 1];

            // Check if we've reached the end
            if (x === end[0] && y === end[1]) {
                return path;
            }

            // Explore all possible moves
            for (const [dx, dy] of moves) {
                const newX = x + dx;
                const newY = y + dy;

                // Check if move is valid (within board)
                if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
                    const newPos = [newX, newY];
                    if (!visited.has(newPos.toString())) {
                        visited.add(newPos.toString());
                        queue.push([...path, newPos]);
                    }
                }
            }
        }

        return []; // Should never happen for a knight on chessboard
    }

    // Event listeners
    findPathBtn.addEventListener('click', () => {
        const startX = parseInt(startXInput.value);
        const startY = parseInt(startYInput.value);
        const endX = parseInt(endXInput.value);
        const endY = parseInt(endYInput.value);

        // Validate inputs
        if (isNaN(startX) || startX < 0 || startX > 7 ||
            isNaN(startY) || startY < 0 || startY > 7 ||
            isNaN(endX) || endX < 0 || endX > 7 ||
            isNaN(endY) || endY < 0 || endY > 7) {
            alert('Please enter valid coordinates between 0 and 7');
            return;
        }

        selectedStart = [startX, startY];
        selectedEnd = [endX, endY];
        path = knightMoves(selectedStart, selectedEnd);
        updateBoard();
    });

    randomizeBtn.addEventListener('click', () => {
        // Generate random positions (make sure they're different)
        let startX, startY, endX, endY;
        do {
            startX = Math.floor(Math.random() * 8);
            startY = Math.floor(Math.random() * 8);
            endX = Math.floor(Math.random() * 8);
            endY = Math.floor(Math.random() * 8);
        } while (startX === endX && startY === endY);

        startXInput.value = startX;
        startYInput.value = startY;
        endXInput.value = endX;
        endYInput.value = endY;

        selectedStart = [startX, startY];
        selectedEnd = [endX, endY];
        path = [];
        updateBoard();
    });

    // Initialize
    initializeBoard();
});
