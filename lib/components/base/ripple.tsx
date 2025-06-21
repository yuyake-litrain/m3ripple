import clsx from 'clsx';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import styles from './ripple.module.css';
import SparklesCanvas from './sparkles_canvas';

const Ripple = memo(
  ({
    ripple_width,
    offsetX,
    offsetY,
    isMaterial3 = true,
    rippleColor = '#ffffff35',
    rippleTime = 500,
    time,
    tobeDeleted = false,
    // waiting time for ripple animation
    waitingTime = 290,
    deleteRipple,
    sparklesColorRGB = '255 255 255',
    opacity_level1 = '0.2',
    opacity_level2 = '0.1',
    sparklesMaxCount = 2048,
  }: {
    ripple_width: number;
    offsetX: number;
    offsetY: number;
    isMaterial3?: boolean;
    rippleColor?: string;
    rippleTime?: number;
    waitingTime?: number;
    time: number;
    tobeDeleted: boolean;
    sparklesColorRGB?: string;
    opacity_level1?: string;
    opacity_level2?: string;
    sparklesMaxCount?: number;
    deleteRipple: (createdTime: number) => void;
  }) => {
    const ref = useRef<HTMLSpanElement | null>(null);
    const anim = useRef<Animation | undefined>(null);
    const inDeletionProgress = useRef<boolean>(false);
    const [isAnimStarted, setIsAnimStarted] = useState<boolean>(false);

    const deletion = useCallback(async () => {
      if (ref.current && anim.current) {
        // wait for animation finish / threshold
        if ((anim.current.currentTime as number) < waitingTime) {
          const remainTimeNow =
            rippleTime - (anim.current.currentTime as number);
          const waitTimeMS = remainTimeNow - waitingTime;
          await new Promise((resolve) => {
            setTimeout(resolve, waitTimeMS);
          });
        } else {
          await anim.current.finished;
        }

        if (!ref.current) {
          return;
        }
        // fade-out animation
        await ref.current.animate(
          {
            opacity: [1, 0],
          },
          {
            fill: 'forwards',
            duration: isMaterial3 ? 200 : 200,
            easing: isMaterial3
              ? 'cubic-bezier(0.11, 0, 0.5, 0)'
              : 'cubic-bezier(0.11, 0, 0.5, 0)',
          },
        ).finished;
      }
      // parent setRipples process here
      deleteRipple(time);
    }, [deleteRipple, isMaterial3, rippleTime, time, waitingTime]);

    useEffect(() => {
      if (!tobeDeleted) {
        anim.current = ref.current?.animate(
          {
            width: isMaterial3
              ? [`${ripple_width / 6}px`, `${ripple_width}px`]
              : [`${ripple_width / 3}px`, `${ripple_width}px`],
            height: isMaterial3
              ? [`${ripple_width / 6}px`, `${ripple_width}px`]
              : [`${ripple_width / 3}px`, `${ripple_width}px`],
            background: isMaterial3
              ? [
                  `radial-gradient(circle closest-side, ${rippleColor} 0%, transparent)`,
                  `radial-gradient(circle closest-side, ${rippleColor} 80%, transparent)`,
                ]
              : [rippleColor, rippleColor],
          },
          {
            fill: 'forwards',
            duration: isMaterial3 ? 400 : rippleTime,
            easing: isMaterial3
              ? 'cubic-bezier(0,0.49,0,1)'
              : 'cubic-bezier(0.1, 0.8, 1, 0.80)',
          },
        );

        const setOnStarted = async () => {
          await anim.current?.ready;
          setIsAnimStarted(true);
        };
        setOnStarted();
      }
    }, [isMaterial3, rippleTime, rippleColor, ripple_width, tobeDeleted]);

    useEffect(() => {
      if (tobeDeleted) {
        if (!inDeletionProgress.current) {
          inDeletionProgress.current = true;
          deletion();
        }
      }
    }, [tobeDeleted, deletion]);

    return (
      <span
        className={clsx('ripple', styles.ripple)}
        style={{
          width: ripple_width,
          height: ripple_width,
          left: offsetX,
          top: offsetY,
        }}
        ref={ref}
      >
        {isMaterial3 && isAnimStarted && (
          <SparklesCanvas
            ripple_width={ripple_width}
            rippleRef={ref}
            sparklesColorRGB={sparklesColorRGB}
            opacity_level1={opacity_level1}
            opacity_level2={opacity_level2}
            sparklesMaxCount={sparklesMaxCount}
          />
        )}
      </span>
    );
  },
);

export default Ripple;
