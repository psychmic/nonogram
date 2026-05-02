import { useState } from "react";
import ColomnHints from "./ColomnHints";
import RowHints from "./RowHints";
import Grid from "./Grid";
import { createNonogram } from "../lib/generate";

type NonogramParamsType = {
    width: number,
    height: number,
}

function Nonogram({width, height}: NonogramParamsType) {
    const generateEmptyBoard = () => Array.from({length: height}, () => Array.from({length: width}, () => 0));
    
    const [answerNonogram, setAnswerNonogram] = useState(() => createNonogram(width, height));
    const [gridState, setGridState] = useState(() => generateEmptyBoard());

    function setCellValue(rowIndex: number, cellIndex: number, value: number) {
        setGridState(prevGrid => 
            prevGrid.map((row, rIdx) => 
                rIdx === rowIndex 
                    ? row.map((cell, cIdx) => (cIdx === cellIndex ? value : cell)) 
                    : row
            )
        );
    }

    function clearBoard() {
        setGridState(generateEmptyBoard());
    }

    function check() {
        if (JSON.stringify(gridState) === JSON.stringify(answerNonogram.grid)) {
            console.log("Correct!");
        } else {
            console.log("Wrong");
        }
    }

    function newGame() {
        clearBoard();
        setAnswerNonogram(createNonogram(width, height));
        console.log("Generated new game!");
    }

    return (
        <>
            <div className="nonogram">
                <ColomnHints hints={answerNonogram.colHints} />
                <RowHints hints={answerNonogram.rowHints} />
                <Grid gridState={gridState} setCellValue={setCellValue} />
            </div>
            <button className="clear-button button" onClick={clearBoard}>Clear</button>
            <button className="check-button button" onClick={check}>Check</button>
            <button className="new-button button" onClick={newGame}>New Game</button>
        </>
    );
}

export default Nonogram;