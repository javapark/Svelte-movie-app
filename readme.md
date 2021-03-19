## 새로운 프로젝트 생성 (package.json)
$ npm init -y

## Install svelte package 
$ npm install -D svelte snowpack @snowpack/plugin-svelte

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

## Ref
- [Svelte.js SPA 영화 검색 프로젝트](https://www.inflearn.com/course/%EC%8A%A4%EB%B2%A8%ED%8A%B8-%EC%8B%A4%EC%8A%B5-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8/)