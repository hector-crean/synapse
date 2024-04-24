import {
    Panel
} from "@xyflow/react";
import { Dispatch, memo, SetStateAction } from "react";

import { Button } from "@/components/ui/button";
import { cursorCtr, CursorState } from "../cursors/Cursor";


export type ModeControllerProps = {
    cursorState: CursorState,
    setCursorState: Dispatch<SetStateAction<CursorState>>
};

function ModeControllerComponent({
    cursorState, setCursorState

}: ModeControllerProps) {


    return (
        <Panel
            // className={cc(["react-flow__controls", className])}
            className={'flex flex-row'}
            position={'top-left'}
            data-testid="rf__controls"
        >
            <Button
                onPointerDown={() => setCursorState(cursorCtr.comment)}
                title="Save"
                aria-label="Save"
                disabled={false}
            >
                Comment
            </Button>
            <Button
                onPointerDown={() => setCursorState(cursorCtr.pan)}
                title="Save"
                aria-label="Save"
                disabled={false}
            >
                Pan
            </Button>

        </Panel>
    );
}


export const ModeController = memo(ModeControllerComponent);
