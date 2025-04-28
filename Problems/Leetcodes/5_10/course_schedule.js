/**
 * Link Problem: https://leetcode.com/problems/course-schedule/?envType=study-plan-v2&envId=top-interview-150
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */

/**
 * The data of prerequisites: [[1,0],[0,1]] => [[c1,c2],[c2,c3]]
 * It means to finish the course with id is c1, we must finish the course with id is c2.
 *
 * [[1,0],[0,1]] => {0:[1], 1:[0]} (I call it is similar with graph)
 *
 * The my idea for this problem:
 * From the graph data we must make sure that it isn't exist cycle inside it.
 *
 * We can use the topological sort algothirm for this problem?
 * So what is the topological sort?
 * -> The topological sort work on directed acyclic graph (DAG)?
 * What is the DAG?
 * -> The DAG is directed graph, and don't exist any cycle within it.
 *
 * Write dfs -> return to topological sort result, check length of it
 * if (len(result) !== numberOfCourse) return false;
 * return true;
 *
 */
/**
 * Why we must use number of out degree for this algothirm?
 *
 * Because when a course has number of out degree more least, number of courses are dependency on it will more least
 *
 * Steps:
 * - Step 1: We use dfs for traversal this graph
 * With order visit as following:
 * + With order number of out degree is increment
 * + After then push to order result
 * - Step 2: When we visit a course which has number of out degree greater than 0
 *
 *
 *
 * Stack:
 *
 *
 * @param {*} numCourses
 * @param {*} prerequisites
 * @returns
 */
const path = require('path');
const { TreePath, tree } = require('../../Topic_5_Tree/tree');
const { loggor } = require('../../../Utils/Loggor');
const { FILE_EXTENSIONS } = require('../../../Utils/AppConstants');
const { COLOR_CODE } = require('../../../Utils/AppConstants');
const { Utils } = require('../../../Utils/Utils');
const {
      DIMENSION,
      CHARACTER_GROUP,
} = require('../../Topic_5_Tree/utils/app_constants');

const fileName_debug = new Date().getTime();

loggor.appendSubPaths(
      path.join(__dirname, `${fileName_debug}.${FILE_EXTENSIONS.CSV}`)
);

let courses = [];
let is_exist_cycle = false;
let topo_sorted_result = [];
let counter = 0;
let tree_of_courses = '';
let course_visited = [];
let allTrees = [];

const dictData = {};

function dfs(root) {
      if (
            root?.val === null ||
            root?.val === undefined ||
            topo_sorted_result.includes(root.val)
      ) {
            return;
      }
      // ++counter;
      // if (counter > 1000) {
      //       return;
      // }
      // if (counter < 1000) {
      // const valInDict = dictData[root.val];
      // if (valInDict) {
      //       valInDict.count = (valInDict.count ?? 0) + 1;
      // } else {
      //       dictData[root.val] = {
      //             val: root,
      //             count: 1,
      //       };
      // }
      let { list_adjacen_vertices = [] } =
            courses.find((c) => c.course_id === root.val) || {};
      if (list_adjacen_vertices.length) {
            list_adjacen_vertices.sort((c1, c2) => {
                  if (c1.n_out_degree === c2.n_out_degree) return 0;
                  if (c1.n_out_degree > c2.n_out_degree) {
                        return 1;
                  } else {
                        return -1;
                  }
            });
            // if (root?.val === 2) {
            //       console.log("childs -> ", list_adjacen_vertices);
            // }
            for (let i = 0; i < list_adjacen_vertices.length; i++) {
                  const current_adjacent_vertice_id = list_adjacen_vertices[i];
                  if (topo_sorted_result.includes(current_adjacent_vertice_id))
                        continue;
                  if (root.isExistedOnPath(current_adjacent_vertice_id)) {
                        is_exist_cycle = true;
                        return;
                  }
                  const newChild = root.addChild(current_adjacent_vertice_id);
                  dfs(newChild);
            }
      }
      // }
      // if (counter === 1000) {
      //       console.log("dictData -> ", dictData);
      //       // loggor.writeLog([['Course'], ...data]);
      // }
}

var canFinish = function (numCourses, prerequisites) {
      if (!prerequisites?.length) return true;
      counter = 0;
      courses = [];
      is_exist_cycle = false;
      topo_sorted_result = [];
      tree_of_courses = '';
      course_visited = [];
      allTrees = [];
      for (let i = 0; i < numCourses; i++) {
            courses[i] = {
                  course_id: i,
                  list_adjacen_vertices: [],
                  n_out_degree: 0,
            };
      }
      prerequisites.forEach(([afterCourse, preCourse]) => {
            if (preCourse >= 0 && preCourse < courses.length) {
                  courses[preCourse].list_adjacen_vertices.push(afterCourse);
                  courses[preCourse].n_out_degree += 1;
            }
      });
      // const result = compare(a,b)
      // result > 0 => [b,a]
      // result < 0 => [a,b]
      // result = 0 => keep original order of a and b
      courses.sort((c1, c2) => {
            if (c1.n_out_degree === c2.n_out_degree) return 0;
            if (c1.n_out_degree > c2.n_out_degree) {
                  return 1;
            } else {
                  return -1;
            }
      });
      debuging();
      // return;
      // console.log('courses: ', courses[courses.length - 1]);
      // debug([532]);
      // return;
      // draw();
      // console.log('courses -> ', courses);
      for (let i = 0; i < courses.length; i++) {
            const root = new TreePath(courses[i].course_id);
            dfs(root);
            // console.log('root: ', root);
            if (is_exist_cycle) {
                  return false;
            }
            // Skiping the root which already existed in topo_sorted_result
            if (topo_sorted_result.includes(root.val)) {
                  continue;
            }
            topo_sorted_result = [
                  ...topo_sorted_result,
                  ...root.convertTreeToUniqueArray().reverse(),
            ];
      }
      console.log('before reverse topo_sorted_result -> ', topo_sorted_result);

      topo_sorted_result = topo_sorted_result.reverse();
      console.log('after reverse topo_sorted_result -> ', topo_sorted_result);
      const check = topo_sorted_result.length === numCourses;
      // checkLog();
      // topo_sorted_result = [];
      return check;
};

function buildTree(root) {
      if (!root) return;
      course_visited.push(root.val);
      const course_child_ids = courses.find(
            (c) => c.course_id === root.val
      )?.list_adjacen_vertices;
      if (!course_child_ids?.length) return;
      // console.log("course_child_ids -> ", course_child_ids);
      for (let i = 0; i < course_child_ids.length; i++) {
            const newChild = root.addChild(course_child_ids[i]);
            if (!root.isExistedOnPath(course_child_ids[i])) {
                  buildTree(newChild);
            }
      }
}

function initTree() {
      // console.log("courses -> ", courses);
      for (let i = 0; i < courses.length; i++) {
            const currentCourse = courses[i];
            if (course_visited.includes(currentCourse?.course_id)) continue;
            const root = new TreePath(currentCourse?.course_id);
            buildTree(root);
            // console.log("root -> ", root);
            allTrees.push(root);
      }
}

function drawTree() {
      initTree();
      if (!allTrees.length) return;
      allTrees.forEach((tree) => {
            const treePath = tree.drawTreePath();
            console.log(treePath);
      });
}

function debuging() {
      drawTree();
}

/**
 * 1...n
 *
 * Dictionary like as:
 * 1 -> [3,4]
 * 2 -> [3]
 * 3 -> [1]
 * 4 -> []
 *
 * How to we can build a tree?
 *
 */

// console.log(Utils.getConsoleColor(), 'I am cyan');

let travels = [];

function debug(course_ids = []) {
      if (!course_ids?.length) return;
      // writeFile(`course_schedule_log_${(new Date()).getTime}`,`course_ids: ${course_ids}`);
      // console.log('course_ids: ', course_ids);
      for (let i = 0; i < course_ids.length; i++) {
            const course_info = courses.find(
                  (c) => c.course_id === course_ids[i]
            );
            if (course_info) {
                  if (
                        travels.find(
                              (c) => c.course_id === course_info.course_id
                        )
                  ) {
                        console.log('==================================');
                        loggor.writeLog([
                              ['Course Duplicated', 'Travels Data'],
                              [
                                    JSON.stringify(course_info),
                                    JSON.stringify(travels),
                              ],
                        ]);
                        console.log('**********************************');
                        break;
                  }
                  travels.push(course_info);
                  console.log('course_info: ', course_info);
                  // writeFile(`course_schedule_log_${(new Date()).getTime}`,`course_info: ${course_info}`);
                  debug(course_info.list_adjacen_vertices);
            }
      }
      return;
}

const h_gap = TreePath.makeGap(
      DIMENSION.HORIZONTAL,
      CHARACTER_GROUP.TAB_CHARACTER,
      1,
);

const v_gap = TreePath.makeGap(
      DIMENSION.VERTICAL,
      CHARACTER_GROUP.VERTICAL_LINE_CHARACTER,
      3,
      h_gap,
);

// console.log("v_gap => ", v_gap);

console.log(
      100 +
            CHARACTER_GROUP.NEW_LINE_CHARACTER +
            v_gap + h_gap + 200
);

// console.log(10 + '\n' + h_gap + '\n' + v_gap + 100);
function checkLog() {
      console.log('courses: ', courses);
      console.log('topo_sorted_result length: ', topo_sorted_result.length);
      console.log('topo_sorted_result: ', topo_sorted_result);
}

module.exports = { checkLog, canFinish };
