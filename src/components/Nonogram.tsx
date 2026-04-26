import ColomnHints from "./ColomnHints";
import Grid from "./Grid";
import RowHints from "./RowHints";

function Nonogram() {

    const rowHints = [
        [4, 1, 1],
        [4, 3, 1],
        [1, 6],
        [3, 3, 2],
        [1, 4, 3],
        [1, 1, 1, 2],
        [2, 1, 1, 1],
        [2, 3],
        [2, 4, 1],
        [1, 2, 1, 2],
    ];

    const colHints = [
        [2, 2, 1, 2],
        [4, 4],
        [2, 2, 1, 1],
        [2, 3, 2],
        [3, 1],
        [6, 2],
        [3, 3],
        [3, 2, 1],
        [4, 1, 1],
        [4, 1, 2],
    ];

    return (
        <div className="nonogram">
            <ColomnHints hints={colHints} />
            <RowHints hints={rowHints} />
            <Grid height={10} width={10} />
        </div>
    );
}

export default Nonogram;