import { useSelector } from "react-redux";
import { RootState } from "@/store";

export const useReactFlowState = () => {
  return useSelector((state: RootState) => state.reactFlow);
};
