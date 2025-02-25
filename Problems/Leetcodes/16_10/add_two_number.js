/**
 *   
 * @param {*} l1
 * @param {*} l2
 * @returns
 * Idea: 
 * l1=[2,4,3]
 * l2=[5,6,9]
 * 
 * number_of_l1 + number_of_n2 = 7013
 * 
 * l1_i + l2_i (i: 1->while l1!==null || l2 !== null)
 * case: n = l1_i + l2_i > 10 
 * -> Math.floor(n/10)
 */
var addTwoNumbers = function (l1, l2) {
      let dummy = new ListNode();
      let res = dummy;
      let total = 0,
            carry = 0;

      while (l1 || l2 || carry) {
            total = carry;

            if (l1) {
                  total += l1.val;
                  l1 = l1.next;
            }
            if (l2) {
                  total += l2.val;
                  l2 = l2.next;
            }

            let num = total % 10; // get modular
            carry = Math.floor(total / 10);
            dummy.next = new ListNode(num);
            dummy = dummy.next;
      }

      return res.next;
};
