import Box from "../Box/Box";
import styles from "./Board.module.css";

type Props = {
  gameState: string[];
  cellClick: (index: number) => void;
  gameStatus: string;
  restartGame: () => void;
};

const Board: React.FC<Props> = ({
  gameState,
  cellClick,
  gameStatus,
  restartGame,
}) => {
  return (
    <div className={styles.Container}>
      <div className={styles.Board}>
        {gameState.map((gs, index) => {
          return (
            <Box
              key={index}
              cellClick={cellClick}
              value={gs}
              boxIndex={index}
            />
          );
        })}
      </div>
      <h1 className={styles.GameStatus}>{gameStatus}</h1>
      <button className={styles.RestartBtn} onClick={restartGame}>
        Restart Game
      </button>
    </div>
  );
};
export default Board;
