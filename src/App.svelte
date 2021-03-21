<script>
  import Router from "svelte-spa-router"
  import routes from "~/routes"  // index.js 생략 가능
  import Header from "~/components/Header.svelte"
  import Footer from "~/components/Footer.svelte"
</script>

<Header />
<Router {routes} />
<Footer />
