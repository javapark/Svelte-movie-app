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