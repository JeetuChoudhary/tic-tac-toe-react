import styles from "./Box.module.css";

type Props = {
  value: string;
  boxIndex: number;
  cellClick: (index: number) => void;
};

const Box: React.FC<Props> = ({ value, cellClick, boxIndex }) => {
  return (
    <button className={styles.Box} onClick={() => cellClick(boxIndex)}>
      {value}
    </button>
  );
};
export default Box;
