const production = process.env.NODE_ENV === "production";

function bableOptions(){
  return  {  
    plugins: production ? ["transform-remove-console"] : [],
  }
}

module.exports = {
  mount: {
    public: "/",
    src: "/_dist_",
  },
  plugins: [
    [
      "@snowpack/plugin-svelte",
      {
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
      },
    ],
    [
      "@snowpack/plugin-babel",
      {
        // 기본으로는 svelte 파일에는 적용이 안되어 babel preprocess 를 추가해야 함
        transformOptions: bableOptions(),
      },
    ],
    "@snowpack/plugin-dotenv",
  ],
};
