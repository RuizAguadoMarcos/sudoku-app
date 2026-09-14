let currentBoard = [];
let solution = [];
let timerInterval = null;
let seconds = 0;

// Inicializar el juego
function initGame(difficulty) {
    clearInterval(timerInterval);
    seconds = 0;
    updateTimer();
    
    currentBoard = generateSudoku(difficulty);
    solution = currentBoard.map(row => [...row]);
    solveSudoku(solution);
    
    renderBoard();
    startTimer();
    showMessage('');
}

// Limpiar highlights
function clearHighlights() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.classList.remove('highlighted-row', 'highlighted-col', 'same-number', 'selected');
    });
}

// Resaltar selección
function highlightSelection(input) {
    clearHighlights();
    
    const row = input.dataset.row;
    const col = input.dataset.col;
    const value = input.value;
    
    const allInputs = document.querySelectorAll('input');
    
    allInputs.forEach(inp => {
        const cell = inp.parentElement;
        
        // Resaltar fila
        if (inp.dataset.row === row) {
            cell.classList.add('highlighted-row');
        }
        
        // Resaltar columna
        if (inp.dataset.col === col) {
            cell.classList.add('highlighted-col');
        }
        
        // Resaltar mismo número
        if (value && inp.value === value) {
            cell.classList.add('same-number');
        }
    });
    
    // Resaltar celda seleccionada
    input.parentElement.classList.add('selected');
}

// Renderizar el tablero
function renderBoard() {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            
            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1;
            input.dataset.row = row;
            input.dataset.col = col;
            
            if (currentBoard[row][col] !== 0) {
                input.value = currentBoard[row][col];
                input.readOnly = true;
                cell.classList.add('fixed');
            }
            
            input.addEventListener('input', handleInput);
            input.addEventListener('focus', () => highlightSelection(input));
            input.addEventListener('blur', clearHighlights);
            
            cell.appendChild(input);
            grid.appendChild(cell);
        }
    }
}

// Manejar input del usuario
function handleInput(e) {
    const input = e.target;
    const value = input.value;
    
    if (!/^[1-9]$/.test(value)) {
        input.value = '';
        return;
    }
    
    const row = parseInt(input.dataset.row);
    const col = parseInt(input.dataset.col);
    currentBoard[row][col] = parseInt(value);
    
    validateMove(row, col);
    checkCompletion();
}

// Validar movimiento
function validateMove(row, col) {
    const num = currentBoard[row][col];
    const inputs = document.querySelectorAll('input');
    
    // Limpiar clases inválidas
    inputs.forEach(inp => inp.parentElement.classList.remove('invalid'));
    
    if (num === 0) return;
    
    // Verificar fila
    for (let c = 0; c < 9; c++) {
        if (c !== col && currentBoard[row][c] === num) {
            markInvalid(row, c);
            markInvalid(row, col);
        }
    }
    
    // Verificar columna
    for (let r = 0; r < 9; r++) {
        if (r !== row && currentBoard[r][col] === num) {
            markInvalid(r, col);
            markInvalid(row, col);
        }
    }
    
    // Verificar caja 3x3
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let r = boxRow; r < boxRow + 3; r++) {
        for (let c = boxCol; c < boxCol + 3; c++) {
            if ((r !== row || c !== col) && currentBoard[r][c] === num) {
                markInvalid(r, c);
                markInvalid(row, col);
            }
        }
    }
}

// Marcar celda inválida
function markInvalid(row, col) {
    const input = document.querySelector(`input[data-row="${row}"][data-col="${col}"]`);
    if (input) {
        input.parentElement.classList.add('invalid');
    }
}

// Verificar si está completo
function checkCompletion() {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (currentBoard[row][col] === 0) return;
        }
    }
    
    // Verificar si es correcto
    if (JSON.stringify(currentBoard) === JSON.stringify(solution)) {
        clearInterval(timerInterval);
        showMessage('¡Felicidades! ¡Has resuelto el Sudoku! 🎉', 'success');
    }
}

// Resolver automáticamente
function solveBoard() {
    currentBoard = solution.map(row => [...row]);
    renderBoard();
    showMessage('¡Resuelto!', 'success');
    clearInterval(timerInterval);
}

// Validar solución actual
function checkSolution() {
    const hasInvalid = document.querySelector('.invalid');
    if (hasInvalid) {
        showMessage('Hay errores en el tablero', 'error');
    } else {
        showMessage('¡Todo correcto hasta ahora!', 'success');
    }
}

// Borrar tablero
function clearBoard() {
    const inputs = document.querySelectorAll('input:not([disabled])');
    inputs.forEach(input => {
        input.value = '';
        const row = parseInt(input.dataset.row);
        const col = parseInt(input.dataset.col);
        currentBoard[row][col] = 0;
        input.parentElement.classList.remove('invalid');
    });
    showMessage('');
}

// Timer
function startTimer() {
    timerInterval = setInterval(() => {
        seconds++;
        updateTimer();
    }, 1000);
}

function updateTimer() {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    document.getElementById('timer').textContent = `Tiempo: ${mins}:${secs}`;
}

// Mostrar mensaje
function showMessage(msg, type = '') {
    const messageEl = document.getElementById('message');
    messageEl.textContent = msg;
    messageEl.className = type;
}

// Event Listeners
document.getElementById('newGame').addEventListener('click', () => {
    const difficulty = document.getElementById('difficulty').value;
    initGame(difficulty);
});

document.getElementById('solve').addEventListener('click', solveBoard);
document.getElementById('check').addEventListener('click', checkSolution);
document.getElementById('clear').addEventListener('click', clearBoard);

// Iniciar juego al cargar
window.addEventListener('load', () => initGame('medium'));
