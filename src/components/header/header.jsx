import styles from "./header.module.css";
import {
  AiOutlineSearch,
  AiFillQuestionCircle,
  AiFillSetting,
} from "react-icons/ai";
import { FaUser } from "react-icons/fa";

export const Header = () => {
  return (
    <header className={styles.appHeader}>
      <p>APP</p>
      <span className={styles.searchContainer}>
        <input type="text" />
        <AiOutlineSearch className={styles.searchIcon} />
      </span>
      <span>
        <button className={styles.iconButton}>
          <AiFillQuestionCircle />
        </button>
        <button className={styles.iconButton}>
          <AiFillSetting />
        </button>
        <button className={styles.iconButton}>
          <FaUser />
        </button>
      </span>
    </header>
  );
};
