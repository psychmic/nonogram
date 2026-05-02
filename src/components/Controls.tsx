type ControlsParamsType = {
    newGame: (newWidth: number, newHeight: number) => void,
}

function Controls({newGame}: ControlsParamsType) {
    return (
        <div className="controls">
            <button onClick={() => newGame(5, 5)}>Easy (5 x 5)</button>
            <button onClick={() => newGame(10, 10)}>Medium (10 x 10)</button>
            <button onClick={() => newGame(15, 15)}>Hard (15 x 15)</button>
            <button onClick={() => newGame(20, 20)}>Expert (20 x 20)</button>
        </div>
    );
}

export default Controls;