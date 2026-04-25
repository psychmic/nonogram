import { useState } from "react";
import type { MouseEvent } from "react";

type CellParamsType = {
    mouseButton: number,
    isMouseDown: boolean,
}

function Cell({ mouseButton, isMouseDown }: CellParamsType) {
    const [value, setValue] = useState(0);

    let styles;
    if (value === 1) styles = {background: "black"};
    if (value === -1) styles = {background: "white"};

    function fillCell() {
        return value === 1 ? setValue(0) : setValue(1);
    }
    function blockCell() {
        return value === -1 ? setValue(0) : setValue(-1);
    }

    function handleMouseDown(event: MouseEvent) {
        if (event.button === 0) fillCell();
        if (event.button === 2) blockCell();
    }
    function handleMouseOver() {
        if (isMouseDown && mouseButton === 0) fillCell();
        if (isMouseDown && mouseButton === 2) blockCell();
    }

    return (
        <div 
            className="cell"
            style={styles}
            onMouseDown={handleMouseDown}
            onMouseOver={handleMouseOver}
        ></div>
    );
}

export default Cell;