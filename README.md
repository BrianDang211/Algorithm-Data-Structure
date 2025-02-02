/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
/**
 * Input:
 * An integer array: 
 * /////// 0 1 2  3    4    5  6
 * root = [3,9,20,null,null,15,7,]
 * 
 * return:
 * The maximum depth is the number of nodes along the longest path from root node down to the
 * to the farthest left node.
 * 
 * Let's me talk to you how to i can implement it?
 * 
 * 
 * 1 tree: 
 * + Node => V, childs
 * + level of node = number of childs of it. 
 * + Layer includes nodes => Level (level_root=1 => level_child_i = level_child_i1 = ... = level_child_ik = level_root + 1)
 * => From layer concept => concept hight of tree (Depth of tree)
 * Depth_of_tree = Max (layer)
 * 
 * *** Use case:
 * + Binary Tree
 *  ++ Complete Tree (At layers less than h-1, the number childs of nodes are two)
 *  ++ Full Tree (At layers less than or equal h-1, the number childs of node are two)
 * 
 * *** General tree:
 * => Tree calls k-tree (with k is max number of child of any parent)
 * 
 * ** We have a question, this is how to we can organization in computer:
 * In computer:
 * Two methods:
 * 1) Array with rule:
 *                2
 *               /  \
 *              3    5
 *             / \  / \
 *            8   9 3  1
 *           /
 *          10
 *  Before thinking about solutions to organization tree into array
 *  We must have answer for two questions:
 *  1) Ths first question:
 *  How can get the child from an index parent? (I will call this question is think from top to bottom)
 *  How can get the parent index from an index of child? (I will call this question is think from bottom to top)
 * 
 *  Convert this tree to array
 *  [2,3,5,8,9,3,1,10,null,null,null,null,null,null,null]
 *  
 *  k-TREE
 * 
 *  With i as a parent 
 *    => k*i (first child)
 *    => k*i + 1 (second child)
 *    ...
 *    => k*i + k (k child)
 * 
 *  From child index:
 *    j => j / k
 * 
 * 2) Linked list for organization a tree (we imagine what we can use address pointer to organization)
 * 
 * An Linked List has two elememnts:
 * + the 1st => Node (address pointer)
 * + the 2nd => linking (Multiple address pointer)
 * 
 * From this organization about linked list, we can improve it, and we have 
 * many case to organization a linked list.
 * 
 * It will dependency on our problem.
 * 
 * Case 1: Single linked list.
 * Node_1 => Node_2 => Node_3 => ... => end_Node => null
 * 
 * Case 2:  null <= Node_1 => 
 *                            <= Node_2 =>
 *                                  <= Node_3 =>
 *                                        ...
 *                                  <= end => null    
 * 
 * Case 3: Extend idea Case 2 but we don't want null for Head node and last node
 * so we can replace the pointer of previous_node of the head node to end_node, and
 * the next_node of last_node is head_node.
 *                                             
 *  
 * class Node<T> {
 *      T value;
 *      Node[] childs;
 * }
 * 
 * When we use stack or queue data structure?
 * What is the stack?
 * => Array | linked list
 * *** Which is the best choice?
 * *** What is array data-structure?
 *    + An array is include elements have some data-type
 *    + We can access to array by the index of array
 *    => Fixed size for some languages (C/C++, java, rust => when we define an array, we must have size for it.)
 *    
 *    To compare about performance of array and linked-list?
 *    We have 1 operator:
 *    1) The first operator it calls find element in array
 *    => Loop all elements of an array.
 * 
 * *** What is linked list data-structure?
 *    + A linked list is include mutiple node inside it?
 *    
 *    + Use loop
 *    + <index,v> => find index => insert/delete at first and after the index
 *    
 * What is the queue?
 * 
 * 
 * 
 */
# Algorithm-Data And Data Structure

**** All time for engineering

This is repos public some data-structure with Problem & solutions

- Leetcode, hackerRank Problems and solution for its.

*** Some extensions:
I. Pretier Formatter extension
1) Prettier Formatter for formatter 
2) How to config it?
- on Extension on vs code find for Prettier Formater
- add .prettierrc config file at root project
3) At your programming file, use short-hand to format your code:
```
      ctrl + shift + f
```
II) Winston node module
```
npm install winston
```


