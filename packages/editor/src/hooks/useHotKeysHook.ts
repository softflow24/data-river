import { useHotkeys } from "react-hotkeys-hook";
import { useDispatch } from "react-redux";
import { setIsPanning } from "@/slices/editorSlice";
import { AppDispatch } from "@/store";
import useMouseKeys from "./useMouseKeys";

export const useHotKeysHook = () => {
  const dispatch = useDispatch<AppDispatch>();

  useHotkeys(
    "mousedown.2",
    () => {
      console.log("mousedown.2");
      dispatch(setIsPanning(true));
    },
    {
      keyup: false,
    },
  );

  useHotkeys(
    "mouseup.2",
    () => {
      console.log("mouseup.2");
      dispatch(setIsPanning(false));
    },
    {
      keydown: false,
    },
  );

  useHotkeys(
    "mousedown.1",
    () => {
      dispatch(setIsPanning(true));
    },
    {
      keyup: false,
    },
  );

  useHotkeys(
    "mouseup.1",
    () => {
      dispatch(setIsPanning(false));
    },
    {
      keydown: false,
    },
  );

  useMouseKeys(
    {
      "mouseup.1": () => {
        dispatch(setIsPanning(false));
      },
      "mousedown.1": () => {
        dispatch(setIsPanning(true));
      },
      "mouseup.2": () => {
        dispatch(setIsPanning(false));
      },
      "mousedown.2": () => {
        dispatch(setIsPanning(true));
      },
    },
    {
      mouseDown: true,
      mouseUp: true,
    },
  );
};

export default useHotKeysHook;
