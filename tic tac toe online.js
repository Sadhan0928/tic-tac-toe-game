document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusText = document.getElementById('status');
    const resetButton = document.getElementById('resetButton');
    let currentPlayer = 'X';
    let board = Array(9).fill(null);
    let isGameActive = true;

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellClick(event) {
        const index = event.target.dataset.index;

        if (board[index] !== null || !isGameActive) {
            return;
        }

        board[index] = currentPlayer;
        event.target.textContent = currentPlayer;

        if (checkWinner()) {
            statusText.textContent = `${currentPlayer} wins!`;
            isGameActive = false;
        } else if (board.every(cell => cell !== null)) {
            statusText.textContent = `It's a draw!`;
            isGameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusText.textContent = `Player ${currentPlayer}'s turn`;
        }
    }

    function checkWinner() {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return board[index] === currentPlayer;
            });
        });
    }

    function resetGame() {
        board.fill(null);
        cells.forEach(cell => {
            cell.textContent = '';
        });
        currentPlayer = 'X';
        isGameActive = true;
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    resetButton.addEventListener('click', resetGame);

    statusText.textContent = `Player ${currentPlayer}'s turn`;
});