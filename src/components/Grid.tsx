import { useState } from "react";
import type { MouseEvent } from "react";
import Cell from "./Cell";

type GridParamsType = {
    height: number,
    width: number,
}

function Grid({ height, width }: GridParamsType) {
    const [gridState, setGridState] = useState(
        Array.from({length: height}, () => Array.from({length: width}, () => 0))
    );
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [mouseButton, setMouseButton] = useState(0);

    function setCellValue(rowIndex: number, cellIndex: number, value: number) {
        const temp = [...gridState];
        temp[rowIndex][cellIndex] = value;
        setGridState(temp);
    }

    function handleOnMouseDown(event: MouseEvent) {
        event.preventDefault();
        setIsMouseDown(true);
        setMouseButton(event.button);
    }
    
    return (
        <div className="grid"
            onMouseDown={handleOnMouseDown}
            onMouseUp={() => setIsMouseDown(false)}
            onMouseLeave={() => setIsMouseDown(false)}
            onContextMenu={(e) => e.preventDefault()}
        >
            {gridState.map((row, rowIndex) => 
                <div className="row" key={rowIndex}>
                    {row.map((cellValue, cellIndex) =>
                        <Cell
                            cellValue={cellValue}
                            setCellValue={(value) => setCellValue(rowIndex, cellIndex, value)}
                            isMouseDown={isMouseDown}
                            mouseButton={mouseButton}
                            key={cellIndex}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

export default Grid;