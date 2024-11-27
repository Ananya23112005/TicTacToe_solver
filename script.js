let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;

const statusElement = document.getElementById('status');

function renderBoard() {
    for (let i = 0; i < 9; i++) {
        document.getElementById(`cell-${i}`).textContent = board[i];
        document.getElementById(`cell-${i}`).disabled = board[i] !== '';
    }
}

function makeMove(index) {
    if (gameOver || board[index] !== '') return;

    board[index] = currentPlayer;
    renderBoard();
    if (checkWinner()) {
        statusElement.textContent = `${currentPlayer} wins!`;
        gameOver = true;
    } else if (board.every(cell => cell !== '')) {
        statusElement.textContent = 'It\'s a draw!';
        gameOver = true;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (currentPlayer === 'O') {
            setTimeout(computerMove, 500);
        }
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const [a, b, c] of winPatterns) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

function computerMove() {
    let bestMove = minimax(board, 'O');
    makeMove(bestMove);
}

function minimax(board, player) {
    const availableMoves = board.map((cell, index) => (cell === '' ? index : -1)).filter(index => index !== -1);

    if (checkWinner()) return -1;
    if (board.every(cell => cell !== '')) return 0;

    let bestScore = player === 'O' ? -Infinity : Infinity;
    let bestMove = -1;

    for (const move of availableMoves) {
        board[move] = player;
        const score = minimax(board, player === 'O' ? 'X' : 'O');
        board[move] = '';
        if ((player === 'O' && score > bestScore) || (player === 'X' && score < bestScore)) {
            bestScore = score;
            bestMove = move;
        }
    }

    return bestMove;
}

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    statusElement.textContent = '';
    renderBoard();
}

renderBoard();
