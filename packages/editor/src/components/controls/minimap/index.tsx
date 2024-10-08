import { MiniMap as FlowMiniMap } from "reactflow";
import styles from "./minimap.module.css";

const MiniMap = () => {
  return (
    <FlowMiniMap
      className={styles.miniMap}
      style={{ width: 145, height: 110 }}
      position="bottom-left"
      pannable
      zoomable
    />
  );
};

export default MiniMap;
