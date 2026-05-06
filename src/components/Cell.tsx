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
    updateHighlightedColumn: () => void,
}

function Cell({ cellValue, setCellValue, mouseButton, isMouseDown, cellStyles, updateHighlightedColumn }: CellParamsType) {
    function fillCell(value: number) {
        if(cellValue === 0) {
            setCellValue(value);
        }
    }

    function handleMouseDown(event: MouseEvent) {
        event.preventDefault();
        if (event.button === 0) fillCell(1);
        if (event.button === 2) fillCell(-1);
    }

    function handleMouseOver() {
        if (isMouseDown && mouseButton === 0) fillCell(1);
        if (isMouseDown && mouseButton === 2) fillCell(-1);

        updateHighlightedColumn();
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