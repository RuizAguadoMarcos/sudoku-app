function generateSudoku(difficulty) {
  const SIZE = 9;
  const board = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
  
  function fillBoard() {
    for (let row = 0; row < SIZE; row++) {
      for (let col = 0; col < SIZE; col++) {
        if (board[row][col] === 0) {
          const nums = [1,2,3,4,5,6,7,8,9].sort(() => Math.random() - 0.5);
          for (let num of nums) {
            if (isValid(row, col, num)) {
              board[row][col] = num;
              if (fillBoard()) return true;
              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }
  
  function isValid(row, col, num) {
    for (let i = 0; i < SIZE; i++) {
      if (board[row][i] === num || board[i][col] === num) return false;
    }
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let r = boxRow; r < boxRow + 3; r++) {
      for (let c = boxCol; c < boxCol + 3; c++) {
        if (board[r][c] === num) return false;
      }
    }
    return true;
  }
  
  fillBoard();
  
  const ranges = {
    easy: [30, 35],
    medium: [40, 45],
    hard: [50, 55]
  };
  
  const [min, max] = ranges[difficulty] || ranges.medium;
  const toRemove = min + Math.floor(Math.random() * (max - min + 1));
  
  let removed = 0;
  while (removed < toRemove) {
    const row = Math.floor(Math.random() * SIZE);
    const col = Math.floor(Math.random() * SIZE);
    if (board[row][col] !== 0) {
      board[row][col] = 0;
      removed++;
    }
  }
  
  return board;
}
