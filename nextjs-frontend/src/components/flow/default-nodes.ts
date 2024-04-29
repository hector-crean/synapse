import { Node, XYPosition } from "@xyflow/react";
import { FlowNodeType } from "./types";


const defaultNode = <T extends FlowNodeType>(id: string, type: T['type'], position: XYPosition = { x: 0, y: 0 }): Node => {

    switch (type) {
        case 'RichTextNode':
            return {
                id,
                type: "RichTextNode",
                position,
                data: {
                    text: "Placeholder",
                },
                width: 100,
                height: 100
            }
        case 'ShapeNode':
            return {
                id,
                type: "ShapeNode",
                position,
                data: {
                    type: "circle",
                    color: "grey",
                },
                width: 100,
                height: 100
            }

        case 'input':
            return {
                id,
                type: 'input',
                position,
                data: { label: 'input' },
                width: 100,
                height: 100
            }
        case 'output':
            return {
                id,
                type: 'output',
                position,
                data: { label: 'output' },
                width: 100,
                height: 100
            }

        case 'default':
        default:
            return {
                id,
                type: 'default',
                position: { x: 0, y: 0 },
                data: { label: 'Default' },
                width: 100,
                height: 100
            }

    }
}

export { defaultNode };

