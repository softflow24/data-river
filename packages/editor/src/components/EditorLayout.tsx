import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@data-river/shared/ui/components/ui/resizable";
import { useEffect, useRef } from "react";
import { ImperativePanelHandle } from "react-resizable-panels";
import { useDispatch } from "react-redux";
import { useLayoutState } from "../hooks/useLayoutState";
import {
  setIsBottomPanelDragging,
  setIsBottomPanelHovered,
  setIsBottomPanelVisible,
} from "../slices/layoutSlice";
import { BottomResizeHandle } from "./layout/BottomResizeHandle";
import BottomPanel from "./BottomPanel";
import RightPanel from "./RightPanel";
import LeftPanel from "./LeftPanel";
import FlowChart from "./Flow";

interface EditorLayoutProps {
  readOnly?: boolean;
}

export function EditorLayout({ readOnly = false }: EditorLayoutProps) {
  const dispatch = useDispatch();
  const {
    isBottomPanelDragging,
    isBottomPanelHovered,
    isBottomPanelVisible,
    isRightPanelVisible,
  } = useLayoutState();

  const flowRef = useRef<ImperativePanelHandle>(null);
  const footerRef = useRef<ImperativePanelHandle>(null);
  const rightSidebarRef = useRef<ImperativePanelHandle>(null);

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

  if (readOnly) {
    return (
      <div className="h-full w-full">
        <FlowChart readonly />
      </div>
    );
  }

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full">
      <ResizablePanel id="left-sidebar" order={0} collapsible defaultSize={0}>
        <LeftPanel />
      </ResizablePanel>
      <ResizableHandle withHandle hitAreaMargins={{ coarse: 10, fine: 10 }} />
      <ResizablePanel id="flow-footer" order={1} minSize={10} defaultSize={100}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel id="flow" ref={flowRef} defaultSize={100}>
            <FlowChart />
          </ResizablePanel>
          <BottomResizeHandle
            isHovered={isBottomPanelHovered}
            isDragging={isBottomPanelDragging}
            onDragStart={() => dispatch(setIsBottomPanelDragging(true))}
            onDragEnd={() => dispatch(setIsBottomPanelDragging(false))}
            onHoverChange={(hovered: boolean) =>
              dispatch(setIsBottomPanelHovered(hovered))
            }
          />
          <ResizablePanel
            id="footer"
            ref={footerRef}
            collapsible
            defaultSize={0}
            minSize={2}
            maxSize={98}
            onExpand={() => dispatch(setIsBottomPanelVisible(true))}
            onCollapse={() => dispatch(setIsBottomPanelVisible(false))}
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
  );
}
