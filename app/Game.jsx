const React = require('react');
const Board = require('./Board');
const helper = require('./helpers')

function Game(props) {

  const [history, setHistory] = React.useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = React.useState(0);
  const [xIsNext, setXisNext] = React.useState(null);
  
  const handleClick = (i) => {
    const historyCopy = history.slice(0, stepNumber + 1); // stepNumber could be smaller than history.length due to jump
    const current = historyCopy[stepNumber];
    const squares = current.slice();
    if (helper.calculateWinner(squares) || squares[i]) {
       return;
    }
    squares[i] = xIsNext ? "X" : "O";
    setHistory(historyCopy.concat([squares]));
    setStepNumber(stepNumber + 1);
    setXisNext(!xIsNext);
  }
  
  const jumpTo = (step) => {
    setStepNumber(step);
    setXisNext((step % 2) === 0);
  }
  
  const renderMoves = () => {
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    let current = history[stepNumber];
    const winner = helper.calculateWinner(current);
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (xIsNext ? "X" : "O");
    }
    
    return(
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    );
  }
  

  return (
    <div className="centered">
      <h2>Below is a tic tac toe demo</h2>
      <div className="game">
        <div className="game-board">
          <Board
            squares={history[stepNumber]}
            onClick={i => handleClick(i)}
          />
        </div>
          {renderMoves()}
      </div>
    </div>
    );
}

module.exports = Game;