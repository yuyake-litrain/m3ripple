import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Network from './components/wifi_selector/network';
import styles from './index.module.css';
import 'unfonts.css';
import 'sparkle-ripple/css';

const container = document.getElementById('root');

if (container) {
  createRoot(container).render(
    <StrictMode>
      <div className={styles.container}>
        <div className={styles.desc}>
          <h1>Connect to Wi-Fi</h1>
          <p>To get apps or copy data, connect to a network</p>
        </div>
        <Network name="Home-network" />
        <Network name="Another one" />
      </div>
    </StrictMode>,
  );
}
