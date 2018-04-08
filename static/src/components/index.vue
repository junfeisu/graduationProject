<template>
  <div class="container">
    <div class="latest-movies">
      <div class="module-title">热门电影</div>
      <div class="movie-list">
        <movie-card :movie-info="movieInfo"></movie-card>
        <movie-card :movie-info="movieInfo"></movie-card>
        <movie-card :movie-info="movieInfo"></movie-card>
        <movie-card :movie-info="movieInfo"></movie-card>
        <movie-card :movie-info="movieInfo"></movie-card>
      </div>
    </div>
    <div class="latest-movies">
      <div class="module-title">即将上映</div>
      <div class="movie-list">
        <movie-card :movie-info="movieInfo"></movie-card>
        <movie-card :movie-info="movieInfo"></movie-card>
        <movie-card :movie-info="movieInfo"></movie-card>
        <movie-card :movie-info="movieInfo"></movie-card>
        <movie-card :movie-info="movieInfo"></movie-card>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        movieInfo: {
          name: '起跑线',
          duration: '120分钟',
          type: '犯罪 / 剧情',
          desc: '矿工宋洋与煤老板姜武以命相搏'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
    .module-title {
      height: 30px;
      line-height: 30px;
      font-size: 18px;
      font-weight: bold;
      text-align: left;
      padding-left: 20px;
      border-left: 5px solid #ff6d00;
      margin-bottom: 20px;
    }
    .movie-list {
      display: flex;
      algin-items: center;
      justify-content: space-around;
    }
    .movie-card {
      width: 160px;
      height: 224px;
      background: #0081bc;
      position: relative;
      .movie-poster {
        width: 160px;
        height: 224px;
      }
      .movie-info {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 999;
        height: 224px;
        background: rgba(0, 0, 0, .5);
        color: #ffffff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        display: none;
      }
      &:hover > .movie-info {
        display: flex;
      }
    }
  }
</style>