function bableOptions() {
  return {
    plugins: production ? ["transform-remove-console"] : [],
  };
}

module.exports = {
  preprocess: require("svelte-preprocess")({
    scss: {
      // 외부에 있는 scss 에 있는 파일을 한번에 불러온다
      prependData: '@import "./src/scss/main.scss";',
    },
    postcss: {
      plugins: [
        require("autoprefixer")(), // package.json browserslist 옵션 필수
      ],
    },
    // svelte 컴포넌트에서 지움
    babel: bableOptions(),
  }),
};
