import { Icon } from '@iconify/react';
import 'm3ripple/css';
import { RippleContainer } from 'm3ripple';
import styles from './network.module.css';

const Network = ({ name }: { name: string }) => {
  return (
    <RippleContainer
      isMaterial3={true}
      className={styles.rippleContainer}
      rippleColor="hsla(29,97%,75%,0.15)"
      sparklesColorRGB="255 255 255"
      opacity_level1="0.4"
      opacity_level2="0.1"
    >
      <Icon
        icon="material-symbols:wifi-lock-rounded"
        className={styles.wifiIcon}
      />
      <div className={styles.network}>{name}</div>
    </RippleContainer>
  );
};

export default Network;
