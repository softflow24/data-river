import { Provider } from "react-redux";

import store from "./store";
import FlowChart from "./components/Flow";

const Editor = () => {
  return (
    <Provider store={store}>
      <FlowChart />
    </Provider>
  );
};

export default Editor;
