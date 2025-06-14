// compression level of sparkles（バラけ具合）

class Sparkle {
  xpos: number;
  ypos: number;
  width: number;
  height: number;

  constructor(xpos: number, ypos: number, width: number, height: number) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.width = width;
    this.height = height;
  }
}

export class Sparkles {
  sparkles: Sparkle[];
  color: string;

  constructor(sparkles: Sparkle[], color: string) {
    this.sparkles = sparkles;
    this.color = color;
  }
}
type SparklesColor = {
  // base color
  rgb: string;
  // opacity before hide
  opacity_level1: string;
  opacity_level2: string;
};

function calcSparklePositionsWithDegAndWidth(
  deg: number,
  // Divergence level of the sparkle (should be set from the width of the current ripple)
  divergence: number,
  // Sparkle compression level (set freely)
  compLevel: number,
  SparkleRadius: number,
) {
  const radian = deg * (Math.PI / 180);
  // cosは単位円におけるx座標を表す。
  // cw（リップルの半径）が大きいほど、バラけてほしい -> Math.randomでの乱数にcwを掛ける
  // convLevel（圧縮レベル）が大きいほど、まとまってほしい -> Math.randomでの乱数に掛けられたcwを割る
  // 引いているのは、正の値（円の外側）にしかバラけないから、円の内側にもバラけさせるため。
  const xpos =
    Math.cos(radian) * SparkleRadius +
    (Math.floor(Math.random() * (divergence / compLevel)) -
      Math.floor(Math.random() * (divergence / compLevel)));
  const ypos =
    Math.sin(radian) * SparkleRadius +
    (Math.floor(Math.random() * (divergence / compLevel)) -
      Math.floor(Math.random() * (divergence / compLevel)));
  return { xpos: xpos, ypos: ypos };
}

function calcSparkleColorWithWidth(
  now: number,
  max: number,
  sparklesColor: SparklesColor,
) {
  const random_ratio = 0.3;
  const max_opacity = 0.6;
  // リップルの最大の大きさに対して現状の大きさがどの程度なのかで透明度変更。
  // リップルの広がりまくって最大の大きさに近づいたら薄くなる。
  return `rgb(${sparklesColor.rgb} / ${Math.abs(
    (Math.random() - Math.random()) * random_ratio +
      (1 - now / max) -
      (1 - max_opacity),
  ).toFixed(2)})`;
}

export function drawSparkles(
  sparkle_collection: Sparkles[],
  context: CanvasRenderingContext2D,
  ripple: HTMLSpanElement,
  ripple_width: number,
  sparklesColor: SparklesColor = {
    rgb: '255 255 255',
    opacity_level1: '0.2',
    opacity_level2: '0.1',
  },
  // no zero
  convLevel = 6,
  spaklesMaxCount = 2048,
) {
  const nowRippleRadius = ripple.clientWidth / 2;
  const radius = ripple.clientWidth / 2.6;

  context.clearRect(0, 0, ripple_width, ripple_width);

  if (nowRippleRadius === 0 || convLevel === 0) {
    return;
  }

  const sparkles: Sparkle[] = [];

  let sparkleCount = ripple.clientWidth;
  if (sparkleCount > spaklesMaxCount) {
    sparkleCount = spaklesMaxCount;
  }

  // リップルの発生源を中心とした半径一定（radius）な円上の点は、角度が定まれば一つに定まる
  const sparkleDegs = [];

  // sparklesの数だけ角度（度数法）を乱数生成（0〜360）
  for (let i = 0; i < sparkleCount; i++) {
    sparkleDegs.push(Math.floor(Math.random() * 360));
  }

  for (const deg of sparkleDegs) {
    const pos = calcSparklePositionsWithDegAndWidth(
      deg,
      nowRippleRadius,
      convLevel,
      radius,
    );
    sparkles.push(new Sparkle(pos.xpos, pos.ypos, 1, 1));
  }

  const color = calcSparkleColorWithWidth(
    nowRippleRadius,
    ripple_width,
    sparklesColor,
  );

  sparkle_collection.push(new Sparkles(sparkles, color));

  // 同心円状に存在する時間により半径の異なる、現在描画中のSparkleの集合が複数ある
  // これが5個を超えた場合（Sparkleの数で言うと最大sparkleCount * 5個のSparkle）
  if (sparkle_collection.length > 5) {
    // 小さい半径のSparkleの集まりを一つ消す（これにより5つに維持される）
    sparkle_collection.splice(0, 1);
    // 消える直前のSparkleは薄くする
    sparkle_collection[0].color = `rgb(${sparklesColor.rgb} / ${sparklesColor.opacity_level1})`;
    sparkle_collection[1].color = `rgb(${sparklesColor.rgb} / ${sparklesColor.opacity_level2})`;
  }

  for (const sparkles of sparkle_collection) {
    context.fillStyle = sparkles.color;
    for (const sparkle of sparkles.sparkles) {
      context.fillRect(
        ripple_width / 2 + sparkle.xpos,
        ripple_width / 2 + sparkle.ypos,
        sparkle.width,
        sparkle.height,
      );
    }
  }

  window.requestAnimationFrame(() =>
    drawSparkles(sparkle_collection, context, ripple, ripple_width),
  );
}
