/*React Component whose props can be serialised / deserialised*/

import { ReactNode } from "react";

import { Flow, FlowProps } from "./flow/Flow";

type UuidV4 = `${string}-${string}-${string}-${string}-${string}`;
type Identifiable = { id: UuidV4 };

type RenderableNodeProps<T, P> = { type: T; props: P };

type FlowNode = RenderableNodeProps<"Flow", FlowProps>;


type RenderableNode = FlowNode;

type Renderable = RenderableNode & Identifiable;

const render = ({ type, props, id }: Renderable): ReactNode => {
  switch (type) {
    case "Flow":
      return <Flow key={id} {...props} />;

    default:
      return null;
  }
};

export { render };
export type { Identifiable, Renderable, RenderableNodeProps, UuidV4 };

/// utility functions
