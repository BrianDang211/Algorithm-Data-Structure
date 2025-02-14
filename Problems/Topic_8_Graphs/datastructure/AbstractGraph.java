package Problems.Topic_8_Graphs.datastructure;

import java.util.Map;
import java.util.Set;

/**
 * We use generic type for this abstract class:
 * - "VT" means "vertice type"
 * - "GT" means  "graph type"
 */
public class AbstractGraph<VT, GT> implements GraphException {
      private Map<VT, VT[]> initGraphData;
      private int nVertice;
      private GT graph=null;

      public Map<VT, VT[]> getInitGraphData() {
            return this.initGraphData;
      }

      public Integer getNumberOfVertice() {
            return this.nVertice;
      }

      public GT getGraphData() {
            return this.graph;
      }

      public void setGraphData(GT graph) {
            if (graph==null) return;
            this.graph = graph;
      }

      public void setInitGraphData(Map<VT, VT[]> data) {
            this.initGraphData = data;
      }

      public void setNumberOfVertice(int n) {
            if (n==0) return;
            this.nVertice = n;
      }
 
      public boolean hasEdgeBetweenTwoVertices(VT from, VT to) {
            if (from == to) return true;
            VT[] dictOfVertice = this.initGraphData.get(from);
            if (dictOfVertice.length == 0) return false;
            for(int i=0; i<dictOfVertice.length; i++) {
                  // make sure with VT is Object, it still can compare correct.
                  if (dictOfVertice[i].equals(to)) return true;
            }
            return false;
      }

      public boolean isVerticeExist(VT v) {
            if (v==null) return false;
            Set<VT> keys = this.initGraphData.keySet();
            return keys.contains(v);
      }

      @Override
      public void handleVerticeNotFoundException(String message) {
           System.out.println(message);
      }

      @Override
      public void handlePathNotFoundException(String message) {
            System.out.println(message);
      }

      @Override
      public void handleEulerCircuitNotFoundException(String message) {
            System.out.println(message);
      }
}
