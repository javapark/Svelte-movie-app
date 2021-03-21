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