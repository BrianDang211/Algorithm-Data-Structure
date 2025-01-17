/**
 * Input: 
 * - An n integer nunmber are n cities
 * - A m integer number are m routes between n cities
 * 
 * Output:
 * Return all the paths which have minimum of cost
 * 
 * Expand out problem
 */


// Mathematics -> Matrix
// Computer Science -> Graph
// Computer Programming -> Array 

const { autogenerateArrNumber } = require("../../Utils/GenerateNumber");

const testCases = [
      {
            n:4,
            m:6,
            skip: false,
            matrixWeight: [
                  [1,2,3],
                  [1,3,2],
                  [1,4,1],
                  [2,3,1],
                  [2,4,8],
                  [3,4,4]
            ]
      },
      {
            n:4,
            m:6,
            skip: true,
            matrixWeight: [
                  [1,2,3],
                  [1,3,2],
                  [1,4,1],
                  [2,3,1],
                  [2,4,8],
                  [3,4,4]
            ]
      },
];

function main(m,n,matrixWeight) {
      console.log("m ==== ", m);
      console.log("n ====", n);
      console.log("matrix weight ==== ", matrixWeight);

      let bestCost = 0;

      function getCostForEachMove(fromCityId,toCityId) {
            if (m != matrixWeight.length) {
                  throw new Error("The row of matrix weight must be equal with value of m variable.");
            };
            for(let row=0; row<matrixWeight.length; row++) {
                  if ((matrixWeight[row][0] === fromCityId && matrixWeight[row][1] === toCityId)
                        || (matrixWeight[row][0] === toCityId && matrixWeight[row][1] === fromCityId)
                  ) {
                        return matrixWeight[row][2];
                  }
            };
      };

      /**
       * start i -> <another_cities>
       * n cities
       * 
       * 
       */

      // 1 -> [2,3,4]
      //    2 -> [3,4]
      //       3 -> [4]
      //          4 -> 1
      // Returns: [[[1,2,3], [2,3,1], [3,1,2]], [[1,2,3], [2,3,1], [3,1,2]]]

      /**
       * 
       * @param {*} fromCityId 
       * @returns 
       */
      // How to calculate cost accumulate?
      /**
       * Because we use recursive to build our algothirm, so we must memory the cost of previous path.
       */
      function tourism(fromCityId=1) {
            updateCityVisited(fromCityId);
            const toCities = getToCities(fromCityId);
            if (toCities.length === 0) {
                  return [[[fromCityId,1,getCostForEachMove(fromCityId, 1)]]];
            };
            const allPaths = [];
            let bestCostAccumulate=0;

            for(let i=0; i<toCities.length; i++) {
                  const toCity = toCities[i];
                  const costToMove = getCostForEachMove(fromCityId, toCity.id);
                  // back to the next city if can not move to any city in list cities avaiable.
                  if (!costToMove || (bestCostAccumulate>0 && costToMove > bestCostAccumulate)) continue;
                  const subPaths = tourism(toCity.id);
                  const mergeSubPath = subPaths.map(sp => {
                        const fullPath = [[fromCityId,toCity.id,costToMove], ...sp];
                        // calculate cost for each travel
                        bestCostAccumulate = fullPath.reduce((costAccumulate, subPath) => {
                              return costAccumulate+=subPath[2];
                        },0);
                        return fullPath;
                  });
                  allPaths.push(...mergeSubPath);
                  if (toCities.length >= 2) {
                        // optimize idea
                        /**
                         * With each city if it has mutiple options to go, so we can calculate direct cost for each path and compare it with 
                         * the next cost from current city to next option.
                         * if cost accumulate of the previous option greater than cost of current city to next option then continue calculate cost of path 
                         * with next option else we can break this option and continue excute compare program with another option.
                         */
                        resetCitiesData(toCities.map(c => c.id));
                  };
            };
            return allPaths;
      };

      function resetCitiesData(ids=[]) {
            if(ids.length===0) return;
            citiesData.forEach(c => {
                  if (ids.includes(c.id) && c.visited) {
                        c.visited = false;
                  };
            });
      };

      function updateCityVisited(cityId) {
            const idxOfCurrentCity = citiesData.findIndex(c => c.id === cityId);
            if (idxOfCurrentCity === -1) {
                  throw new Error(`Can not find city with id: ${cityId}`);
            };
            citiesData[idxOfCurrentCity].visited = true;
      };

      function printData() {
            citiesData.forEach(c => console.log(c));
      };

      // This action will filter another cities can visit from current city
      function getToCities(fromCityId) {
            if (!fromCityId || fromCityId > n) {
                  throw new Error("The from city Id must be greater than 0 and less or equal than value of n variable.");
            };
            return citiesData.filter(c => c.id !== fromCityId && c.visited === false);
      };

      function getBestPath() {
            const allPaths = tourism();
            console.log("allPaths === ", allPaths);
            if (allPaths.length === 0) return;
            if (allPaths.length === 1) return {
                  bestPath: allPaths[0],
                  cost: calcTotalCostOfPath(allPaths[0])
            };
            const pathSorted = allPaths.sort((p1,p2) => {
                  const cost1 = calcTotalCostOfPath(p1);
                  const cost2 = calcTotalCostOfPath(p2);
                  // if the path has been cost after push cost to path, else skip it.
                  if(!Number.isInteger(p1[p1.length-1])) {
                        p1.push(cost1);
                  };
                  if(!Number.isInteger(p2[p2.length-1])) {
                        p2.push(cost2);
                  };
                  return cost1-cost2;
            });
            const bestPath = pathSorted[0];
            const bestCost = bestPath[bestPath.length-1];
            return pathSorted.filter(ps => ps[ps.length-1] === bestCost).map(bestPath => {
                  bestPath.splice(bestPath.length-1, 1);
                  return {
                        bestPath,
                        cost: bestCost
                  };
            });
      };

      function calcTotalCostOfPath(path) {
            if (!path || !Array.isArray(path)) {
                  throw new Error("Argument `path` must be an array.");
            };
            return path.reduce((totalCost, subPath) => {
                  // only calculate cost when path is an array.
                  if(Array.isArray(subPath)) {
                        return totalCost+=subPath[2];
                  };
                  return totalCost;
            },0);
      };

      const citiesData = autogenerateArrNumber(1,1,n).map(i => {
            return {id: i, visited: false};
      });

      const bestPaths = getBestPath();
      console.log("Best paths ==== ", bestPaths);
};

function runTest() {
      testCases.filter(t => !t.skip).forEach(t => main(t.m, t.n, t.matrixWeight));
};

runTest();