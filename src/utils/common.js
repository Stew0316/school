import * as echarts from "echarts";
export function chunkBySix(arr, count = 6) {
  const result = [];
  for (let i = 0; i < arr.length; i += count) {
    // 从 i 开始，截取最多 6 个元素
    result.push(arr.slice(i, i + count)); // slice 不会修改原数组 :contentReference[oaicite:0]{index=0}
  }
  return result;
}
export const COLORS = ["#1067B3", "#133780", "#10184D"];
export function pickColor(name) {
  // 简单哈希：把字符串的 charCode 累加，然后 mod 三色数
  let h = 0;
  for (let i = 0; i < name.length; i++) {
    h += name.charCodeAt(i);
  }
  return COLORS[h % COLORS.length];
}

export const gradientColor = new echarts.graphic.LinearGradient(
  0,
  0,
  0,
  1, // (x1,y1)=(0,0) 顶部；(x2,y2)=(0,1) 底部 :contentReference[oaicite:1]{index=1}
  [
    { offset: 0, color: "#FFD03B" }, // 0% 处颜色
    { offset: 1, color: "#FFD03B00" }, // 100% 处颜色
  ],
  false
);
export const gradientColor1 = new echarts.graphic.LinearGradient(
  0,
  0,
  0,
  1, // (x1,y1)=(0,0) 顶部；(x2,y2)=(0,1) 底部 :contentReference[oaicite:1]{index=1}
  [
    { offset: 1, color: "#0FFFF2" }, // 0% 处颜色
    { offset: 0, color: "#0FFFF200" }, // 100% 处颜色
  ],
  false
);
/**
 * 将数字格式化为以“W”为单位，保留一位小数
 * @param {number} num - 需要格式化的数字
 * @returns {string} 格式化后的字符串
 */
export function formatNumber(num, unit = "W") {
  if (typeof num !== "number" || isNaN(num)) {
    throw new TypeError("参数必须是有效的数字");
  }

  // 如果大于等于 10000，则除以 10000 并保留一位小数，最后拼接 "W"
  if (num >= 10000) {
    const w = (num / 10000).toFixed(1); // 使用 toFixed(1) 保留一位小数 :contentReference[oaicite:0]{index=0}
    return `${w}${unit}`; // 使用模板字符串拼接 :contentReference[oaicite:1]{index=1}
  }

  // 小于 10000 时，直接返回原数字字符串
  return num.toString();
}
