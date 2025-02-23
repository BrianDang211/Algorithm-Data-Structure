/**
 * Link Problem: https://leetcode.com/problems/add-two-numbers/description/?envType=study-plan-v2&envId=top-interview-150
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const { ListNode } = require('../../LinkedList/linkedlist');

const l1 = ListNode.buildListNode([
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 1,
]);

const l2 = ListNode.buildListNode([5, 6, 4]);

function getNumberFromLinkedList(linkedList) {
      if (!linkedList) return 0;
      const stack = [];
      let top = linkedList;
      while (top.next) {
            stack.push(top.val);
            top = top.next;
      }
      if (!stack.length) return;
      let linkedListToNumber = '';
      for (let i = stack.length - 1; i >= 0; i--) {
            linkedListToNumber += String(stack[i]);
      }
      console.log('linkedListToNumber: ', linkedListToNumber);
      return Number(linkedListToNumber);
}

function convertNumberToLinkedList(number) {
      if (number === undefined || Number.isNaN(number)) return null;
      const digits = number.toString().split('').map(Number);
      if (!digits?.length) return;
      const linkedListResult = new ListNode(number[digits.length - 1], null);
      let i = digits.length - 2;
      while (i >= 0) {
            linkedListResult.next = new ListNode(number[i], null);
            i--;
      }
      return linkedListResult;
}

var addTwoNumbers = function (l1, l2) {
      const n1 = getNumberFromLinkedList(l1);
      const n2 = getNumberFromLinkedList(l2);
      console.log('n1: ', n1);
      console.log('n2: ', n2);
      return convertNumberToLinkedList(n1 + n2);
};

console.log('l1: ', l1);
console.log('l2, ', l2);

const re = addTwoNumbers(l1, l2);

console.log('result: ', re);
