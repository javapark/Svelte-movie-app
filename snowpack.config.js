const production = process.env.NODE_ENV === "production";

function bableOptions() {
  return {
    plugins: production ? ["transform-remove-console"] : [],
  };
}

module.exports = {
  mount: {
    public: "/",
    src: "/_dist_",
  },
  plugins: [
    "@snowpack/plugin-svelte",
    [
      "@snowpack/plugin-babel",
      {
        // 기본으로는 svelte 파일에는 적용이 안되어 babel preprocess 를 추가해야 함
        transformOptions: bableOptions(),
      },
    ],
    "@snowpack/plugin-dotenv",
    "@snowpack/plugin-optimize",
  ],
  alias: {
    "~": "./src",
  },
};
