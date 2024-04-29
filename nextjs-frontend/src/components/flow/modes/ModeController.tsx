import {
    Panel
} from "@xyflow/react";
import { Dispatch, memo, SetStateAction } from "react";

import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { ChatBubbleIcon, HandIcon } from "@radix-ui/react-icons";
import { cursorCtr, CursorState } from "../cursors/Cursor";

export type ModeControllerProps = {
    cursorState: CursorState,
    setCursorState: Dispatch<SetStateAction<CursorState>>
};

function ModeControllerComponent({
    cursorState, setCursorState

}: ModeControllerProps) {

    const handleModeChange = (value: string) => {
        switch (value) {
            case 'Pan':
                setCursorState(cursorCtr.pan)
                break;
            case 'Comment':
                setCursorState(cursorCtr.comment)
                break;
            default:
                setCursorState(cursorCtr.pan)
                break;

        }
    }


    return (
        <Panel
            // className={cc(["react-flow__controls", className])}
            className={'flex flex-row'}
            position={'top-left'}
            data-testid="rf__controls"
        >


            <ToggleGroup value={cursorState.mode} type='single' onValueChange={handleModeChange}>
                <ToggleGroupItem value="Pan" aria-label="Toggle bold" className="bg-white text-black-950">
                    <HandIcon />
                </ToggleGroupItem>
                <ToggleGroupItem value="Comment" aria-label="Toggle italic" className="bg-white text-black-950">
                    <ChatBubbleIcon />
                </ToggleGroupItem>

            </ToggleGroup>


        </Panel>
    );
}


export const ModeController = memo(ModeControllerComponent);
