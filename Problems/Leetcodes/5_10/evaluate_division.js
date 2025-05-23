/**
 * Link problem: https://leetcode.com/problems/evaluate-division/?envType=study-plan-v2&envId=top-interview-150
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 * 
 * Title:
 * You are given an array of variable pairs equations and an array of real numbers values, where equations[i] = [Ai, Bi] and values[i] represent the equation Ai / Bi = values[i]. Each Ai or Bi is a string that represents a single variable.
 *  You are also given some queries, where queries[j] = [Cj, Dj] represents the jth query where you must find the answer for Cj / Dj = ?.
 *  Return the answers to all queries. If a single answer cannot be determined, return -1.0.
 *  Note: The input is always valid. You may assume that evaluating the queries will not result in division by zero and that there is no contradiction.
 *  Note: The variables that do not occur in the list of equations are undefined, so the answer cannot be determined for them.
 */
/**
 * Let's me tell you how to i implement it?
 * from an array of variable pairs equations:
 * For instance:
 *
 * equations = [["a","b"],["b","c"],["b","c"]]
 * values = [2.0,3.0]
 * queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]
 *
 * The output, we expeted:
 * [6.0,0.5,-1.0,1.0,-1.0]
 *
 *
 */
var calcEquation = function (equations, values, queries) {
      
};
