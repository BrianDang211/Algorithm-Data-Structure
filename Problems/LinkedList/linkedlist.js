class ListNode {
      val;
      next = null;

      constructor(val, next) {
            this.val = val === undefined ? 0 : val;
            this.next = next === undefined ? null : next;
      }

      static buildListNode(arr) {
            if (!arr?.length) return;
            const linkedList = new ListNode(arr[0], null);
            let top = linkedList;
            let i = 1;
            while (i < arr.length) {
                  top.next = new ListNode(arr[i], null);
                  top = top.next;
                  i++;
            }
            return linkedList;
      }
}

module.exports = { ListNode };
