type CellState = 1 | -1 | 0; // 1 = filled, -1 = blocked, 0 = empty/unknown

export interface NonogramGame {
  grid: CellState[][];
  rowHints: number[][];
  colHints: number[][];
}

export function createNonogram(width: number, height: number): NonogramGame {

  const randomChance = Math.floor(Math.random() * 100);
  const smileFace = {
    grid: [
      [-1, 1, -1, 1, -1],
      [-1, 1, -1, 1, -1],
      [-1, -1, -1, -1, -1],
      [1, -1, -1, -1, 1],
      [1, 1, 1, 1, 1],
    ] as CellState[][],
    rowHints: [
      [1, 1],
      [1, 1],
      [0],
      [1, 1],
      [5],
    ],
    colHints: [
      [2],
      [2, 1],
      [1],
      [2, 1],
      [2],
    ],
  };

  if (randomChance === 0 && width === 5 && height === 5) return smileFace;
  
  // --- Helper 1: Create a random matrix ---
  const cellChance = 0.3;

  const createRandomMatrix = (w: number, h: number): CellState[][] => {
    return Array.from({ length: h }, () =>
      Array.from({ length: w }, () => (Math.random() > cellChance ? 1 : -1))
    );
  };

  // Helper to calculate hints for a given line (row or column)
  const calculateHints = (line: CellState[]): number[] => {
    const hints: number[] = [];
    let currentBlock = 0;
    for (const cell of line) {
      if (cell === 1) {
        currentBlock++;
      } else if (currentBlock > 0) {
        hints.push(currentBlock);
        currentBlock = 0;
      }
    }
    if (currentBlock > 0) hints.push(currentBlock);
    return hints.length > 0 ? hints : [0];
  };

  // --- Helper 2: Find all valid permutations for a line ---
  const getPermutations = (hints: number[], length: number): CellState[][] => {
    if (hints.length === 1 && hints[0] === 0) {
      return [Array(length).fill(-1)];
    }

    const permutations: CellState[][] = [];
    
    const build = (hintIdx: number, currentPos: number, currentLine: CellState[]) => {
      if (hintIdx === hints.length) {
        const fullLine = [...currentLine];
        for (let i = currentPos; i < length; i++) fullLine[i] = -1;
        permutations.push(fullLine);
        return;
      }

      const hint = hints[hintIdx];
      const blocksRemaining = hints.length - hintIdx - 1;
      const spacesNeeded = blocksRemaining + hints.slice(hintIdx + 1).reduce((a, b) => a + b, 0);
      const maxStartPos = length - spacesNeeded - hint;

      for (let startPos = currentPos; startPos <= maxStartPos; startPos++) {
        const nextLine = [...currentLine];
        
        // Block off cells before the start position
        for (let j = currentPos; j < startPos; j++) nextLine[j] = -1;
        
        // Fill the cells for the current hint
        for (let j = startPos; j < startPos + hint; j++) nextLine[j] = 1;
        
        // Add mandatory space if it's not the last hint
        if (hintIdx < hints.length - 1) {
          nextLine[startPos + hint] = -1;
          build(hintIdx + 1, startPos + hint + 1, nextLine);
        } else {
          build(hintIdx + 1, startPos + hint, nextLine);
        }
      }
    };

    build(0, 0, Array(length).fill(0));
    return permutations;
  };

  // Helper to deduce known cells from a list of valid permutations
  const getCommonalities = (perms: CellState[][], length: number): CellState[] => {
    if (perms.length === 0) return Array(length).fill(0);
    const result: CellState[] = Array(length).fill(0);
    
    for (let i = 0; i < length; i++) {
      const firstVal = perms[0][i];
      if (perms.every((p) => p[i] === firstVal)) {
        result[i] = firstVal;
      }
    }
    return result;
  };

  // --- Helper 3: Attempt to solve and refine ---
  const attemptSolve = (truthGrid: CellState[][]) => {
    const rowHints = truthGrid.map((row) => calculateHints(row));
    const colHints = Array.from({ length: width }, (_, x) =>
      calculateHints(truthGrid.map((row) => row[x]))
    );

    const solverGrid: CellState[][] = Array.from({ length: height }, () =>
      Array(width).fill(0)
    );
    let changed = true;

    while (changed) {
      changed = false;

      // 1. Line Solve Rows
      for (let y = 0; y < height; y++) {
        const row = solverGrid[y];
        const validPerms = getPermutations(rowHints[y], width).filter((p) =>
          p.every((val, idx) => row[idx] === 0 || row[idx] === val)
        );
        
        const deductions = getCommonalities(validPerms, width);
        for (let x = 0; x < width; x++) {
          if (solverGrid[y][x] === 0 && deductions[x] !== 0) {
            solverGrid[y][x] = deductions[x];
            changed = true;
          }
        }
      }

      // 2. Line Solve Columns
      for (let x = 0; x < width; x++) {
        const col = solverGrid.map((row) => row[x]);
        const validPerms = getPermutations(colHints[x], height).filter((p) =>
          p.every((val, idx) => col[idx] === 0 || col[idx] === val)
        );
        
        const deductions = getCommonalities(validPerms, height);
        for (let y = 0; y < height; y++) {
          if (solverGrid[y][x] === 0 && deductions[y] !== 0) {
            solverGrid[y][x] = deductions[y];
            changed = true;
          }
        }
      }
    }

    const isSolved = solverGrid.every((row) => row.every((cell) => cell !== 0));
    return { isSolved, solverGrid, rowHints, colHints };
  };

  // Main Loop: Generate, Solve, and Refine
  const truthGrid = createRandomMatrix(width, height);
  let iterationCounter = 0;
  const MAX_ITERATIONS = 50; 

  while (iterationCounter < MAX_ITERATIONS) {
    const { isSolved, solverGrid, rowHints, colHints } = attemptSolve(truthGrid);

    if (isSolved) {
      return { grid: solverGrid, rowHints, colHints };
    }

    // If not successful, adjust the hint corresponding to an unknown cell
    let adjusted = false;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (solverGrid[y][x] === 0) {
          // Flip the underlying truth grid to break the ambiguity
          truthGrid[y][x] = truthGrid[y][x] === 1 ? -1 : 1;
          adjusted = true;
          break;
        }
      }
      if (adjusted) break;
    }
    
    iterationCounter++;
  }

  // Fallback in case of an infinite loop trap (highly unlikely, but safeguards the stack)
  console.warn("Max refinement iterations reached. Generating a new base grid entirely.");
  return createNonogram(width, height);
}