import { MiniMap as FlowMiniMap } from "reactflow";
import styles from "./minimap.module.css";

const MiniMap = () => {
  return (
    <FlowMiniMap
      className={styles.miniMap}
      position="bottom-left"
      pannable
      zoomable
    />
  );
};

export default MiniMap;
