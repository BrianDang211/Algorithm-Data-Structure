/**
 * @param {number[]} citations
 * @return {number}
 */
/**
 * - Input:
 *    + The first one we need understand what is the h-index?
 *    ** we follow from wikipedia (link: https://en.wikipedia.org/wiki/H-index)
 *    I will talk summany for this concept, 
 *    
 *    1) Author
 *    2) Publication
 *    3) ciation
 * 
 *    What is relationtive of three objects?
 *    
 *    An author -> Multiple publications -> Each publication has a number ciation
 * 
 *    From three objects, we have a concept. It called is h-index
 *    
 *    What is the h-index?
 *    
 *    - The h-index is the maximum number which we have the maximum publication'citation number greater or equal than
 *    an any interger number (1 < h_index < Max(ciations))
 *    
 * 
 * - Output:
 *    
 */
/**
 * Let me think some time
 * I'm thinking about the data-structure for this problem
 * 
 * The h_index is satisfieds these condition below:
 * 1) h_index is maximum of h (loop from 1 -> citations.length)
 * *** Why?
 * And How to find of that maximum value?
 * with each h, we can find least h publications had each publication has least h citations
 * 
 * We can write with Math:
 * Max {i E N where f(i) >= i}
 * 
 *  * @param {*} citations 
 */

var hIndex = function(citations) {
      if (citations.length < 1 && citations.length > 5000) return 0;
      const numberOfPulications = citations.length;
      let h_index=0;
      for(let h=1; h<=numberOfPulications; h++) {
            const filterPublications = citations.filter(c => c >= h);
            if (h > filterPublications.length) {
                  return h_index;
            };
            h_index = h;
      };
      return h_index;
};

const h_index = hIndex([11,15]);

console.log("h-index: ", h_index);


