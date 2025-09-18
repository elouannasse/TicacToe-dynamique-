let gameState = {
    board: [],                  
    currentPlayer: 1,           
    gridSize: 3,                
    winCondition: 3,            
    gameActive: true,           
    player1Symbol: 'X',         
    player2Symbol: 'O',         
    scores: {                   
        player1: 0,
        player2: 0,
        draws: 0
    }
};


function saveGameState() {
    localStorage.setItem('ticTacToeGameState', JSON.stringify(gameState));
}


function loadGameState() {
    const savedState = localStorage.getItem('ticTacToeGameState');
    if (savedState) {
        gameState = JSON.parse(savedState);
    }
}


function initializeGame() {
    updateScoreDisplay();
    createGameBoard();
    setupEventListeners();
    updateCurrentPlayerDisplay();
    updateMessage("Cliquez sur une case vide pour commencer à jouer");
    console.log('Le jeu a été initialisé avec succès');

    const showStateBtn = document.getElementById('showStateBtn');
    if (showStateBtn) {
        showStateBtn.addEventListener('click', () => {
            const savedState = localStorage.getItem('ticTacToeGameState');
            if (savedState) {
                alert("État sauvegardé :\n" + savedState);
            } else {
                alert("Aucun état sauvegardé trouvé.");
            }
        });
    }
}


function setupEventListeners() {
   
    document.getElementById('player1Symbol').addEventListener('change', function() {
        gameState.player1Symbol = this.value;
        updateCurrentPlayerDisplay();
        saveGameState();
    });

    
    document.getElementById('player2Symbol').addEventListener('change', function() {
        gameState.player2Symbol = this.value;
        updateCurrentPlayerDisplay();
        saveGameState();
    }); 
}


function createGameBoard() {
    const boardElement = document.getElementById('gameBoard');
    const size = gameState.gridSize;
    
    boardElement.innerHTML = '';
    boardElement.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    
    if (!gameState.board || gameState.board.length !== size) {
        gameState.board = Array(size).fill().map(() => Array(size).fill(''));
    } 

    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            const cell = document.createElement('button');
            cell.className = 'cell';
            cell.dataset.row = row; 
            cell.dataset.col = col;
            cell.onclick = () => handleCellClick(row, col);
            cell.textContent = gameState.board[row][col];
            if (gameState.board[row][col] !== '') cell.classList.add('occupied');
            boardElement.appendChild(cell);
        }
    }
}


function handleCellClick(row, col) {
    if (!gameState.gameActive || gameState.board[row][col] !== '') return;

    const currentSymbol = gameState.currentPlayer === 1 ? 
        gameState.player1Symbol : gameState.player2Symbol;

    gameState.board[row][col] = currentSymbol;

    const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    cell.textContent = currentSymbol;
    cell.classList.add('occupied');

    if (checkWinner(row, col)) {
        handleGameEnd('win');
        return;
    }

    if (isBoardFull()) {
        handleGameEnd('draw');
        return;
    }

    gameState.currentPlayer = gameState.currentPlayer === 1 ? 2 : 1;
    updateCurrentPlayerDisplay();
    updateMessage(`Tour du joueur ${gameState.currentPlayer}`);
    saveGameState();
}

function checkWinner(row, col) {
    const symbol = gameState.board[row][col];
    const k = gameState.winCondition;
    const directions = [
        [0, 1],   
        [1, 0],
        [1, 1],   
        [1, -1]   
    ];

    for (let [dr, dc] of directions) {
        let count = 1;

        
        let r = row + dr, c = col + dc;
        while (r >= 0 && r < gameState.gridSize && c >= 0 && c < gameState.gridSize && gameState.board[r][c] === symbol) {
            count++; r += dr; c += dc;  
        }

        r = row - dr; c = col - dc;
        while (r >= 0 && r < gameState.gridSize && c >= 0 && c < gameState.gridSize && gameState.board[r][c] === symbol) {
            count++; r -= dr; c -= dc;
        }

        if (count >= k) return true;
    }
    return false; 
}


function isBoardFull() {
    return gameState.board.flat().every(cell => cell !== '');
}


function handleGameEnd(type) {
    gameState.gameActive = false;
    if (type === 'win') {
        updateMessage(`🎉 Joueur ${gameState.currentPlayer} a gagné !`);
        if (gameState.currentPlayer === 1) {
            gameState.scores.player1++;
        } else {
            gameState.scores.player2++;
        }
    } else if (type === 'draw') {
        updateMessage("🤝 Match nul !");
        gameState.scores.draws++;
    }
    updateScoreDisplay();
    saveGameState();
}


function startNewGame() {
    gameState.gridSize = parseInt(document.getElementById('gridSize').value);
    gameState.winCondition = parseInt(document.getElementById('winCondition').value);
    gameState.currentPlayer = 1;
    gameState.gameActive = true;

    gameState.board = Array(gameState.gridSize).fill().map(() => Array(gameState.gridSize).fill(''));

    createGameBoard();
    updateCurrentPlayerDisplay();
    updateMessage("Nouvelle partie commencée !");  
    saveGameState();
}


function resetGame() {
    gameState.currentPlayer = 1;
    gameState.gameActive = true;

    gameState.board = Array(gameState.gridSize).fill().map(() => Array(gameState.gridSize).fill(''));

    createGameBoard();
    updateCurrentPlayerDisplay();
    updateMessage("Nouvelle manche !");
    saveGameState();
}


function resetScores() {
    gameState.scores = { player1: 0, player2: 0, draws: 0 };
    updateScoreDisplay();
    updateMessage("Scores réinitialisés !");
    saveGameState();
}


function updateScoreDisplay() {
    document.getElementById('player1Score').textContent = gameState.scores.player1;
    document.getElementById('player2Score').textContent = gameState.scores.player2;
    document.getElementById('drawScore').textContent = gameState.scores.draws;
}


function updateCurrentPlayerDisplay() {
    document.getElementById('currentPlayerDisplay').textContent = gameState.currentPlayer;
    const symbol = gameState.currentPlayer === 1 ? gameState.player1Symbol : gameState.player2Symbol;
    document.getElementById('currentSymbolDisplay').textContent = symbol;
}


function updateMessage(msg) {
    document.getElementById('message').textContent = msg;
}

window.onload = () => {
    loadGameState();
    initializeGame(); 
};  





