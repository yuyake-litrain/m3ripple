import clsx from 'clsx';
import { memo, type RefObject, useEffect, useRef } from 'react';
import { drawSparkles, type Sparkles } from '../../ripple/sparkles';
import styles from './sparkles_canvas.module.css';

const SparklesCanvas = memo(
  ({
    ripple_width,
    rippleRef,
    sparklesColorRGB = '255 255 255',
    opacity_level1 = '0.2',
    opacity_level2 = '0.1',
    sparklesMaxCount = 2048,
  }: {
    ripple_width: number;
    rippleRef: RefObject<HTMLSpanElement | null>;
    sparklesColorRGB?: string;
    sparklesMaxCount?: number;
    opacity_level1?: string;
    opacity_level2?: string;
  }) => {
    const animIdRef = useRef<number>(null);
    const ref = useRef<HTMLCanvasElement>(null);
    const animRunningRef = useRef<boolean>(true);

    useEffect(() => {
      const pixelRatio = window.devicePixelRatio;

      if (ref.current) {
        ref.current.width = Math.floor(ripple_width * pixelRatio);
        ref.current.height = Math.floor(ripple_width * pixelRatio);
      }

      const context = ref.current?.getContext('2d');

      if (!context) {
        return;
      }

      const sparkles_collection: Sparkles[] = [];
      context.scale(pixelRatio, pixelRatio);

      animIdRef.current = requestAnimationFrame(() => {
        if (rippleRef.current) {
          drawSparkles(
            sparkles_collection,
            context,
            rippleRef.current,
            ripple_width,
            animIdRef,
            animRunningRef,
            {
              rgb: sparklesColorRGB,
              opacity_level1: opacity_level1,
              opacity_level2: opacity_level2,
            },
            6,
            sparklesMaxCount,
          );
        }
      });

      ref.current?.animate(
        {
          opacity: [1, 0],
        },
        {
          fill: 'forwards',
          duration: 600,
        },
      );

      return () => {
        if (animIdRef.current) {
          animRunningRef.current = false;
          cancelAnimationFrame(animIdRef.current);
        }
      };
    }, [
      ripple_width,
      rippleRef,
      sparklesColorRGB,
      sparklesMaxCount,
      opacity_level1,
      opacity_level2,
    ]);

    return (
      <canvas
        ref={ref}
        style={{
          width: `${ripple_width}px`,
          height: `${ripple_width}px`,
        }}
        className={clsx('sparkles_canvas', styles.sparkles_canvas)}
      />
    );
  },
);

export default SparklesCanvas;
