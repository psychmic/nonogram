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

const generateEmptyBoard = (width: number, height: number) => Array.from({length: height}, () => Array.from({length: width}, () => 0));

function Nonogram({initWidth, initHeight}: NonogramParamsType) {
    const [answerNonogram, setAnswerNonogram] = useState(() => createNonogram(initWidth, initHeight));
    const [gridState, setGridState] = useState(() => generateEmptyBoard(initWidth, initHeight));
    
    const [highlightedRow, setHighlightedRow] = useState<number | null>(null);
    const [highlightedColumn, setHighlightedColumn] = useState<number | null>(null);

    const [mistakeCount, setMistakeCount] = useState(0);
    
    function setCellValue(rowIndex: number, cellIndex: number, value: number) {
    if (JSON.stringify(gridState) === JSON.stringify(answerNonogram.grid) || mistakeCount >= 3) return;
    if (answerNonogram.grid[rowIndex][cellIndex] !== value) setMistakeCount(() => mistakeCount + 1);

    function updateGrid(prevGrid: number[][]) {
        const newGrid = prevGrid.map((row, rIdx) => 
            rIdx === rowIndex 
                ? row.map((cell, cIdx) => (cIdx === cellIndex ? answerNonogram.grid[rowIndex][cellIndex] : cell)) 
                : row
        );

        // auto complete rows
        const answerRow = answerNonogram.grid[rowIndex];
        let rowIsFinished = true;
        for (let i = 0; i < answerRow.length; i++) {
            if (answerRow[i] === 1 && newGrid[rowIndex][i] !== 1) {
                rowIsFinished = false;
                break;
            }
        }
        if (rowIsFinished) newGrid[rowIndex] = [...answerNonogram.grid[rowIndex]]; 

        // auto complete columns
        let colIsFinished = true;
        for (let i = 0; i < answerNonogram.grid.length; i++) {
            if (answerNonogram.grid[i][cellIndex] === 1 && newGrid[i][cellIndex] !== 1) {
                colIsFinished = false;
                break;
            }
        }
        if (colIsFinished) {
            for (let i = 0; i < answerNonogram.grid.length; i++) {
                if (newGrid[i] === prevGrid[i]) {
                    newGrid[i] = [...prevGrid[i]];
                }
                newGrid[i][cellIndex] = answerNonogram.grid[i][cellIndex];
            }
        }

        return newGrid;
    }

        setGridState(prevGrid => updateGrid(prevGrid));
    }

    function newGame(newWidth: number, newHeight: number) {
        setMistakeCount(0);
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
                <ColomnHints hints={answerNonogram.colHints} highlightedColumn={highlightedColumn}/>
                <RowHints hints={answerNonogram.rowHints} highlightedRow={highlightedRow}/>
                <Grid 
                    gridState={gridState} 
                    setCellValue={setCellValue} 
                    updateHighlightedRow={(value: number | null) => setHighlightedRow(() => value)} 
                    updateHighlightedColumn={(value: number | null) => setHighlightedColumn(() => value)}
                />
            </div>
            {(JSON.stringify(gridState) === JSON.stringify(answerNonogram.grid) || mistakeCount >= 3) && <Controls newGame={newGame}/>}
        </>
    );
}

export default Nonogram;