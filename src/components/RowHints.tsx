
type RowHintsParamsType = {
    hints: number[][],
}

function RowHints({ hints }: RowHintsParamsType) {

    return (
        <div className="row-hints">
            {hints.map((row, rowIndex) => 
                <div className="hint-group" key={rowIndex}>
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