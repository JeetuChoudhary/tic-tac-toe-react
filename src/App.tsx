import styles from "./App.module.css";
import Game from "./components/Game/Game";

function App() {
  return (
    <div className={styles.container}>
      <Game />
    </div>
  );
}

export default App;
