import { useState } from "react";
import type { MouseEvent } from "react";
import Cell from "./Cell";

type GridParamsType = {
    gridState: number[][],
    setCellValue: (rowIndex: number, cellIndex: number, value: number) => void,
}

function Grid({ gridState, setCellValue }: GridParamsType) {
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [mouseButton, setMouseButton] = useState(0);

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