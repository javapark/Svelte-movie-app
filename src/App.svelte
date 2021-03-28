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
