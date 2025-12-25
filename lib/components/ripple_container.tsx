import clsx from 'clsx';
import {
  type ComponentPropsWithoutRef,
  type ElementType,
  type MouseEvent,
  type ReactNode,
  type TouchEvent,
  useCallback,
  useRef,
  useState,
} from 'react';
import {
  offsetXFromCurrent,
  offsetYFromCurrent,
  rippleElemWidthOriginal,
} from '../ripple/utils';
import Ripple from './base/ripple';
import styles from './ripple_container.module.css';

export type RippleObj = {
  ripple_width: number;
  offsetY: number;
  offsetX: number;
  time: number;
  isMaterial3: boolean;
  tobeDeleted: boolean;
};

type Props<T extends ElementType = 'div'> = Omit<
  ComponentPropsWithoutRef<T>,
  'as'
> & {
  as?: T;
  isMaterial3?: boolean;
  beforeRippleFn?: (event: React.MouseEvent | React.TouchEvent) => void;
  children?: ReactNode;
  rippleColor?: string;
  sparklesColorRGB?: string;
  opacity_level1?: string;
  opacity_level2?: string;
  sparklesMaxCount?: number;
};

const RippleContainer = <T extends ElementType = 'div'>({
  as,
  isMaterial3 = true,
  beforeRippleFn,
  rippleColor = '#ffffff35',
  sparklesColorRGB = '255 255 255',
  opacity_level1 = '0.2',
  opacity_level2 = '0.1',
  sparklesMaxCount = 2048,
  className,
  children,
  onMouseDown,
  onTouchStart,
  onTouchMove,
  onMouseUp,
  onMouseLeave,
  onTouchEnd,
  onTouchCancel,
  ...rest
}: Props<T>) => {
  const [ripples, setRipples] = useState<RippleObj[]>([]);
  const isScroll = useRef<boolean>(false);
  const disableClieckedRipple = useRef<boolean>(false);

  function handleMouseDown(event: React.MouseEvent) {
    if (disableClieckedRipple.current) {
      return;
    }

    const original = rippleElemWidthOriginal(
      event.currentTarget.getBoundingClientRect(),
      event.clientX,
      event.clientY,
      event.currentTarget.clientWidth,
      event.currentTarget.clientHeight,
    );
    const offsetX = offsetXFromCurrent(
      event.currentTarget.getBoundingClientRect(),
      event.clientX,
    );
    const offsetY = offsetYFromCurrent(
      event.currentTarget.getBoundingClientRect(),
      event.clientY,
    );

    // process before ripple
    if (beforeRippleFn) beforeRippleFn(event);

    ripplePerform(original, offsetX, offsetY);
  }

  function ripplePerform(
    rippleWidthOriginal: number | undefined,
    offsetX: number,
    offsetY: number,
    isTouch = false,
  ) {
    if (disableClieckedRipple.current && !isTouch) {
      return;
    }

    if (!rippleWidthOriginal) {
      return;
    }
    // ripple width looks smaller than real width because of the gradient background
    const ripple_width = rippleWidthOriginal / 0.8;
    // UNIX time
    const time = Date.now();

    setRipples((prev) => {
      return [
        ...prev,
        {
          ripple_width: ripple_width,
          offsetX: offsetX,
          offsetY: offsetY,
          time: time,
          isMaterial3: isMaterial3,
          tobeDeleted: false,
        },
      ];
    });
  }

  async function rippleDeletionReservation(
    event: React.MouseEvent | React.TouchEvent,
  ) {
    if (event.type === 'touchend' || event.type === 'touchcancel') {
      // The ripple effect on the tap starts late, so delay it
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    setRipples((prev) => {
      if (prev.length === 0) return [];

      return prev.map((item) => {
        return { ...item, tobeDeleted: true };
      });
    });

    isScroll.current = false;
  }

  // called from children (ripple)
  const deleteRipple = useCallback((createdTime: number) => {
    setRipples((prev) => {
      return prev.filter((item) => {
        return item.time !== createdTime;
      });
    });
  }, []);

  const handleTouchStart = async (event: React.TouchEvent) => {
    const original = rippleElemWidthOriginal(
      event.currentTarget.getBoundingClientRect(),
      event.changedTouches[0].clientX,
      event.changedTouches[0].clientY,
      event.currentTarget.clientWidth,
      event.currentTarget.clientHeight,
    );

    const offsetX = offsetXFromCurrent(
      event.currentTarget.getBoundingClientRect(),
      event.changedTouches[0].clientX,
    );

    const offsetY = offsetYFromCurrent(
      event.currentTarget.getBoundingClientRect(),
      event.changedTouches[0].clientY,
    );

    disableClieckedRipple.current = true;

    // wait to check if this is a scroll
    await new Promise((resolve) => {
      setTimeout(resolve, 100);
    });

    setTimeout(() => {
      disableClieckedRipple.current = false;
    }, 1000);

    if (!isScroll.current) {
      // process before ripple
      if (beforeRippleFn) beforeRippleFn(event);
      ripplePerform(original, offsetX, offsetY, true);
    }

    isScroll.current = false;
  };

  const cancelRipplePerformTouch = () => {
    isScroll.current = true;
  };

  const Component: ElementType = as ?? 'div';

  return (
    <Component
      {...rest}
      className={clsx(styles.rippleContainer, className ?? '')}
      onMouseDown={(e: MouseEvent) => {
        handleMouseDown(e);
        onMouseDown?.(e);
      }}
      onTouchStart={(e: TouchEvent) => {
        handleTouchStart(e);
        onTouchStart?.(e);
      }}
      onTouchMove={(e: TouchEvent) => {
        cancelRipplePerformTouch();
        onTouchMove?.(e);
      }}
      onTouchEnd={(e: TouchEvent) => {
        rippleDeletionReservation(e);
        onTouchEnd?.(e);
      }}
      onMouseUp={(e: MouseEvent) => {
        rippleDeletionReservation(e);
        onMouseUp?.(e);
      }}
      onMouseLeave={(e: MouseEvent) => {
        rippleDeletionReservation(e);
        onMouseLeave?.(e);
      }}
      onTouchCancel={(e: TouchEvent) => {
        rippleDeletionReservation(e);
        onTouchCancel?.(e);
      }}
    >
      {ripples.map(
        ({
          ripple_width,
          offsetX,
          offsetY,
          isMaterial3,
          time,
          tobeDeleted,
        }) => {
          return (
            <Ripple
              time={time}
              key={time}
              ripple_width={ripple_width}
              offsetX={offsetX}
              offsetY={offsetY}
              isMaterial3={isMaterial3}
              tobeDeleted={tobeDeleted}
              deleteRipple={deleteRipple}
              rippleColor={rippleColor}
              sparklesColorRGB={sparklesColorRGB}
              opacity_level1={opacity_level1}
              opacity_level2={opacity_level2}
              sparklesMaxCount={sparklesMaxCount}
            />
          );
        },
      )}
      {children}
    </Component>
  );
};

export default RippleContainer;
