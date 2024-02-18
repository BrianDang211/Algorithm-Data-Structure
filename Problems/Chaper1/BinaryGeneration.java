import java.util.Arrays;

/**
 * Input: n (n >=1, n E Z+)
 * Output: Array binary
 */
public class BinaryGeneration {
      // 000 => 001 => 010 => 011 => 100 => 101 => 111
      // Time cost: O(2*n) + 0((2^n - 1)*(2^n - 1))
      // Space cost: 
      public static String[] solution(int n) {
            String[] results = new String[(int) Math.pow(2, n)]; // 2^n B
            String MIN = autoGenerate(n, "0"); // n bytes
            String MAX = autoGenerate(n, "1"); // n bytes
            results[0] = MIN;
            int interator = 0; // 1 byte | 4 byte => 32 bit => 1 byte, 64 bit => 4 bytes
            while(!results[interator].equals(MAX)) {
                  String previousConfig = results[interator];
                  for (int i=previousConfig.length()-1; i >= 0; i--) {
                        if (previousConfig.charAt(i) == '0') {
                              String nextConfig = previousConfig.substring(0, i) + '1' + autoGenerate(previousConfig.substring(i+1).length(), "0");
                              results[++interator] = nextConfig;
                              break;
                        }
                  }
            }
            return results;
      }

      public static String autoGenerate(int n, String c) {
            String result = "";
            while (n > 0) {
                  result += c;
                  n--;
            }
            return result;
      }
      
      public static void main(String []args) {
            String [] results = solution(2);
            int a = 10;
            int b = a << 2;
            System.out.println("b ============== " + b);
            System.out.println("results = " + Arrays.toString(results));
      }
}