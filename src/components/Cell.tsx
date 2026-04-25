import type { MouseEvent } from "react";

type CellParamsType = {
    cellValue: number,
    setCellValue: (value: number) => void,
    isMouseDown: boolean,
    mouseButton: number,
}

function Cell({ cellValue, setCellValue, mouseButton, isMouseDown }: CellParamsType) {
    const fillCell = () => cellValue === 1 ? setCellValue(0) : setCellValue(1);
    const blockCell = () => cellValue === -1 ? setCellValue(0) : setCellValue(-1);

    function handleMouseDown(event: MouseEvent) {
        event.preventDefault();
        if (event.button === 0) fillCell();
        if (event.button === 2) blockCell();
    }

    function handleMouseOver() {
        if (isMouseDown && mouseButton === 0) fillCell();
        if (isMouseDown && mouseButton === 2) blockCell();
    }

    return (
        <div
            className={`cell ${cellValue === 1 ? "filled" : ""}`}
            onMouseDown={handleMouseDown}
            onMouseOver={handleMouseOver}
        >{cellValue === -1 ? "X" : ""}</div>
    );
}

export default Cell;