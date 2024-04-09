"use client";

import {
  addEdge,
  Background,
  BackgroundVariant,
  ConnectionLineType,
  Edge,
  EdgeTypes,
  getConnectedEdges,
  getIncomers,
  getOutgoers,
  MarkerType,
  MiniMap,
  Node,
  NodeToolbar,
  NodeTypes,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  OnNodesDelete,
  OnSelectionChangeFunc,
  PanOnScrollMode,
  Position,
  ReactFlow,
  SelectionMode,
  useReactFlow,
  useStore as useReactFlowStore,
  XYPosition,
} from "@xyflow/react";
import { motion } from "framer-motion";
import {
  MouseEventHandler,
  PointerEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { NodeContextMenu } from "./context-menu/ContextMenu";
import { Controls } from "./control-bar/ControlBar";
import { PolymorphicEdge } from "./edges/PolymorphicEdge";
import { ConnectionStatus } from "./edges/validation/ConnectionStatus";
import "./Flow.css";
import styles from "./Flow.module.css";
import useAutoLayout, { LayoutOptions } from "./hooks/useAutoLayout";
import { NodeToolbarBase } from "./node-toolbar/NodeToolbarBase";
import { PolymorphicNode } from "./nodes/PolymorphicNode";
import { ShapeNode } from "./nodes/ShapeNode";

import "@xyflow/react/dist/style.css";

import { useMyPresence, useOthers } from "@/liveblocks.config";
import { LiveCursors } from "./cursors/Cursor";
import { RichTextNode } from "./nodes/RichTextNode";
import { LiveFlowEdgeType, LiveFlowNodeType } from "./types";

const nodeTypes: NodeTypes = {
  PolymorphicNode: PolymorphicNode,
  ShapeNode: ShapeNode,
  RichTextNode: RichTextNode,
} as const;

const edgeTypes: EdgeTypes = {
  PolymorphicEdge: PolymorphicEdge,
} as const;

type FlowState = {
  nodes: Array<LiveFlowNodeType>;
  edges: Array<LiveFlowEdgeType>;
  setNodes: (nodes: LiveFlowNodeType[]) => void;
  setEdges: (edges: LiveFlowEdgeType[]) => void;
  onNodesChange: OnNodesChange<LiveFlowNodeType>;
  onEdgesChange: OnEdgesChange<LiveFlowEdgeType>;
};

const proOptions = {
  account: "paid-pro",
  hideAttribution: true,
};

const defaultEdgeOptions = {
  type: "smoothstep",
  markerEnd: { type: MarkerType.ArrowClosed },
  pathOptions: { offset: 5 },
};

type FlowProps<NodeType extends Node, EdgeType extends Edge> = {
  id: string;
  nodes: Array<NodeType>;
  edges: Array<EdgeType>;
  setNodes: (nodes: Array<NodeType>) => void;
  setEdges: (edges: Array<EdgeType>) => void;
  onNodesChange: OnNodesChange<NodeType>;
  onEdgesChange: OnEdgesChange<EdgeType>;
};
function Flow<NodeType extends Node, EdgeType extends Edge>({
  id,
  nodes,
  edges,
  setNodes,
  setEdges,
  onEdgesChange,
  onNodesChange,
}: FlowProps<NodeType, EdgeType>) {
  const rfDomNode = useReactFlowStore((state) => state.domNode);

  const {
    fitView,
    screenToFlowPosition,
    toObject,
    addEdges,
    addNodes,
    deleteElements,
    getViewport,
    flowToScreenPosition,
  } = useReactFlow();

  const [layoutComputed, setLayoutComputed] = useState(true);
  const [isSelectable, setIsSelectable] = useState<boolean>(true);
  const [isDraggable, setIsDraggable] = useState<boolean>(true);
  const [isConnectable, setIsConnectable] = useState<boolean>(true);
  const [zoomOnScroll, setZoomOnScroll] = useState<boolean>(true);
  const [zoomOnPinch, setZoomOnPinch] = useState<boolean>(true);
  const [panOnScroll, setPanOnScroll] = useState<boolean>(false);
  const [panOnScrollMode, setPanOnScrollMode] = useState<PanOnScrollMode>(
    PanOnScrollMode.Free
  );
  const [zoomOnDoubleClick, setZoomOnDoubleClick] = useState<boolean>(true);
  const [panOnDrag, setPanOnDrag] = useState<boolean>(true);
  const [captureZoomClick, setCaptureZoomClick] = useState<boolean>(false);
  const [captureZoomScroll, setCaptureZoomScroll] = useState<boolean>(false);
  const [captureElementClick, setCaptureElementClick] =
    useState<boolean>(false);

  const layoutOptions: LayoutOptions = useMemo(
    () => ({
      algorithm: "dagre",
      direction: "LR",
      spacing: [100, 100],
    }),
    []
  );

  useAutoLayout(layoutOptions);

  useEffect(() => {
    const fitted = fitView();
    setLayoutComputed(fitted);
  }, [layoutComputed === true, fitView]);

  // const { cut, copy, paste, bufferedNodes } = useCopyPaste();

  // const canCopy = nodes.some(({ selected }) => selected);
  // const canPaste = bufferedNodes.length > 0;

  const onConnectNodes: OnConnect = useCallback((connection) => {
    setEdges((eds) => addEdge(connection, eds));
  }, []);

  // node handlers
  const onNodesDelete: OnNodesDelete = useCallback(
    (deleted) => {
      setEdges(
        deleted.reduce((acc, node) => {
          const incomers = getIncomers(node, nodes, edges);
          const outgoers = getOutgoers(node, nodes, edges);
          const connectedEdges = getConnectedEdges([node], edges);

          const remainingEdges = acc.filter(
            (edge) => !connectedEdges.includes(edge)
          );

          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({
              id: `${source}->${target}`,
              source,
              target,
            }))
          );

          return [...remainingEdges, ...createdEdges];
        }, edges)
      );
      setNodes(nodes.map((node) => ({ ...node, selected: false })));
    },
    [nodes, edges, setEdges, setNodes]
  );

  const onSave = useCallback(() => {
    const flow = toObject();

    localStorage.setItem(id, JSON.stringify(flow));
  }, [toObject, id]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const str = localStorage.getItem(id);
    };

    restoreFlow();
  }, [setEdges, setNodes, localStorage]);

  const [selectedNodes, setSelectedNodes] = useState<Array<Node>>([]);
  const [selectedEdges, setSelectedEdges] = useState<Array<Edge>>([]);

  const onSelectionChange: OnSelectionChangeFunc = useCallback(
    ({ nodes, edges }) => {
      setSelectedNodes(nodes);
      setSelectedEdges(edges);
    },
    []
  );

  const onAddNodes = useCallback(
    (nodes: Array<Node>) => {
      addNodes(nodes);
    },
    [addNodes]
  );

  const onDeleteNodes = useCallback(
    (nodes: Array<Node>) => {
      deleteElements({ nodes });
    },
    [deleteElements]
  );

  const [{ cursor }, updateMyPresence] = useMyPresence();
  /**
   * Return all the other users in the room and their presence (a cursor position in this case)
   */
  const others = useOthers();

  const [lastClickPosition, setLastClickPosition] = useState<XYPosition>({
    x: 0,
    y: 0,
  });

  const onPaneClick: MouseEventHandler = (event) => {
    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    setLastClickPosition(position);
  };

  const [cursorPosition, setCursorPosition] = useState<XYPosition | null>(null);

  const onPointerLeave: PointerEventHandler = useCallback(() => {
    // When the pointer goes out, set cursor to null
    setCursorPosition(null);
  }, [setCursorPosition]);

  const onPointerMove: PointerEventHandler = useCallback(
    (event) => {
      // Update the user cursor position on every pointer move
      setCursorPosition({
        x: event.clientX,
        y: event.clientY,
      });
    },
    [setCursorPosition, screenToFlowPosition]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        type: "spring",
        damping: 10,
        stiffness: 100,
      }}
      style={{ width: "100%", height: "100%" }}
    >
      <NodeContextMenu
        onCut={() => {}}
        onCopy={() => {}}
        onPaste={() => {}}
        onAddNodes={onAddNodes}
        screenToFlowPosition={screenToFlowPosition}
        lastClickPosition={lastClickPosition}
      >
        <ReactFlow
          className={styles.flow_wrapper}
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          elementsSelectable={isSelectable}
          nodesConnectable={isConnectable}
          nodesDraggable={isDraggable}
          zoomOnScroll={zoomOnScroll}
          zoomOnPinch={zoomOnPinch}
          panOnScroll={panOnScroll}
          panOnScrollMode={panOnScrollMode}
          zoomOnDoubleClick={zoomOnDoubleClick}
          panOnDrag={panOnDrag}
          nodeDragThreshold={0}
          selectNodesOnDrag={false}
          selectionMode={SelectionMode.Partial}
          onSelectionChange={onSelectionChange}
          fitView={true}
          snapToGrid={true}
          snapGrid={[25, 25]}
          fitViewOptions={{ padding: 0.1 /*nodes: [{ id: '1' }]*/ }}
          attributionPosition="top-right"
          maxZoom={Infinity}
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnectNodes}
          onNodesDelete={onNodesDelete}
          onPaneClick={onPaneClick}
          // onDragOver={onDragOver}
          // onDrop={onDrop}
          defaultEdgeOptions={defaultEdgeOptions}
          connectionLineType={ConnectionLineType.SmoothStep}
          proOptions={proOptions}
        >
          <Background
            color="#ccc"
            variant={BackgroundVariant.Dots}
            style={{ zIndex: -1 }}
          />
          <MiniMap zoomable pannable />
          <Controls onSave={onSave} onRestore={onRestore} />
          {/* <Panel position="top-left">
            <Sidebar />
          </Panel> */}

          <ConnectionStatus />
          <NodeToolbar
            nodeId={selectedNodes.map((node) => node.id)}
            position={Position.Top}
          >
            <NodeToolbarBase
              onAddNodes={() => onAddNodes(selectedNodes)}
              onDeleteNodes={() => onDeleteNodes(selectedNodes)}
            />
          </NodeToolbar>
          {/* <Cursor
            key={`my-cursor`}
            // connectionId is an integer that is incremented at every new connections
            // Assigning a color with a modulo makes sure that a specific user has the same colors on every clients
            color={"red"}
            x={cursor?.x ?? 0}
            y={cursor?.y ?? 0}
          /> */}
          <LiveCursors cursorPos={cursorPosition} />
        </ReactFlow>
      </NodeContextMenu>
    </motion.div>
  );
}

export { Flow };
export type { FlowProps, FlowState };

export { edgeTypes, nodeTypes };
