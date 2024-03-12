import { useEffect, useRef, useState } from "react";
import styles from "./tabBar.module.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

export const TabBar = ({ onSetActive }) => {
  useEffect(() => {
    window.electronAPI.onActiveTabSet((event, params) => {
      const tabInfo = params[0];
      setActiveTab(tabInfo.tab);
      onSetActive(tabInfo.tabName);
    });
  }, []);
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    "Screening",
    "Research",
    "Optimization Cases",
    "Holdings",
    "Models",
    "Position Rolling",
    "Monthly Rebalancing",
    "Orders",
    "Targets",
    "Profits",
    "Excedent",
    "Records",
    "Files",
  ];

  const ref = useRef(null);

  const openContextMenu = (index, tab) => {
    window.electronAPI.showContextMenu();

    window.electronAPI.onContextSelected((event, command) => {
      switch (command) {
        case "new":
          window.electronAPI.new([
            { tab: index, tabName: `${tab} Tab Content` },
          ]);
          break;
        case "minimize":
          window.electronAPI.minimize();
          break;
        case "maximize":
          window.electronAPI.maximize();
          break;
        case "close":
          window.electronAPI.close();
          break;
        default:
          break;
      }
    });
  };

  const scroll = (offSet) => {
    ref.current.scrollLeft += offSet;
  };

  return (
    <ul className={styles.bar} ref={ref}>
      {tabs.map((tab, index) => (
        <li>
          <button
            className={styles.tab}
            onClick={() => {
              setActiveTab(index);
              onSetActive(`${tab} Tab Content`);
            }}
            onContextMenu={() => openContextMenu(index, tab)}
            style={{
              backgroundColor: index === activeTab ? "#D0D0D0" : "#E8E8E8",
            }}
          >
            {tab}
          </button>
        </li>
      ))}
      <li className={styles.scrollButtons}>
        <button onClick={() => scroll(-100)}>
          <FaAngleLeft />
        </button>
        <button onClick={() => scroll(100)}>
          <FaAngleRight />
        </button>
      </li>
    </ul>
  );
};
