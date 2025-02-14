package Problems.Topic_8_Graphs.datastructure;

public interface Graph<VT> {
      public void setGraphData();
      public void addVertice(VT fromVertice, VT toVertice);
      public boolean checkEulerCircuit();
      public VT removeVertice(VT vertice);
      public VT[] getAllAdjanceOfVertice(VT vertice);
      public VT[] findEulerCircuit();
      public VT[] findMinPath();
}