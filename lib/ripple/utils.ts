export function calcRippleWidth(
  // event: React.MouseEvent | React.TouchEvent,
  offsetX: number | null,
  offsetY: number | null,
  clientWidth: number | null,
  clientHeight: number | null,
) {
  if (!offsetX || !offsetY || !clientWidth || !clientHeight) return;
  // position offset from each edges
  const offsetFromLeft = offsetX;
  // const offsetFromRight = target?.clientWidth - offsetX;
  const offsetFromRight = clientWidth - offsetX;
  const offsetFromTop = offsetY;
  // const offsetFromButtom = target?.clientHeight - offsetY;
  const offsetFromButtom = clientHeight - offsetY;

  // larger horizontal/vertical offset
  let largerOffsetHorizontal: number;
  let largerOffsetVertical: number;

  if (offsetFromLeft >= offsetFromRight) {
    largerOffsetHorizontal = offsetFromLeft;
  } else {
    largerOffsetHorizontal = offsetFromRight;
  }

  if (offsetFromTop >= offsetFromButtom) {
    largerOffsetVertical = offsetFromTop;
  } else {
    largerOffsetVertical = offsetFromButtom;
  }

  // largest offset from 4 corners to the clicked point
  const largerOffsetFromCorner = Math.sqrt(
    largerOffsetHorizontal ** 2 + largerOffsetVertical ** 2,
  );

  // return ripple width (2x)
  return largerOffsetFromCorner * 2;
}

export const offsetXFromCurrent = (rect: DOMRect, clientX: number) => {
  // Offset based on the element itself to which the Ripple Effect is applied
  // (If you use event.offsetX, it will be based on the child element.)
  // currentTarget: The element to which the listener of the event is registered.
  return clientX - rect.left;
};

export const offsetYFromCurrent = (rect: DOMRect, clientY: number) => {
  // Offset based on the element itself to which the Ripple Effect is applied
  // (If you use event.offsetX, it will be based on the child element.)
  // currentTarget: The element to which the listener of the event is registered.
  return clientY - rect.top;
};

export const rippleElemWidthOriginal = (
  rect: DOMRect,
  clientX: number,
  clientY: number,
  clientWidth: number,
  clientHeight: number,
) =>
  calcRippleWidth(
    offsetXFromCurrent(rect, clientX),
    offsetYFromCurrent(rect, clientY),
    clientWidth,
    clientHeight,
  );
