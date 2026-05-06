
type ColomnHintsParamsType = {
    hints: number[][],
    highlightedColumn: number | null,
}

function ColomnHints({ hints, highlightedColumn }: ColomnHintsParamsType) {
    
    return (
        <div className="col-hints">
            {hints.map((col, colIndex) => 
                <div className={`hint-group ${colIndex === highlightedColumn && "highlight"}`} key={colIndex}>
                    {col.map((hint, hintIndex) => 
                        <span className="hint" key={hintIndex}>
                            {hint}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}

export default ColomnHints;