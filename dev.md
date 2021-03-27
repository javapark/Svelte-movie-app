## 전역 메뉴 작성 및 라우츠 파라미터
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

## 경로 와일드 카드
메뉴 활성화 시 Movie 메뉴의 경우 id 값이 지정된 값이 아닐경우 active 가 되지 않는 것을 확인할 수 있다. 이때 와일드카드를 이용하여 active 상태를 바꿀 수 있다. 
```svelte
// src/components/Header.svelte
  const menus = [
    { href: "/", name: "Search" },
    { href: "/movie/tt4520988", name: "Movie" },
    { href: "/about", name: "About" },
  ];
```

## 스타일 전역화

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
    span{
        color: $color--primary;
    }
  }
```

## Header 컴포넌트 작성
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

## VS Code SCSS 스타일 에러 해결
vs code 에서 에러로 보임. 실제 빌드 결과에는 영향이 없음, 그래도 이를 해결하기 위한 방법을 찾아보자
```svelte
// Header.svelte : line32
    background-color: $color--black-90;
```
snowpack.config.js 의 `@snowpack/plugin-svelte` 의 옵션값을 별도의 파일(svelte.config.js) 로 지정하여 오류를 없애려고 시도해 본다. 아직도 남아 있을 것인데 이때 vscode 를 재시작한다. 그러면 없어진 것을 확인할 수 있다.

## Footer 컴포넌트 작성
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

## Headline 컴포넌트 작성
Home 에 Headline 컴포넌트(`src/components/Headline.svelte`) 추가 

## Search 컴포넌트 이해
기존 소스에 대한 설명으로 대체

## Search 컴포넌트 작성
- Search components 작성
- fr 단위는 fraction 의 약어로 '공간비율'을 의미한다



## 영화검색 및 추가 검색구현
- https 적용
- API key 적용
- async, await 적용

## ID 중복
```
_.unionBy([{'x':1}])
```

## 404 Not Found

## Query string
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


## .gitignore 생성하고 GitHub 푸쉬
https://gitignore.io

## Netlify 배포

## Netlify Serverless Functions
- netlify.toml 배포 후 테스트 가능
- 그럼 로컬에서는 어떻게 할까?

## Netlify CLI