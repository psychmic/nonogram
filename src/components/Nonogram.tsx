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
        if (JSON.stringify(gridState) === JSON.stringify(answerNonogram.grid) || mistakeCount >= 3) return;
        if (answerNonogram.grid[rowIndex][cellIndex] !== value) setMistakeCount(() => mistakeCount + 1);

        setGridState(prevGrid => 
            prevGrid.map((row, rIdx) => 
                rIdx === rowIndex 
                    ? row.map((cell, cIdx) => (cIdx === cellIndex ? answerNonogram.grid[rowIndex][cellIndex] : cell)) 
                    : row
            )
        );
    }

    function newGame(newWidth: number, newHeight: number) {
        setMistakeCount(0);
        setWidth(newWidth);
        setHeight(newHeight);
        setAnswerNonogram(createNonogram(newWidth, newHeight));
        setGridState(generateEmptyBoard(newWidth, newHeight));
    }

    function displayLives() {
        const lives = 3 - mistakeCount;
        switch(lives) {
            case 3:
                return "❤︎❤︎❤︎"
            case 2:
                return "❤︎❤︎♡"
            case 1:
                return "❤︎♡♡"
            default:
                return "♡♡♡"
        }
    }

    return (
        <>
            <div className="nonogram">
                <div className="lives">{displayLives()}</div>
                <ColomnHints hints={answerNonogram.colHints} />
                <RowHints hints={answerNonogram.rowHints} />
                <Grid gridState={gridState} setCellValue={setCellValue} />
            </div>
            {(JSON.stringify(gridState) === JSON.stringify(answerNonogram.grid) || mistakeCount >= 3) && <Controls newGame={newGame}/>}
        </>
    );
}

export default Nonogram;