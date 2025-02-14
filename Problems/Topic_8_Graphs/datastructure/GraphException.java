package Problems.Topic_8_Graphs.datastructure;

public interface GraphException {
      public void handleVerticeNotFoundException(String message);
      public void handlePathNotFoundException(String message);
      public void handleEulerCircuitNotFoundException(String message);
}
