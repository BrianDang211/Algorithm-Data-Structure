/**
 * Link problem: https://leetcode.com/problems/number-of-islands/description/?envType=study-plan-v2&envId=top-interview-150
 * @param {character[][]} grid
 * @return {number}
 *
 * Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.
 * "An island" is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.
 * You may assume all four edges of the grid are all surrounded by water.
 *
 * grid = [
 *    [1,1,1,1,0],                  ->
 *    [1,1,0,1,0],
 *    [1,1,0,0,0],
 *    [0,0,0,0,0]
 * ]
 *
 *         ^
 *      <- 1 ->
 *         V
 * We must detect all islands from grid
 *
 * An island is a cricuit
 * start at (x,y) -> (x1,y1) -> ,..., -> (x_n,y_n) -> (x,y)
 * => This is an island
 *
 * Each position only put on a circuit
 *
 *
 * grid = [
 *    [1,1,0,0,0],                  ->
 *    [1,1,0,0,0],
 *    [0,0,1,0,0],
 *    [0,0,0,1,1]
 * ]
 *
 * root_element => next => left, right, top and bottom
 * *** for each next_element, we will check value of it, if value_of_it is 0 we will mask previous element from this position
 * as a neo position, and excute the similar behaviour for it like as root.
 *
 */

// let grid = [
//       ['1', '1', '1', '1', '0'],
//       ['1', '1', '0', '1', '0'],
//       ['1', '1', '0', '0', '0'],
//       ['0', '0', '0', '0', '0'],
// ];

const LAND_ID = '1',
      WATER_ID = '0';

const ALL_DIRECTION = {
      TOP: 1,
      BOTTOM: 2,
      LEFT: 3,
      RIGHT: 4,
};

const PATH_SPLIT = '->';

/**
 * A dictionary which store all circuits exist on grid,
 * with key => (x,y)
 *    value => [(x1,y1),...(xn,yn)]
 */
let water_visited = [];
let circuits = {};

function wrapperGrid(grid) {
      if (!grid?.length) return [];
      const n_col = grid[0].length;
      const row_0 = '0,'
            .repeat(n_col + 2)
            .split(',')
            .filter((v) => !!v);
      const gridResults = [];
      // add a row 0 into top of grid result
      gridResults[0] = row_0;
      for (let i = 0; i < grid.length; i++) {
            gridResults[i + 1] = [];
            gridResults[i + 1][0] = '0';
            for (let j = 0; j < grid[i].length; j++) {
                  gridResults[i + 1][j + 1] = grid[i][j];
            }
            gridResults[i + 1][grid[i].length + 1] = '0';
      }
      // add a row 0 into bottom of grid result
      gridResults.push(row_0);
      return gridResults;
}

function printGrid(grid) {
      if (!grid?.length) return;
      for (let r = 0; r < grid.length; r++) {
            console.log(grid[r] + '\n');
      }
}

function buildDictKey(x, y, grid) {
      if (!checkValidPosition(x, y, grid)) return;
      return `(${x},${y})`;
}

/**
 * This function will allow a position can use
 * as a start point of a curcuit, and we understand that if this position
 * has value is 1, this means it passes condition 1, but it must not exist
 * at any circuit before, this means a position has value is 1 only exist most
 * once time on 1 circuit
 * @param {*} x
 * @param {*} y
 * @param {*} grid
 * @returns
 */
function checkValidPosition(x, y, grid) {
      if (
            !grid?.length ||
            !grid[x]?.length ||
            x === null ||
            y === null ||
            x === undefined ||
            y === undefined ||
            x < 0 ||
            x >= grid.length ||
            y < 0 ||
            y >= grid[x].length
      ) {
            return false;
      }
      return true;
}

function isPositionExistOnCircuit(x, y, grid) {
      if (!checkValidPosition(x, y, grid)) return false;
      let listEdges = Object.values(circuits).reduce(
            (memoEdges, curListEdge) => {
                  if (curListEdge?.length) {
                        memoEdges = [...memoEdges, ...curListEdge];
                        return memoEdges;
                  }
            },
            []
      );
      if (listEdges?.length) {
            for (let i = 0; i < listEdges.length; i++) {
                  const curEdge = listEdges[i];
                  if (curEdge[0] === x && curEdge[1] === y) {
                        return true;
                  }
            }
      }
      return false;
}

function isWaterRegionVisited(x, y) {
      if (!water_visited?.length) return false;
      let visited = false;
      water_visited.forEach((wv) => {
            if (wv[0] === x && wv[1] === y) {
                  visited = true;
            }
      });
      return visited;
}

function isSkipPosition(x, y, grid) {
      const check =
            !checkValidPosition(x, y, grid) ||
            grid[x][y] === WATER_ID ||
            isPositionExistOnCircuit(x, y, grid);
      return check;
}

function findCircuit(root_x, root_y, grid) {
      if (!checkValidPosition(root_x, root_y, grid)) return;
      const keyOfCircuit = buildDictKey(root_x, root_y, grid);
      circuits[keyOfCircuit] = [[root_x, root_y]];
      // console.log(circuits);
      findLandWithDirection(
            keyOfCircuit,
            root_x,
            root_y,
            grid,
            ALL_DIRECTION.TOP
      );
}

function findLandWithDirection(circuitKey, root_x, root_y, grid, direction) {
      if (!checkValidPosition(root_x, root_y, grid)) return;
      switch (direction) {
            case ALL_DIRECTION.TOP:
                  findLandWithTopDirection(circuitKey, root_x, root_y, grid);
                  break;
            case ALL_DIRECTION.BOTTOM:
                  findLandWithBottomDirection(circuitKey, root_x, root_y, grid);
                  break;
            case ALL_DIRECTION.LEFT:
                  findLandWithLeftDiection(circuitKey, root_x, root_y, grid);
                  break;
            case ALL_DIRECTION.RIGHT:
                  findLandWithRightDirection(circuitKey, root_x, root_y, grid);
                  break;
            default:
                  console.log(`The direction ${direction} is not found...`);
      }
}

function findLandWithTopDirection(circuitKey, start_x, start_y, grid) {
      if (isStop(start_x, start_y, grid)) return;
      const listPositionOfLeftAndRight = [];
      for (let x = start_x - 1; x >= 0; x--) {
            if (
                  grid[x][start_y] === LAND_ID &&
                  !isPositionExistOnCircuit(x, start_y, grid)
            ) {
                  circuits[circuitKey] = [
                        ...(circuits[circuitKey] || []),
                        [x, start_y],
                  ];
                  if (
                        checkValidPosition(x - 1, start_y, grid) &&
                        grid[x - 1][start_y] === LAND_ID
                  ) {
                        listPositionOfLeftAndRight.push([x, start_y]);
                  }
            } else {
                  if (!isWaterRegionVisited(x, start_y)) {
                        water_visited.push([x, start_y]);
                        listPositionOfLeftAndRight.push([x + 1, start_y]);
                        listPositionOfLeftAndRight.forEach((coor) => {
                              findLandWithLeftDiection(
                                    circuitKey,
                                    coor[0],
                                    coor[1],
                                    grid
                              );
                              findLandWithRightDirection(
                                    circuitKey,
                                    coor[0],
                                    coor[1],
                                    grid
                              );
                        });
                  }
                  break;
            }
      }
}

function findLandWithBottomDirection(circuitKey, start_x, start_y, grid) {
      if (isStop(start_x, start_y, grid)) return;
      const listPositionOfLeftAndRight = [];
      if (start_x === 1 && start_y === 5) {
            console.log('hihi go .... ');
      }
      for (let x = start_x + 1; x < grid.length; x++) {
            if (
                  grid[x][start_y] === LAND_ID &&
                  !isPositionExistOnCircuit(x, start_y, grid)
            ) {
                  circuits[circuitKey] = [
                        ...(circuits[circuitKey] || []),
                        [x, start_y],
                  ];
                  if (x === 2 && start_y === 5) {
                        console.log('Loging....');
                  }
                  if (
                        checkValidPosition(x + 1, start_y, grid) &&
                        grid[x + 1][start_y] === LAND_ID
                  ) {
                        listPositionOfLeftAndRight.push([x, start_y]);
                  }
            } else {
                  if (start_x === 1 && start_y === 5) {
                        console.log('=======================');
                        console.log('x: ', x);
                        console.log('start_y', start_y);
                        console.log('water: ', water_visited);
                        console.log('=======================');
                  }
                  if (!isWaterRegionVisited(x, start_y)) {
                        if (start_x === 1 && start_y === 5) {
                              console.log('x: ', x);
                              console.log('start_y: ', start_y);
                              console.log(
                                    'listPositionOfLeftAndRight === : ',
                                    listPositionOfLeftAndRight
                              );
                        }
                        water_visited.push([x, start_y]);
                        listPositionOfLeftAndRight.push([x - 1, start_y]);
                        if (start_x === 1 && start_y === 5) {
                              console.log(
                                    'listPositionOfLeftAndRight: ',
                                    listPositionOfLeftAndRight
                              );
                        }
                        listPositionOfLeftAndRight.forEach((coor) => {
                              findLandWithLeftDiection(
                                    circuitKey,
                                    coor[0],
                                    coor[1],
                                    grid
                              );
                              findLandWithRightDirection(
                                    circuitKey,
                                    coor[0],
                                    coor[1],
                                    grid
                              );
                        });
                  }
                  break;
            }
      }
}

function findLandWithLeftDiection(circuitKey, start_x, start_y, grid) {
      if (isStop(start_x, start_y, grid)) return;
      const listPositionOfTopAndBottom = [];
      for (let y = start_y - 1; y >= 0; y--) {
            if (
                  grid[start_x][y] === LAND_ID &&
                  !isPositionExistOnCircuit(start_x, y, grid)
            ) {
                  circuits[circuitKey] = [
                        ...(circuits[circuitKey] || []),
                        [start_x, y],
                  ];
                  if (
                        checkValidPosition(start_x, y - 1, grid) &&
                        grid[(start_x, y - 1)] === LAND_ID
                  ) {
                        listPositionOfTopAndBottom.push([start_x, y]);
                  }
            } else {
                  if (!isWaterRegionVisited(start_x, y)) {
                        water_visited.push([start_x, y]);
                        listPositionOfTopAndBottom.push([start_x, y + 1]);
                        listPositionOfTopAndBottom.forEach((coor) => {
                              findLandWithTopDirection(
                                    circuitKey,
                                    coor[0],
                                    coor[1],
                                    grid
                              );
                              findLandWithBottomDirection(
                                    circuitKey,
                                    coor[0],
                                    coor[1],
                                    grid
                              );
                        });
                  }
                  break;
            }
      }
}

function findLandWithRightDirection(circuitKey, start_x, start_y, grid) {
      if (isStop(start_x, start_y, grid)) return;
      const listPositionOfTopAndBottom = [];
      for (let y = start_y + 1; y < grid[start_x].length; y++) {
            if (
                  grid[start_x][y] === LAND_ID &&
                  !isPositionExistOnCircuit(start_x, y, grid)
            ) {
                  circuits[circuitKey] = [
                        ...(circuits[circuitKey] || []),
                        [start_x, y],
                  ];
                  if (
                        checkValidPosition(start_x, y + 1, grid) &&
                        grid[start_x][y + 1] === LAND_ID
                  ) {
                        listPositionOfTopAndBottom.push([start_x, y]);
                  }
            } else {
                  if (!isWaterRegionVisited(start_x, y)) {
                        water_visited.push([start_x, y]);
                        listPositionOfTopAndBottom.push([start_x, y - 1]);
                        listPositionOfTopAndBottom.forEach((coor) => {
                              findLandWithTopDirection(
                                    circuitKey,
                                    coor[0],
                                    coor[1],
                                    grid
                              );
                              findLandWithBottomDirection(
                                    circuitKey,
                                    coor[0],
                                    coor[1],
                                    grid
                              );
                        });
                  }
                  break;
            }
      }
}

function isStop(x, y, grid) {
      if (!checkValidPosition(x, y, grid)) return true;
      return (
            isStopMoveWithDirection(x, y, grid, ALL_DIRECTION.TOP) &&
            isStopMoveWithDirection(x, y, grid, ALL_DIRECTION.BOTTOM) &&
            isStopMoveWithDirection(x, y, grid, ALL_DIRECTION.LEFT) &&
            isStopMoveWithDirection(x, y, grid, ALL_DIRECTION.RIGHT)
      );
}

function isStopMoveWithDirection(x, y, grid, direction) {
      switch (direction) {
            case ALL_DIRECTION.TOP:
                  return isSkipPosition(x - 1, y, grid);
            case ALL_DIRECTION.BOTTOM:
                  return isSkipPosition(x + 1, y, grid);
            case ALL_DIRECTION.LEFT:
                  return isSkipPosition(x, y - 1, grid);
            case ALL_DIRECTION.RIGHT:
                  return isSkipPosition(x, y + 1, grid);
            default:
                  console.log(`The direction ${direction} is not found...`);
      }
}

// So the number of island is length of key of circuits dictionary
var numIslands = function (grid) {
      if (!grid.length) return 0;
      water_visited = [];
      circuits = {};
      const gridWrapper = wrapperGrid(grid);
      printGrid(gridWrapper);
      for (let i = 0; i < gridWrapper.length; i++) {
            for (let j = 0; j < gridWrapper[i].length; j++) {
                  if (isSkipPosition(i, j, gridWrapper)) {
                        continue;
                  }
                  findCircuit(i, j, gridWrapper);
            }
      }
      return Object.keys(circuits).length;
};

const grid = [
      ['1', '1', '1', '1', '1', '0', '1', '1', '1', '1'],
      ['1', '0', '1', '0', '1', '1', '1', '1', '1', '1'],
      ['0', '1', '1', '1', '0', '1', '1', '1', '1', '1'],
      ['1', '1', '0', '1', '1', '0', '0', '0', '0', '1'],
      ['1', '0', '1', '0', '1', '0', '0', '1', '0', '1'],
      ['1', '0', '0', '1', '1', '1', '0', '1', '0', '0'],
      ['0', '0', '1', '0', '0', '1', '1', '1', '1', '0'],
      ['1', '0', '1', '1', '1', '0', '0', '1', '1', '1'],
      ['1', '1', '1', '1', '1', '1', '1', '1', '0', '1'],
      ['1', '0', '1', '1', '1', '1', '1', '1', '1', '0'],
];

const numberOfIslands = numIslands(grid);

console.log('circuits: ', circuits);
console.log('numberOfIslands: ', numberOfIslands);
