import { useState } from "react";
import type { MouseEvent } from "react";
import Cell from "./Cell";

type GridParamsType = {
    gridState: number[][],
    setCellValue: (rowIndex: number, cellIndex: number, value: number) => void,
    updateHighlightedRow: (value: number | null) => void,
    updateHighlightedColumn: (value: number | null) => void,
}

function Grid({ gridState, setCellValue, updateHighlightedRow, updateHighlightedColumn }: GridParamsType) {
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [mouseButton, setMouseButton] = useState(0);

    function handleOnMouseDown(event: MouseEvent) {
        event.preventDefault();
        setIsMouseDown(true);
        setMouseButton(event.button);
    }

    function cellStyles(rowIndex: number, cellIndex: number) {
        const gridHeight = gridState.length;
        const gridWidth = gridState[0].length;

        const styles = {
            borderTop: "",
            borderLeft: "",
            borderBottom: "",
            borderRight: "",
        };

        const borderStyle = "4px solid #3f4b7a";

        if (rowIndex === 0 || rowIndex % 5 === 0) styles.borderTop = borderStyle;
        if (cellIndex === 0 || cellIndex % 5 === 0) styles.borderLeft = borderStyle;
        if (rowIndex === gridHeight - 1) styles.borderBottom = borderStyle;
        if (cellIndex === gridWidth - 1) styles.borderRight = borderStyle;

        return styles;
    }
    
    return (
        <div className="grid"
            onMouseDown={handleOnMouseDown}
            onMouseUp={() => setIsMouseDown(false)}
            onMouseLeave={() => {
                setIsMouseDown(false)
                updateHighlightedRow(null)
                updateHighlightedColumn(null)
            }}
            onContextMenu={(e) => e.preventDefault()}
        >
            {gridState.map((row, rowIndex) => 
                <div className="row"
                    onMouseEnter={() => updateHighlightedRow(rowIndex)} 
                    key={rowIndex}
                >
                    {row.map((cellValue, cellIndex) =>
                        <Cell
                            cellValue={cellValue}
                            setCellValue={(value) => setCellValue(rowIndex, cellIndex, value)}
                            isMouseDown={isMouseDown}
                            mouseButton={mouseButton}
                            cellStyles={cellStyles(rowIndex, cellIndex)}
                            updateHighlightedColumn={() => updateHighlightedColumn(cellIndex)}
                            key={cellIndex}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

export default Grid;