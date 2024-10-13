import { useEffect } from "react";

const useMouseKeys = (
  keyMap: Record<string, (event: MouseEvent) => void> = {},
  options = { mouseDown: true, mouseUp: true },
) => {
  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      const eventKey = `mousedown.${event.button}`;
      if (keyMap[eventKey] && options.mouseDown !== false) {
        keyMap[eventKey](event);
      }
    };

    const handleMouseUp = (event: MouseEvent) => {
      const eventKey = `mouseup.${event.button}`;
      if (keyMap[eventKey] && options.mouseUp !== false) {
        keyMap[eventKey](event);
      }
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("contextmenu", (event) => event.preventDefault()); // Prevent right-click context menu

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("contextmenu", (event) =>
        event.preventDefault(),
      );
    };
  }, [keyMap, options]);
};

export default useMouseKeys;
