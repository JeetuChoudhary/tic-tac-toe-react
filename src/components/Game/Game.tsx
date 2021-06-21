import { useCallback, useEffect, useState } from "react";

import Board from "../Board/Board";

const winningCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let won = true;

const Game: React.FC = () => {
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [gameActive, setGameActive] = useState(true);
  const [gameStatus, setGameStatus] = useState("");
  const [gameState, setGameState] = useState<string[]>(Array(9).fill(""));

  const handleCellClick = (index: number) => {
    if (gameState[index] !== "" || !gameActive) {
      return;
    }
    const temp = [...gameState];
    temp[index] = currentPlayer;
    setGameState(temp);

    // Change/update player in state
    setCurrentPlayer((prevState) => (prevState === "X" ? "O" : "X"));
  };

  const handleComputerTurn = useCallback(() => {
    const emptyCells: number[] = [];
    gameState.forEach((gs, index) => {
      if (gs === "") {
        emptyCells.push(index);
      }
    });
    if (currentPlayer === "O" && emptyCells.length && gameActive && won) {
      const temp = [...gameState];
      temp[emptyCells[Math.floor(Math.random() * emptyCells.length)]] =
        currentPlayer;

      setTimeout(() => {
        setGameState(temp);
      }, 1000);
      setCurrentPlayer((prevState) => (prevState === "X" ? "O" : "X"));
    }
  }, [gameState, gameActive, currentPlayer]);

  const handleRestartGame = () => {
    setGameActive(true);
    won = true;
    setGameState(Array(9).fill(""));
    setCurrentPlayer("X");
    setGameStatus(currentPlayerTurn());
  };

  const winningMessage = useCallback((user) => `Player ${user} has Won`, []);
  const drawMessage = () => `Game Ended in Draw`;
  const currentPlayerTurn = useCallback(
    () => `${currentPlayer}'s Turn`,
    [currentPlayer]
  );

  const handleResultValidation = useCallback(() => {
    let roundWon = false;
    let wonUser = "";

    for (let wc of winningCondition) {
      const a = gameState[wc[0]];
      const b = gameState[wc[1]];
      const c = gameState[wc[2]];

      if (a === "" || b === "" || c === "") {
        continue;
      }
      if (a === b && a === c) {
        roundWon = true;
        wonUser = a;
        break;
      }
    }

    if (roundWon) {
      setGameStatus(winningMessage(wonUser));
      won = false;
      setGameActive(false);
      return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
      setGameStatus(drawMessage());
      setGameActive(false);
      return;
    }
  }, [gameState, winningMessage]);

  useEffect(() => {
    setGameStatus(currentPlayerTurn());
    handleResultValidation();
    handleComputerTurn();
  }, [currentPlayerTurn, handleResultValidation, handleComputerTurn]);

  return (
    <Board
      gameState={gameState}
      gameStatus={gameStatus}
      cellClick={handleCellClick}
      restartGame={handleRestartGame}
    />
  );
};
export default Game;
