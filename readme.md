## 새로운 프로젝트 생성 (package.json)
$ npm init -y

## Install svelte package 
$ npm install -D svelte snowpack @snowpack/plugin-svelte

## 소스 작성
- Snowpack 설정
- Hello Svelte 

## script 작성 (package.json)
```
  "scripts": {
    "dev":"snowpack dev",
    "build":"snowpack build"
  },
```

## 개발서버 실행
```
$ npm run dev
```

## Github 소스 관리
```
git init
git add readme.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/javapark/Svelte-movie-app.git
git push -u origin main
```

### .gitignore 설정
```
touch .gitignore

node_modules
```

## 패키지 설치
$ npm i -D autoprefixer postcss node-sass @snowpack/plugin-sass
$ npm i -D @snowpack/plugin-babel babel-plugin-transform-remove-console
$ npm i -D @snowpack/plugin-dotenv

## Packages
- snowpack : 프로젝트를 빌드하기 위한 핵심 패키지이다.
- svelte : Svelte API를 사용하기 위한 핵심 패키지이다.
- @snowpack/plugin-svelte : Snowpack 에서 Svelte 를 해석할 수 있다. svelte-preprocess 가 같이 설치된다
- autoprefixer: CSS 에 자동으로 공급 업체 접두사(vendor prefix)를 적용한다
- postcss: CSS 후처리 패키지로 autoprefixer 를 사용하기 위해 설치한다
- @snowpack/plugin-babel : 
- [babel-plugin-transform-remove-console](https://babeljs.io/docs/en/babel-plugin-transform-remove-console) : 배포할 제품에서는 불필요한 콘솔 명령을 제거한다
- @snowpack/plugin-dotenv
- @snowpack/plugin-optimize : 결과를 압축하고 번들링하는 등 최종 결과를 최적화한다

## Ref
- [Svelte.js SPA 영화 검색 프로젝트](https://www.inflearn.com/course/%EC%8A%A4%EB%B2%A8%ED%8A%B8-%EC%8B%A4%EC%8A%B5-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8/)