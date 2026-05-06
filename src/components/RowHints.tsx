
type RowHintsParamsType = {
    hints: number[][],
    highlightedRow: number | null,
}

function RowHints({ hints, highlightedRow }: RowHintsParamsType) {

    return (
        <div className="row-hints">
            {hints.map((row, rowIndex) => 
                <div className={`hint-group ${rowIndex === highlightedRow && "highlight"}`} key={rowIndex}>
                    {row.map((hint, hintIndex) => 
                        <span className="hint" key={hintIndex}>
                            {hint}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}

export default RowHints;