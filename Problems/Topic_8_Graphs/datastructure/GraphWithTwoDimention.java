package Problems.Topic_8_Graphs.datastructure;

import java.util.Map;

@SuppressWarnings("rawtypes")
public class GraphWithTwoDimention<VT> extends AbstractGraph<VT, int[][]> implements Graph<VT> {

      // public GraphWithTwoDimention() {}

      public GraphWithTwoDimention(Map<VT, VT[]> initGraphData, int nVertice) {
            this.setInitGraphData(initGraphData);
            this.setNumberOfVertice(nVertice);
            setGraphData();
      }

      public void debug() {
            System.out.println("The graph data logging...");
            if (this.getGraphData()==null) {
                  System.out.println("null ^~^...");
                  return;
            }
            for(int i=0; i<this.getNumberOfVertice(); i++) {
                  for(int j=0; j<this.getNumberOfVertice(); j++) {
                        System.out.print(this.getGraphData()[i][j] + " ");
                  }
                  System.out.println("");
            }
      }

      @Override
      public void addVertice(VT fromVertice, VT toVertice) {
           int[][] graph = this.getGraphData();
      }

      @Override
      public VT removeVertice(VT vertice) {
            // TODO Auto-generated method stub
            throw new UnsupportedOperationException("Unimplemented method 'removeVertice'");
      }

      @Override
      public VT[] getAllAdjanceOfVertice(VT vertice) {
            // TODO Auto-generated method stub
            throw new UnsupportedOperationException("Unimplemented method 'getAllAdjanceOfVertice'");
      }

      @SuppressWarnings("unchecked")
      @Override
      public void setGraphData() {
            if (this.getNumberOfVertice() == 0) return;
            if (this.getGraphData()==null) {
                  this.setGraphData(new int[this.getNumberOfVertice()][this.getNumberOfVertice()]);
            };
            for(int i=0; i<this.getNumberOfVertice(); i++) {
                  for(int j=0; j<this.getNumberOfVertice(); j++) {
                        this.getGraphData()[i][j] = this.hasEdgeBetweenTwoVertices((VT) Integer.valueOf(i + 1), (VT) Integer.valueOf(j + 1)) ? 1 : 0;
                  };
            };
      };

      @Override
      public boolean checkEulerCircuit() {
            // TODO Auto-generated method stub
            throw new UnsupportedOperationException("Unimplemented method 'checkEulerCircuit'");
      }

      @Override
      public VT[] findEulerCircuit() {
            // TODO Auto-generated method stub
            throw new UnsupportedOperationException("Unimplemented method 'findEulerCircuit'");
      }

      @Override
      public VT[] findMinPath() {
            // TODO Auto-generated method stub
            throw new UnsupportedOperationException("Unimplemented method 'findMinPath'");
      }
      
}