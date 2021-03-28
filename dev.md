# 프로젝트 개요

## 1. 예제 소개

- Svelte.js
- Snowpack
- Svelte SPA Router
- OMDb API
- Netlify
  - Hosting with GitHub(CD)
  - Functions(Serverless)

### 목표

- 템플릿을 사용하지 않고, Snowpack 으로 SVelte 프로젝트를 구성할 수 있다.
- SPA(Single Page Application)을 위한 Router(Svelte SPA Router)를 구성해 페이지 단위로 개발할 수 있다.
- OMDb API를 활용해 실제 영화 정보ㅡㄹ 검색하고 출력할 수 있다.
- API Key 가 노출되지 않도록 Netlify Functions(서버리스 함수)를 사용해 백엔드를 구성하고, 로컬에서 테스트할 수 있다.
- GitHub 저장소에 Push(업로드)하고 Netlify Hosting 으로 CD(지속적인 배포)를 적용할 수 있다.

## 2. SPA란?

- Traditional Web Application : 데이터를 요청할 때마다 페이지 로드
- SPA : 페이지 로드 없이 데이터 요청

### SPA 장점

- 빠르고 자연스런 전환으로 훌률한 사용자 경험 제공
- 더 적제 요청해 빠르게 렌더링 가능
- 컴포넌트 단위 개발로 생산성 향상
- 쉬운 분업화

### SPA 단점

- 느린 최초 로드 => Lazy loading, 브라우저 캐싱
- 어려운 검색 엔진 최적화(SEO) => SSR, Serverless Functions
- 모든 데이터 노출 => 비즈니스 로직 최소화

## 3. 프로젝트 구조의 이해

- OMDb API key 노출을 방지하기 위해 Netlify(서버리스 함수)를 이용한다.

# Snowpack 으로 프로젝트 구성

## 1. Snowpack 기반으로 시작하기

```
$ npm init -y
$ npm i -D svelte snowpack @snowpack/plugin-svelte
```

- snowpack.config.js 생성 후 내용 추가

```
module.exports = {
  mount: {
    public: "/",
    src: "/_dist_",
  },
  plugins: [
    "@snowpack/plugin-svelte"
  ]
};
```

- public, src 디렉토리 생성 후 `snowpack.config.js` 에 등록
- src/main.js , src/App.svelte 생성

```js
// main.js
import App from "./App.svelte";

const app = new App({
  target: document.body,
});

export default app;
```

- public/index.js

```js public/index.js
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Svelte movie app</title>
  </head>
  <body>
    <script type="module" src="/_dist_/main.js"></script>
  </body>
</html>
```

- packgage.json script 추가

```js
  "scripts": {
    "dev": "snowpack dev",
    "build": "snowpack build"
  },
```

- 실행 ( http://localhost:8080/ )

```
$ npm run dev
```

## 2. Assets 가져오기

- 이미지 파일을 가져와서 public/assets 에 포함

```html
<link rel="icon" href="/favicon.png" />
```

## 3. SCSS와 Autoprefixer 구성

- 모듈에 대한 연결
- `@snowpack/plugin-svelte` 전처리 추가

```js snowpack.config.js
    plugins: [
      ["@snowpack/plugin-svelte", {
        preprocess: require('svelte-preprocess')({
          scss: {
            prependData : '@import "./src/scss/main.scss"';
          },
          postcss: {
            plugins: [
              require('autoprefixer')()
            ]
          }
        })
      }]
    ]
```

- autoprefixer 사용 시 아래의 내용 반드시 추가

```js package.json
"browserslist": [
    "> 1%",
    "last 2 versions"
  ],
```

- 모듈 설치

```
$ npm i -D autoprefixer postcss @snowpack/plugin-sass
```

- 설치 확인

```scss src/scss/main.css
h1 {
  color: red;
  display: flex;
}
```

```svelte src/App.svelte
<style lang="scss"></style>
```

## 4. Babel 로 제품 모드 콘솔 제거

- 개발 시 사용했던 console.log 제거하는 방법
- 모듈설치

```sh
$ npm i -D @snowpack/plugin-babel babel-plugin-transform-remove-console
```

- snowpack.config.js 에 내용 추가

```js
  [
    "@snowpack/plugin-babel",
    {
      // 기본으로는 svelte 파일에는 적용이 안되어 babel preprocess 를 추가해야 함
      transformOptions:{
        plugins : ["transform-remove-console"],
      }
    },
  ],
```
- 제품/개발 모드에 따라 적용될 수 있게 구분
```
$ npm i -D @snowpack/plugin-dotenv
```

```js snowpack.config.js
const production = process.env.NODE_ENV === "production";
...
function bableOptions() {
  return {
    plugins: production ? ["transform-remove-console"] : [],
  };
}
...
  [
    "@snowpack/plugin-babel",
    {
      transformOptions:bableOptions()
    },
  ],
  "@snowpack/plugin-dotenv",
```
- `주의` .svelte 에 작성된 내용은 위의 내용이 적용 안됨
  - preprocess 에 babel 을 추가해야 함
```js
  babel: bableOptions()
```

## 5. 경로 별칭 및 빌드 최적화 구성
- 경로 별칭 : 프로젝트가 복잡해져도 파일 관리가 편해진다
```js snowpack.config.js
    alias: {
      "~": "./src",
    },
```
- 빌드 최적화
```
$ npm i -D @snowpack/plugin-optimize
```

## 6. Svelte & Snowpack Template
```
$ npx degit ParkYoungWoong/svelte-snowpack-template test-template
```

# 예제를 시작하기 전에!!

## 강의 예제 모듈 버전 일치시키기
- package-lock.json, package.json

# 영화 검색 프로젝트 기본 구조 작성

## 1. SPA 라우터 설치 및 구성
- svelte-spa-router 
```
$ npm i -D svelte-spa-router
```

## 2. SPA 라우츠 링크와 하이라이팅(active)
```svelte
import active from 'svelte-spa-router/active'
<a use:link
   use:active={'/about'}
   href="/about"
>About</a>
```

## 3. 구글 폰트 적용 및 브라우저 스타일 초기화
- 전체 스타일 지정
```html index.html
    <style>
      body {
        background-color: #0e111b;
        color: #fff;
        line-height: 1.4;
        font-family: "Roboto", sans-serif;
      }
    </style>
```
- fonts.google.com 에서 Roboto, Oswald
  - Roboto : Regular 400, Bold 700
  - Oswald : Medium 500 
```css
<link rel="preconnect" href="https://fonts.gstatic.com" />
<link
  href="https://fonts.googleapis.com/css2?family=Oswald:wght@500&family=Roboto:wght@400;700&display=swap"
  rel="stylesheet"
/>
```
- reset.css cdn : 브라우저마다 기본적으로 제공하는 요소의 스타일을 없애준다. 즉, 브라우저간의 차이를 최대한 없애는 코드를 만들기 위함
```css
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reset-css@5.0.1/reset.min.css">
```

## 4. 로고 컴포넌트 작성
- `src/components/Logo.svelte`

## 5. 전역 메뉴 작성 및 라우츠 파라미터

routes 에서 설정한 변수(id)를 props 를 이용하여 받아와서 이용할 수 있다

```js
// src/routes/index.js
export default {
  "/": Home,
  "/movie/:id": Movie,
  "/about": About,
};
```

```svelte
<!-- src/routes/Movie.svelte -->
<script>
    export let params = {}
</script>

<h1>Movie!</h1>
<h2>{params.id}</h2>
```

## 6. 경로 와일드 카드

메뉴 활성화 시 Movie 메뉴의 경우 id 값이 지정된 값이 아닐경우 active 가 되지 않는 것을 확인할 수 있다. 이때 와일드카드를 이용하여 active 상태를 바꿀 수 있다.

```svelte
// src/components/Header.svelte
  const menus = [
    { href: "/", name: "Search" },
    { href: "/movie/tt4520988", name: "Movie" },
    { href: "/about", name: "About" },
  ];
```

## 7. 스타일 전역화

```scss
/* src/scss/main.scss */
$color--black: #0e111B;
$color--black-90:rgba($color--black, .9);
$color--black-50:rgba($color--black, .5);

$color--white: #fff;
$color--white-60: rgba($color--white, .6);
$color--white-50: rgba($color--white, .5;
$color--white-30: rgba($color--white, .3;
$color--white-10: rgba($color--white, .1);
$color--white-5: rgba($color--white, .05);


$color--primary: #fdc000;
$color--area: #1c212E;
```

```scss
/* src/components/Logo.svelte */
a {
  display: block;
  font-family: "Oswald", sans-serif;
  font-size: 30px;
  color: $color--white-50;
  text-decoration: none;
  span {
    color: $color--primary;
  }
}
```

## 8. Header 컴포넌트 작성

css 우선순위 ( id: 100, class : 10, tag : 1)

```scss
<style lang="scss">
    header{
        padding: 20px 40px;
        background-color: $color--black-90;
        position: sticky;
        top: 0;
        z-index: 9;
        display: flex;
        align-items: flex-end;
        nav {
            margin-left: 40px;
            ul {
                display: flex;
                li{
                    margin-left:10px;
                    &:first-child{
                        margin-left:0;
                    }
                    a{
                        font-size: 14px;
                        font-weight: 700;
                        color: $color--white-50;
                        text-decoration: none;
                    }
                }
            }
        }
        .user{
            width: 40px;
            height: 40px;
            padding: 6px;
            box-sizing: border-box;
            border-radius: 50%;
            background-color: $color--area;
            cursor: pointer;
            position: absolute;
            top:0;
            bottom:0;
            right:40px;
            margin:auto;
            transition: .4s;
            &:hover{
                background-color: lighten($color--area, 20%);
            }
            img{
                width:100%;
            }
        }

    }
  header :global(a.active) {
    color: $color--primary !important;
  }
</style>
```

## 9. VS Code SCSS 스타일 에러 해결
vs code 에서 발생하는 스타일 에러를 해결하기 위함
```svelte
// Header.svelte : line32
    background-color: $color--black-90;
```
snowpack.config.js 의 `@snowpack/plugin-svelte` 의 옵션값을 별도의 파일(svelte.config.js) 로 지정하여 오류를 없애려고 시도해 본다. 아직도 남아 있을 것인데 이때 vscode 를 재시작한다. 그러면 없어진 것을 확인할 수 있다.

## 10. Footer 컴포넌트 작성

Footer 컴포넌트 작성 후 App.svelte에 추가

```svelte
<!-- src/components/Footer.svelte -->
<footer>
    <a href="https://github.com/javapark/Svelte-movie-app">GitHub Repo</a>
    <a href="">
        @{new Date().getFullYear()}
        Javapark</a>
</footer>

<style lang="scss">
    footer{
        padding: 70px;
        text-align: center;
        a {
            color: $color--white-10;
            text-decoration: none;
            &:hover{
                text-decoration: underline;
            }
        }
    }
</style>
```

## 11. Headline 컴포넌트 작성

Home 에 Headline 컴포넌트(`src/components/Headline.svelte`) 추가

## 12. Search 컴포넌트 이해

기존 소스에 대한 설명으로 대체

## 13. Search 컴포넌트 작성

- Search components 작성
- fr 단위는 fraction 의 약어로 '공간비율'을 의미한다

# OMDb API 그리고 SPA Router

## 1. OMDbAPI.COM 개요

## 2. 영화 검색 및 추가 검색 구현

- https 적용
- API key 적용
- async, await 적용

## 3. 영화 목록에서 ID 중복 제거

```
_.unionBy([{'x':1}])
```

## 4. 목록으로 출력될 영화 카드 만들기

## 5. 이미지 렌더링 전 로딩 애니메이션 추가

- SpinKit(https://tobiasahlin.com/spinkit/)
- 이미지 로딩 체크

```
    const img = document.createElement('img')
    img.src = movie.Poster
    img.addEventListener('load', ()=>{
      imageLoading = false
    })
```

## 6. 영화 목록 로딩 애니메이션 추가
- store 에 loading 변수 등록 ( store get, set 이용 )
- svelte 에서 $를 이용하여 로더(Loader) 표시 여부 결정

## 7. 스켈레톤 UI

- 데이터 가져와서 보여질 영역을 미리 보여주는 방법

## 8. 영화 상세 정보 요청

- OMDb API 에서 사용법을 확인한다 ( 목록과 파라미터가 상이함 )

## 9. 영화 상세 정보 페이지 스타일링
- 상세 페이지 스타일링

## 10. 더 높은 해상도의 영화 포스터 가져오기
- 이미지 해상도를 높이고 그에 따른 로딩이미지 추가

## 11. 응답 에러 출력과 movie.js 리팩토링

## 12. About 페이지 작성과 Query String 분석

- querystring 설치

```sh
$ npm i -D qs
```

- 레이블 문법

```
$: query = qs.parse($querystring)
```

- active 관련 정규 표현식 지원

```

```

## 13. Router Push 와 URL Encoding

## 14. 404 Page Not Found

## 15. 검색 정보 초기화 및 누락된 코드 수정
상세보기에서 뒤로가기 했을때 초기화하는 방법

## 16. 페이지 전환 효과(Fade)
svelte-spa-router 의 advanced usage 를 보면 Route transition ( fade 기능)을 이용할 수 있다
- `단, ` 컴포넌트에는 in:fade 를 붙일 수 없다
```svelte App.svelte
<script>
  import { fade } from "svelte/transition"
  import Router from "svelte-spa-router"
  import routes from "~/routes"  // index.js 생략 가능
  import Header from "~/components/Header.svelte"
  import Footer from "~/components/Footer.svelte"
</script>

<Header />
<div in:fade>
  <Router {routes} />
</div>
<Footer />
```
- 최초 랜더링 시 적용 되지만 이후 페이지 바뀔 시 페이지 전환 효과가 발생하지 않는다 ( location 스토어 객체를 이용할 수 있다)
```svelte App.svelte
<script>
  import { fade } from "svelte/transition";
  import Router, { location } from "svelte-spa-router";
  import routes from "~/routes"; // index.js 생략 가능
  import Header from "~/components/Header.svelte";
  import Footer from "~/components/Footer.svelte";
</script>

<Header />
{#key $location}
  <div in:fade>
    <Router {routes} />
  </div>
{/key}
<Footer />

```

## 17. 페이지 전환 스크롤 위치 복구

## 18. 반응형 스타일 일괄 적용

# GitHub 그리고 Netlify

## 1. .gitignore 생성하고 GitHub 에 푸쉬

https://gitignore.io

## 2. Netlify 배포(CD)

## 3. Netlify Serverless Functions

- netlify.toml 배포 후 테스트 가능
- 그럼 로컬에서는 어떻게 할까?

## 4. Netlify-CLI

## 5. 영화 정보 반환 API 만들기

## 6. 로컬 및 서버의 환경 변수 구성

## 7. 배포 및 테스트

## 8. 추후 관리를 위한 개발 서버 포트 수정
