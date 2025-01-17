/**
 * Input:
 * - N disks (N > 0)
 * - Three rods
 * The disks are stacked in decreasing value of diameter, and our purpose is move all disks in stack at the first rod to the last rod.
 * With three rules:
 * 1) Only one disk can be moved at a time.
 * 2) Each mode consists of taking the upper disk from one of the stacks and placing it on top of another stack.
 * 3) No disk may be placed on top of a smaller disk.
 * Output:
 *  - Detail path which we finded to move all disks from first rod to last rod.
 * 
 * For example:
 * Input: 
 * 
 * 3 rod 
 * suppose that all disk stack at first rod.
 * number of disks is equal 3
 * 
 * ARRAY_ROD_IDS = [1->smallest_diameter,2,3->largest_diameter], 
 * *** We also it similar as diameter of each disk
 * ARRAY_DISK_IDS = [1,2,3]
 * 
 * Input: 
 * [
 *    [1,2,3],
 *    [],
 *    []
 * ]
 * Output:
 * -> Format for output: [from_rod_id,to_rod_id,disk_id]
 * [
      [
            [1,2,1],[1,3,2],[2,3,1],[1,2,3],[3,1,1],[3,2,2],[1,2,1],
            [2,3,1],[2,1,2],[3,1,1],[2,3,3],[1,2,1],[1,3,2],[2,3,1]
      ],
      [[1,3,1],[1,2,2],[3,2,1],[1,3,3],[2,1,1],[2,3,2],[1,3,1]]
   ]
 */

const { autogenerateArrNumber } = require("../../Utils/GenerateNumber");

// Expand our problem with number of rods passed to function like as a argument
// condition: Number of disks always less of equal than number of rods.
const NUMBER_OF_RODS = 3;
const NUMBER_OF_DISKS = 3;

const arrayRodIds = autogenerateArrNumber(1,1,NUMBER_OF_RODS);
const arrayDiskIds = autogenerateArrNumber(1,1,NUMBER_OF_DISKS);

/**
 * Idea:
 * 
 * In output results we will have multiple solution to move all disks from first rod to last rod.
 * 
 * The first disk in first rod will have n-1 position to move.
 * 
 * I think that number of path result will dependency on the rud avaiable for first disk.
 * 
 * How to implement it?
 * 
 * // We have some idea that, we only stop algothirm when all disks moved to last rod, and 
 * it must satisfies that one disk with diameter greater than another disk and it stand on top of
 * another disk.
 * 
 * Step-by-step?
 * 1) 
 * 2)
 * 3)
 * 
 * 
 */

const matrix = [];

function initMatrix() {
      for(let i = 0; i < NUMBER_OF_RODS; i++) {
            matrix[i] = i===0 ? arrayDiskIds : [];
      };
};

initMatrix();

console.log(matrix);

// Step 1: I initial a matrix with at index 0 has value is all disks, and another position will inited by empty array
// With each row crossresponse is rud and each columnt crossresponse is diameter of disk
// Step 2: I excute loop matrix at step 1, and 
// check if any rud which has index distinct 2 
/**
 * and 
 */
// (Because in our problem we suppost that number of ruds are 3, and we will expand it later)
/**
 * We can use recursive programing
 *
 * 
 * 
 * 
 * 
 */
let saveCurrentMatrixStateForRudNumber = [];

// results format: [[[1,3,1],[1,2,2],[3,2,1],[1,3,3],[2,1,1],[2,3,2],[1,3,1]]]
function solution(fromRudNumber=0) {
      // Base case for move disks
      // 1) all disks have moved to last rud
      if(checkSolutionCompleted(fromRudNumber)) {
            console.log("Stop moving ==================== ");
            return [];
      };
      const results = [];
      saveCurrentMatrixStateForRudNumber = matrix;
      const diskOnCurrentRud = [...matrix[fromRudNumber]];
      for(let i=0; i<diskOnCurrentRud.length; i++) {
            const toRudNumbers = findToRudAvaiable(fromRudNumber, diskOnCurrentRud[i]);  
            // console.log("==============================");
            // console.log("Current Disk Number: ", diskOnCurrentRud[i]);
            // console.log(toRudNumbers);
            // console.log("---------------------------------");
            toRudNumbers.forEach(toRudNumber => {
                  move(fromRudNumber, toRudNumber);
            });
            // console.log("After move ==============================");
            // console.log("The matrix after move: ", matrix);
            // console.log("toRudNumbers: ", toRudNumbers);
            // console.log("---------------------------------");
            if (toRudNumbers.length === 0) {
                  // call recursive at here
                  const nextRudToMove = getNextRudToMove(currentRudNumber);
                  if (nextRudToMove?.length) {
                        nextRudToMove.forEach(nextRud => {
                              const subResults = solution(nextRud);
                              console.log("Sub results ==== ", subResults);
                        });
                  };
            };
      };
      return results;
};

function getNextRudToMove(currentRudNumber) {
      if (currentRudNumber < 0 || currentRudNumber > matrix.length) return;
      const results = [];
      for(let i=0; i<matrix.length; i++) {
            if (i===currentRudNumber) continue;
            if (matrix[i].length) {
                  results.push(i);
            };
      };
      return results;
}

function checkSolutionCompleted(rudNumber) {
      if (rudNumber != matrix.length - 1) return false;
      const allDisksOnRudNumberChecking = matrix[rudNumber];
      if (allDisksOnRudNumberChecking.length !== NUMBER_OF_DISKS) return false;
      // Check all disks have sorted with increment order
      // We have multiple to check an array sorted
      // Basic idea, we will compare two elements consecutive
      for(let i=0; i < allDisksOnRudNumberChecking.length; i++) {
            if ((i+1 < allDisksOnRudNumberChecking.length) 
                  && allDisksOnRudNumberChecking[i] > allDisksOnRudNumberChecking[i+1]
            ) {
                  return false;
            };
      };
      return true;
};

function resetMatrix() {
      // roll-back all matrix value
      for (let i=0; i < matrix.length; i++) {
            for (let j=0; j < matrix[0].length; j++) {
                  matrix[i][j] = saveCurrentMatrixStateForRudNumber[i][j];
            };
      };
};

function findToRudAvaiable(currentRudNumber, currentDiskNumber) {
      if(currentRudNumber > matrix.length || currentRudNumber < 0) return [];
      const results = [];
      for(let rud=0; rud<matrix.length; rud++){
            if(rud === currentRudNumber) continue;
            const topDiskOfNextRud = matrix[rud].length > 0 ? matrix[rud][0] : null; 
            if(topDiskOfNextRud !== null) {
                  if(topDiskOfNextRud < currentDiskNumber) continue;
            };
            results.push(rud);
      };
      return results;
};

function move(fromRudId, toRudId) {
      if (fromRudId < 0 || fromRudId > matrix.length || toRudId < 0 || toRudId > matrix.length) {
            throw new Error("Invalid fromRudId or toRudId.");
      };
      if (matrix[fromRudId].length === 0) return;
      // pop the top disk of from rub and push to top of next rub
      const diskPoped = matrix[fromRudId].splice(0,1);
      matrix[toRudId].unshift(diskPoped[0]);
};

const results = solution();

console.log("result: ", results);