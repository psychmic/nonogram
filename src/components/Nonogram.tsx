import { useState } from "react";
import ColomnHints from "./ColomnHints";
import RowHints from "./RowHints";
import Grid from "./Grid";
import { createNonogram } from "../lib/generate";
import Controls from "./Controls";

type NonogramParamsType = {
    initWidth: number,
    initHeight: number,
}

function Nonogram({initWidth, initHeight}: NonogramParamsType) {
    const [mistakeCount, setMistakeCount] = useState(0);

    const [width, setWidth] = useState(initWidth);
    const [height, setHeight] = useState(initHeight);

    const generateEmptyBoard = (w = width, h = height) => Array.from({length: h}, () => Array.from({length: w}, () => 0));
    
    const [answerNonogram, setAnswerNonogram] = useState(() => createNonogram(width, height));
    const [gridState, setGridState] = useState(() => generateEmptyBoard());

    function setCellValue(rowIndex: number, cellIndex: number, value: number) {
        if (JSON.stringify(gridState) === JSON.stringify(answerNonogram.grid)) return;
        if (answerNonogram.grid[rowIndex][cellIndex] === value) {
            setGridState(prevGrid => 
                prevGrid.map((row, rIdx) => 
                    rIdx === rowIndex 
                        ? row.map((cell, cIdx) => (cIdx === cellIndex ? value : cell)) 
                        : row
                )
            );
        } else {
            setMistakeCount(() => mistakeCount + 1);
        }
    }

    function newGame(newWidth: number, newHeight: number) {
        setWidth(newWidth);
        setHeight(newHeight);
        setAnswerNonogram(createNonogram(newWidth, newHeight));
        setGridState(generateEmptyBoard(newWidth, newHeight));
    }

    return (
        <>
            <div className="nonogram">
                <ColomnHints hints={answerNonogram.colHints} />
                <RowHints hints={answerNonogram.rowHints} />
                <Grid gridState={gridState} setCellValue={setCellValue} />
            </div>
            {(JSON.stringify(gridState) === JSON.stringify(answerNonogram.grid)) && <Controls newGame={newGame}/>}
        </>
    );
}

export default Nonogram;