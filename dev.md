# 프로젝트 개요
## 1. 예제 소개

## 2. SPA란?

## 3. 프로젝트 구조의 이해

# Snowpack 으로 프로젝트 구성
## 1. Snowpack 기반으로 시작하기

## 2. Assets 가져오기

## 3. SCSS와 Autoprefixer 구성

## 4. Babel 로 제품 모드 콘솔 제거

## 5. 경로 별칭 및 빌드 최적화 구성

## 6. Svelte & Snowpack Template

# 예제를 시작하기 전에!!
## 강의 예제 모듈 버전 일치시키기

# 영화 검색 프로젝트 기본 구조 작성
## 1. SPA 라우터 설치 및 구성
## 2. SPA 라우츠 링크와 하이라이팅(active)
## 3. 구글 폰트 적용 및 브라우저 스타일 초기화
## 4. 로고 컴포넌트 작성
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
    span{
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
vs code 에서 에러로 보임. 실제 빌드 결과에는 영향이 없음, 그래도 이를 해결하기 위한 방법을 찾아보자
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
- 

## 7. 스켈레톤 UI
- 데이터 가져와서 보여질 영역을 미리 보여주는 방법

## 8. 영화 상세 정보 요청
- OMDb API 에서 사용법을 확인한다 ( 목록과 파라미터가 상이함 )

## 9. 영화 상세 정보 페이지 스타일링
## 10. 더 높은 해상도의 영화 포스터 가져오기
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
## 16. 페이지 전환 효과(Fade)
## 17. 페이지 전환 스크롤 위치 복고
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


