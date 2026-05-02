import type { MouseEvent } from "react";

type CellParamsType = {
    cellValue: number,
    setCellValue: (value: number) => void,
    isMouseDown: boolean,
    mouseButton: number,
    cellStyles: {
        borderTop: string,
        borderRight: string,
        borderBottom: string,
        borderLeft: string,
    },
}

function Cell({ cellValue, setCellValue, mouseButton, isMouseDown, cellStyles }: CellParamsType) {
    function fillCell(value: number, doOverride: boolean) {
        if (cellValue === value) {
            setCellValue(0);
        } else if(cellValue === 0 || doOverride) {
            setCellValue(value);
        }
    }

    function handleMouseDown(event: MouseEvent) {
        event.preventDefault();
        if (event.button === 0) fillCell(1, true);
        if (event.button === 2) fillCell(-1, true);
    }

    function handleMouseOver() {
        if (isMouseDown && mouseButton === 0) fillCell(1, false);
        if (isMouseDown && mouseButton === 2) fillCell(-1, false);
    }

    return (
        <div
            style={cellStyles}
            className={`cell ${cellValue === 1 ? "filled" : ""}`}
            onMouseDown={handleMouseDown}
            onMouseOver={handleMouseOver}
        >{cellValue === -1 ? "X" : ""}</div>
    );
}

export default Cell;