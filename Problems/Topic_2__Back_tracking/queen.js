/**
 * Input:
 * - Matrix nxn
 * Ouput:
 * - Find position for n queen to any queen can not eat another queen.
 * @param {*} n 
 * 
 * - Input int[][] x = new int[n][n]
 * - Because number of queen is equal with size of matrix, so each row or col of the matrix only include a queen
 * - The first queen:
 *         to position x[i][j] (0 <= i <= n-1, 0 <= j <= n-1)
 *           - The next queen we must put it into position have coordinate x[i1][j2] (i+2 <= i1 <= n-1, j+2 <= j1 <= n-1)
 *               - Loop for next queen when number queen equal n
 * 
 * 
 *    
 * 
 */


/**
 * With idea that all value of maxtrix[i][j] 
 * = true => That mean this is position avaiable to put on a queen
 * = false => That mean this is potision unavaiable to put on a queen 
 * 
 *  
 */

// size of matrix
const n = 5;

var matrix = [];

function initMatrix() {
      for(let i=0; i<n; i++) {
            matrix[i] = [];
            for(let j=0; j<n; j++) {
                  matrix[i][j] = {
                        isRootVisiting: false,
                        avaiable: 1
                  }
            }
      }
}

initMatrix();

function updateMatrix() {
      const rootVisiting = findPositionOfRootVisiting();
      for(let i=0; i<n; i++) {
            for(let j=0; j<n; j++) {
                  // skip reset avaiable value for positions have row, col, main_diagonal or second_diagonal equal with positions dependency by root state
                  if (rootVisiting) {
                        const { x, y } = rootVisiting;
                        const allPositionDependenciesByRoot = getOrDisableAllPositionRelateToCurrentQueen(x,y,true);
                        if (allPositionDependenciesByRoot.find(p => p[0] === i && p[1] === j)) {
                              continue;
                        };
                  };
                  matrix[i][j] = {
                        isRootVisiting: false,
                        avaiable: 1
                  };
            };
      };
};

function getOrDisableAllPositionRelateToCurrentQueen(currentX, currentY, isGet=false) {
      if(matrix === undefined || currentX === undefined || currentY === undefined) return;
      const matrixSize = matrix.length;
      const allPositionDependencies = [];
      for(let i=0; i < matrixSize; i++) {
            if (!isGet) {
                  matrix[i][currentY].avaiable = 0;
                  matrix[currentX][i].avaiable = 0;
            } else {
                  allPositionDependencies.push([i, currentY],[currentX,i]);
            }
      };
      let initRowOfDiagonal = currentX, initColOfDiagonal = currentY;
      while(++initRowOfDiagonal < matrixSize && ++initColOfDiagonal < matrixSize) {
            if (!isGet) {
                  matrix[initRowOfDiagonal][initColOfDiagonal].avaiable = 0;
                  if (currentX === 1 && currentY === 0 && initRowOfDiagonal === 3 && initColOfDiagonal === 2) {
                        console.log("The matrix =========== ", matrix);
                  }
            } else {
                  allPositionDependencies.push([initRowOfDiagonal, initColOfDiagonal]);
            }
      };
      initRowOfDiagonal = currentX, initColOfDiagonal = currentY;
      while(++initRowOfDiagonal < matrixSize && --initColOfDiagonal >= 0) {
            if (!isGet) {
                  matrix[initRowOfDiagonal][initColOfDiagonal].avaiable = 0;
            } else {
                  allPositionDependencies.push([initRowOfDiagonal, initColOfDiagonal]);
            }
      };
      return allPositionDependencies;
}

/**
 * 
 * @param {*} nQueen 
 * @returns 
 * Return data structure:
 * [
 *    [[0,0], [1,3], [2,5], ..., n_[]],
 *    ...
 *    [[], ..., n_[]]
 * ]
 */

function findPositionOfRootVisiting() {
      for(let col=0; col < matrix.length; col++) {
            if (matrix[0][col].isRootVisiting) return { x: 0, y: col };
      }
      return undefined;
}

/**
 * The function helps keep positions disable which relate to root element,
 * avoid reset these positions because it will effect find position avaiable for the next queen
 * @param {*} currentPos 
 * @returns 
 */
function enableOrSwitchRootVisiting(currentPos) {
      if (!currentPos || currentPos[0] !== 0) return;
      if (currentPos[0]===0) {
            const positionOfRootVisiting = findPositionOfRootVisiting();
            if (!positionOfRootVisiting) {
                  matrix[currentPos[0]][currentPos[1]].isRootVisiting = true;
            } else if (positionOfRootVisiting.y !== currentPos[1]) {
                  // switch root visiting
                  matrix[currentPos[0]][currentPos[1]].isRootVisiting = true;
                  matrix[positionOfRootVisiting.x][positionOfRootVisiting.y].isRootVisiting = false;
                  // reset matrix after switch root
                  updateMatrix();
                  // console.log(matrix);
            }
      };
};

function queen(nQueen=1, positionOfPreviousQueen) {
      if (nQueen === n) {
            const lastQ = putQueen(nQueen, positionOfPreviousQueen);
            const positionOfLastQueen = [lastQ];
            // reset matrix
            updateMatrix();
            return positionOfLastQueen;
      };
      const results = [];
      const allPositionOfCurrentQueen = putQueen(nQueen, positionOfPreviousQueen);
      if (positionOfPreviousQueen && positionOfPreviousQueen[0] === 2 && positionOfPreviousQueen[1] === 4) {
            console.log("allPositionOfCurrentQueen ========== ");
            console.log(allPositionOfCurrentQueen);
      }; 
      ++nQueen; // for next queen
      allPositionOfCurrentQueen.forEach(pos => {
            enableOrSwitchRootVisiting(pos);
            const allOptionOfNextQueen = queen(nQueen, pos);
            
            allOptionOfNextQueen.forEach(ss => results.push([pos, ...ss]));
      });
      return results;
};

// [[0,0], [0,1], ...[0,n]]
// [[1,0], [1,1], ...[1,n]]
function putQueen(idxQueen, positionOfPreviousQueen) {
      const allPositionOfCurrentQueen = [];
      if (positionOfPreviousQueen != undefined) {
            // if (positionOfPreviousQueen[0] === 1 && positionOfPreviousQueen[1] === 0) {
            //       console.log("111111111111111111 ------------- 000000000000000000000 ");
            //       console.log(matrix);
            // };
            getOrDisableAllPositionRelateToCurrentQueen(positionOfPreviousQueen[0], positionOfPreviousQueen[1]);
            if (positionOfPreviousQueen[0] === 1 && positionOfPreviousQueen[1] === 0) {
                  console.log("idx queen ==== " + idxQueen);
                  console.log("1111111111111111 ----------------- 00000000000000000 ");
                  console.log(matrix);
            };
            // if (positionOfPreviousQueen[0] === 2 && positionOfPreviousQueen[1] === 4) {
            //       console.log("idx queen ==== " + idxQueen);
            //       console.log("222222222222222222 ----------------- 444444444444444 ");
            //       console.log(matrix);
            // };
            // if (positionOfPreviousQueen[0] === 0 && positionOfPreviousQueen[1] === 1) {
            //       console.log("ggggggggggggggggggggggg");
            //       console.log(matrix);
            // }
      };
      // Because each queen will put into each row of the input matrix
      // so we only loop across column of row equal idxQueen - 1,
      // if the elements have value equal true,
      // we will push it into array allPositionOfCurrentQueen.
      --idxQueen;
      for(let col=0; col<matrix.length; col++) {
            if (matrix[idxQueen][col].avaiable) {
                  allPositionOfCurrentQueen.push([idxQueen, col]);
            }
      }
      return allPositionOfCurrentQueen;
};

const result = queen();
console.log(result);