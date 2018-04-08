<template>
  <div class="movie-card">
    <img src="../assets/image/poster.jpg" height="140" width="100" alt="" class="movie-poster">
    <div class="movie-info">
      <span class="movie-name">{{movieInfo.name}}</span>
      <div class="movie-detail">
        <span class="movie-duration">{{movieInfo.duration}} - </span>
        <span class="movie-type">{{movieInfo.type}}</span>
      </div>
      <span class="movie-desc">{{movieInfo.desc}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'movieCard',
    data () {
      return {}
    },
    props: {
      movieInfo: {
        type: Object
      }
    }
  }
</script>

<style lang="scss">
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
</style>