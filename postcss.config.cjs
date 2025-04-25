module.exports = {
  plugins: {
    "postcss-px-to-viewport": {
      viewportWidth: 1920, // 设计稿宽度
      unitToConvert: "px",
      unitPrecision: 5, // 小数位保留
      propList: ["*"],
      selectorBlackList: [],
      minPixelValue: 1,
      mediaQuery: false,
    },
  },
};
