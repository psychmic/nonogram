import { useState } from "react";
import type { MouseEvent } from "react";
import Cell from "./Cell";

type GridParamsType = {
    height: number,
    width: number,
}

function Grid({ height, width }: GridParamsType) {
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [mouseButton, setMouseButton] = useState(0);

    const grid = new Array(height).fill(new Array(width).fill(0)) as number[][];

    function handleOnMouseDown(event: MouseEvent) {
        event.preventDefault();
        setIsMouseDown(true);
        setMouseButton(event.button);
    }

    function handleOnMouseUp(event: MouseEvent) {
        event.preventDefault();
        setIsMouseDown(false);
    }
    
    return (
        <div className="grid"
            onMouseDown={handleOnMouseDown}
            onMouseUp={handleOnMouseUp}
            onContextMenu={e => e.preventDefault()}
        >
            {grid.map((row, rowIndex) => 
                <div className="row" key={`row${rowIndex}`}>
                    {row.map((cell, cellIndex) =>
                        <Cell 
                            mouseButton={mouseButton}
                            isMouseDown={isMouseDown}
                            key={`cell${rowIndex}${cellIndex}`}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

export default Grid;