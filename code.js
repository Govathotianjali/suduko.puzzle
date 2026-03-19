const grid = document.getElementById("sudoku-grid");

// Create 9x9 grid
for (let i = 0; i < 9; i++) {
    let row = document.createElement("tr");
    for (let j = 0; j < 9; j++) {
        let cell = document.createElement("td");
        let input = document.createElement("input");
        input.setAttribute("type", "number");
        input.setAttribute("min", "1");
        input.setAttribute("max", "9");
        cell.appendChild(input);
        row.appendChild(cell);
    }
    grid.appendChild(row);
}

// Get grid values
function getGrid() {
    let board = [];
    let inputs = document.querySelectorAll("input");
    for (let i = 0; i < 81; i++) {
        let value = inputs[i].value;
        board.push(value ? parseInt(value) : 0);
    }
    return board;
}

// Set grid values
function setGrid(board) {
    let inputs = document.querySelectorAll("input");
    for (let i = 0; i < 81; i++) {
        inputs[i].value = board[i] === 0 ? "" : board[i];
    }
}

// Check if safe
function isSafe(board, row, col, num) {
    for (let x = 0; x < 9; x++) {
        if (board[row * 9 + x] === num ||
            board[x * 9 + col] === num) return false;
    }

    let startRow = row - row % 3;
    let startCol = col - col % 3;

    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
            if (board[(startRow + i) * 9 + (startCol + j)] === num)
                return false;

    return true;
}

// Solve using backtracking
function solve(board) {
    for (let i = 0; i < 81; i++) {
        if (board[i] === 0) {
            let row = Math.floor(i / 9);
            let col = i % 9;

            for (let num = 1; num <= 9; num++) {
                if (isSafe(board, row, col, num)) {
                    board[i] = num;

                    if (solve(board)) return true;

                    board[i] = 0;
                }
            }
            return false;
        }
    }
    return true;
}

function solveSudoku() {
    let board = getGrid();
    if (solve(board)) {
        setGrid(board);
    } else {
        alert("No solution exists!");
    }
}

function clearGrid() {
    document.querySelectorAll("input").forEach(input => input.value = "");
}
