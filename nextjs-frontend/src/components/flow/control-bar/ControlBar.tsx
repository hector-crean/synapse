import {
  FitViewOptions,
  Panel,
  PanelPosition,
  useReactFlow,
  useStore,
  useStoreApi,
  type ReactFlowState,
} from "@xyflow/react";
import { ReactNode, memo } from "react";
import { shallow } from "zustand/shallow";
import styles from "./ControlBar.module.css";

import { Button } from "@/components/ui/button";
import {
  DownloadIcon,
  GroupIcon,
  LockClosedIcon,
  LockOpen1Icon,
  MinusIcon,
  PlusIcon,
  ResetIcon,
} from "@radix-ui/react-icons";

const selector = (s: ReactFlowState) => ({
  isInteractive: s.nodesDraggable || s.nodesConnectable || s.elementsSelectable,
  minZoomReached: s.transform[2] <= s.minZoom,
  maxZoomReached: s.transform[2] >= s.maxZoom,
});

export type ControlProps = {
  onSave: () => void;
  onRestore: () => void;
  /** Show button for zoom in/out */
  showZoom?: boolean;
  /** Show button for fit view */
  showFitView?: boolean;
  /** Show button for toggling interactivity */
  showInteractive?: boolean;
  /** Options being used when fit view button is clicked */
  fitViewOptions?: FitViewOptions;
  /** Callback when zoom in button is clicked */
  onZoomIn?: () => void;
  /** Callback when zoom out button is clicked */
  onZoomOut?: () => void;
  /** Callback when fit view button is clicked */
  onFitView?: () => void;
  /** Callback when interactivity is toggled */
  onInteractiveChange?: (interactiveStatus: boolean) => void;
  /** Position of the controls on the pane
   * @example PanelPosition.TopLeft, PanelPosition.TopRight,
   * PanelPosition.BottomLeft, PanelPosition.BottomRight
   */
  position?: PanelPosition;
  children?: ReactNode;
  /** Style applied to container */
  style?: React.CSSProperties;
  /** ClassName applied to container */
  className?: string;
  "aria-label"?: string;
};

function ControlsComponent({
  onRestore,
  onSave,
  style,
  showZoom = true,
  showFitView = true,
  showInteractive = true,
  fitViewOptions,
  onZoomIn,
  onZoomOut,
  onFitView,
  onInteractiveChange,
  className,
  children,
  position = "bottom-left",
  "aria-label": ariaLabel = "React Flow controls",
}: ControlProps) {
  const store = useStoreApi();

  const { isInteractive, minZoomReached, maxZoomReached } = useStore(
    selector,
    shallow
  );
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  const onZoomInHandler = () => {
    zoomIn();
    onZoomIn?.();
  };

  const onZoomOutHandler = () => {
    zoomOut();
    onZoomOut?.();
  };

  const onFitViewHandler = () => {
    fitView(fitViewOptions);
    onFitView?.();
  };

  const onToggleInteractivity = () => {
    store.setState({
      nodesDraggable: !isInteractive,
      nodesConnectable: !isInteractive,
      elementsSelectable: !isInteractive,
    });

    onInteractiveChange?.(!isInteractive);
  };

  return (
    <Panel
      // className={cc(["react-flow__controls", className])}
      className={styles.control_bar_container}
      position={position}
      style={style}
      data-testid="rf__controls"
      aria-label={ariaLabel}
    >
      <Button
        onPointerDown={onSave}
        title="Save"
        aria-label="Save"
        disabled={false}
      >
        <DownloadIcon />
      </Button>
      <Button
        onPointerDown={onRestore}
        title="Restore"
        aria-label="Restore"
        disabled={false}
      >
        <ResetIcon />
      </Button>
      {showZoom && (
        <>
          <Button
            onPointerDown={onZoomInHandler}
            title="zoom in"
            aria-label="zoom in"
            disabled={maxZoomReached}
          >
            <PlusIcon />
          </Button>
          <Button
            onPointerDown={onZoomOutHandler}
            title="zoom out"
            aria-label="zoom out"
            disabled={minZoomReached}
          >
            <MinusIcon />
          </Button>
        </>
      )}
      {showFitView && (
        <Button
          onPointerDown={onFitViewHandler}
          title="fit view"
          aria-label="fit view"
          disabled={false}
        >
          <GroupIcon />
        </Button>
      )}
      {showInteractive && (
        <Button
          onPointerDown={onToggleInteractivity}
          title="toggle interactivity"
          aria-label="toggle interactivity"
          disabled={false}
        >
          {isInteractive ? <LockOpen1Icon /> : <LockClosedIcon />}
        </Button>
      )}
      {children}
    </Panel>
  );
}

ControlsComponent.displayName = "Controls";

export const Controls = memo(ControlsComponent);
