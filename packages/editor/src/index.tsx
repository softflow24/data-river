import { Provider } from "react-redux";
import { ReactFlowProvider } from "reactflow";

import store from "./store";
import FlowChart from "./components/Flow";

const Editor = () => {
  return (
    <Provider store={store}>
      <ReactFlowProvider>
        <FlowChart />
      </ReactFlowProvider>
    </Provider>
  );
};

export default Editor;
