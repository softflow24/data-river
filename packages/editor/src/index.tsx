import "reflect-metadata";
import "@data-river/shared/tailwind.css";
import { Provider } from "react-redux";
import { ReactFlowProvider } from "reactflow";
import store from "./store";
import FlowChart from "./components/Flow";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@data-river/shared/ui/components/ui/resizable";
import { useEffect, useMemo, useRef } from "react";
import { cn } from "@data-river/shared/ui/utils";
import { ImperativePanelHandle } from "react-resizable-panels";
import { useDispatch } from "react-redux";
import {
  setIsBottomPanelDragging,
  setIsBottomPanelHovered,
  setBottomPanelSize,
  setIsBottomPanelVisible,
} from "./slices/layoutSlice";

import _ from "lodash";
import { useLayoutState } from "./hooks/useLayoutState";
import BottomPanel from "./components/BottomPanel";
import TopRightControls from "./components/controls/top-right-controls";
import RightPanel from "./components/RightPanel";
import LeftPanel from "./components/LeftPanel";
import { Toaster } from "@data-river/shared/ui/components/ui/toaster";
import { Toaster as SonnerToaster } from "@data-river/shared/ui/components/ui/sonner";
import useHotKeysHook from "./hooks/useHotKeysHook";
const Editor = () => {
  const dispatch = useDispatch();
  const {
    isBottomPanelDragging,
    isBottomPanelHovered,
    isBottomPanelVisible,
    isRightPanelVisible,
  } = useLayoutState();

  useHotKeysHook();

  const flowRef = useRef<ImperativePanelHandle>(null);
  const footerRef = useRef<ImperativePanelHandle>(null);
  const rightSidebarRef = useRef<ImperativePanelHandle>(null);
  const debouncedSetBottomPanelSize = useMemo(
    () => _.debounce((size: number) => dispatch(setBottomPanelSize(size)), 1),
    [dispatch],
  );

  useEffect(() => {
    if (isBottomPanelVisible) {
      footerRef.current?.resize(20);
    } else {
      footerRef.current?.collapse();
    }
  }, [isBottomPanelVisible]);

  useEffect(() => {
    if (isRightPanelVisible) {
      rightSidebarRef.current?.resize(30);
    } else {
      rightSidebarRef.current?.collapse();
    }
  }, [isRightPanelVisible]);

  return (
    <ReactFlowProvider>
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel id="left-sidebar" order={0} collapsible defaultSize={0}>
          <LeftPanel />
        </ResizablePanel>
        <ResizableHandle
          withHandle={true}
          hitAreaMargins={{ coarse: 10, fine: 10 }}
        />
        <ResizablePanel
          id="flow-footer"
          order={1}
          minSize={10}
          defaultSize={100}
        >
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel id="flow" ref={flowRef} defaultSize={100}>
              <FlowChart />
            </ResizablePanel>
            <ResizableHandle
              className={cn(
                isBottomPanelHovered || isBottomPanelDragging
                  ? "w-1 bg-blue-500"
                  : "w-0",
                "transition-all duration-300",
              )}
              withHandle={isBottomPanelHovered || isBottomPanelDragging}
              onDragStart={() => dispatch(setIsBottomPanelDragging(true))}
              onDragEnd={() => dispatch(setIsBottomPanelDragging(false))}
              onMouseOver={() => dispatch(setIsBottomPanelHovered(true))}
              onMouseLeave={() => dispatch(setIsBottomPanelHovered(false))}
              hitAreaMargins={{ coarse: 10, fine: 10 }}
            />
            <ResizablePanel
              id="footer"
              ref={footerRef}
              collapsible
              defaultSize={0}
              minSize={2}
              maxSize={98}
              onExpand={() => {
                dispatch(setIsBottomPanelVisible(true));
              }}
              onCollapse={() => {
                dispatch(setIsBottomPanelVisible(false));
              }}
              onResize={(size) => {
                debouncedSetBottomPanelSize(size);
              }}
            >
              <BottomPanel />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle hitAreaMargins={{ coarse: 10, fine: 10 }} />
        <ResizablePanel
          id="right-sidebar"
          ref={rightSidebarRef}
          order={2}
          defaultSize={0}
          collapsible
        >
          <RightPanel />
        </ResizablePanel>
      </ResizablePanelGroup>
    </ReactFlowProvider>
  );
};

const EditorWithRedux = () => {
  return (
    <Provider store={store}>
      <div className="h-screen w-full flex flex-col">
        <div className="min-h-12 flex items-center justify-end p-2 border bg-background">
          <TopRightControls />
        </div>
        <Editor />
      </div>
      <Toaster />
      <SonnerToaster />
    </Provider>
  );
};

export default EditorWithRedux;
