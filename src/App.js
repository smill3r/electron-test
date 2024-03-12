import logo from "./logo.svg";
import styles from "./App.module.css";
import { Header } from "./components/header/header";
import { TabBar } from "./components/tabBar/tabBar";
import { useState } from "react";

function App() {
  const [content, setContent] = useState("Screening Tab Content");
  return (
    <>
      <Header></Header>
      <TabBar onSetActive={setContent}></TabBar>
      <div className={styles.mainContent}>
        <p>{content}</p>
      </div>
    </>
  );
}

export default App;
