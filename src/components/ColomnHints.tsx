

type ColomnHintsParamsType = {
    hints: number[][],
}

function ColomnHints({ hints }: ColomnHintsParamsType) {

    
    return (
        <div className="col-hints">
            {hints.map((col, colIndex) => 
                <div className="hint-group" key={colIndex}>
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