<script>
    // querystring 은 스토어 객체
    import { querystring} from 'svelte-spa-router'
    import qs from 'qs'

    console.log($querystring)
    console.log(qs.parse($querystring))

    // 레이블 문법으로 반응성을 가진다
    $: query = qs.parse($querystring)
    $: name = query.name || 'Javapark'
    $: email = query.email || 'javaparknet@gmail.com'
    $: image = query.image || 'https://avatars.githubusercontent.com/u/288315'
    $: blog = query.blog || 'http://javapark.github.io'
    $: phone = query.phone || '+82-10-1234-5678'
</script>

<div class="user-profile">
  <div class="photos">
    <div class="photo">
      <img src="/assets/svelte.png" alt="User" />
    </div>
    <div class="photo">
      <img src="https://avatars.githubusercontent.com/u/288315" alt="User" />
    </div>
  </div>
  <div class="details">
    <div class="name">{name}</div>
    <div class="email">{email}</div>
    <div class="blog">{blog}</div>
    <div class="phone">{phone}</div>
  </div>
</div>

<style lang="scss">
  .user-profile {
    padding: 80px 0;
    .photos {
      display: flex;    // 가로사이즈가 찌그러질 수 있다
      justify-content: center; // 수평정렬
      .photo {
        flex-shrink:0;  // 아이템 줄어드는 비율 조절
        width: 230px;
        height: 230px;
        padding: 30px;
        box-sizing: border-box;
        background-color: $color--area;
        border-radius: 50%;
        border: 12px solid $color--black;
        &:first-child{
            margin-right:-80px;
        }
        img {
          width: 100%;
        }
      }
    }
    .details{
        margin-top:20px;
        text-align:center;
        .name{
            font-size:40px;
            font-family: 'Oswald', sans-serif;
            margin-bottom: 20px;

        }
    }
  }
</style>
