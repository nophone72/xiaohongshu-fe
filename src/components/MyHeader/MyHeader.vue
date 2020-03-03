<template>
  <header class="header">
    <img class="logo" src="../../assets/logo.png" alt="logo">
    <nav class="titles">
      <router-link to="/home">精选</router-link>
      <router-link to="/user/5b626cabe8ac2b392e824083">我的</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'my-header',
};
</script>

<style lang="less" scoped>
.header {
  height: 100px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;

  .titles {
    display: flex;
    flex: 1;
    justify-content: center;
    margin-left: calc(100vw - 100%);

    a {
      text-decoration: none;
      font-size: 18px;
      color: rebeccapurple;
      margin: 0 50px;
      position: relative;

      &.router-link-active {
        color: red;

        &::after {
          content: '';
          display: inline-block;
          height: 2px;
          width: 100%;
          background-color: red;
          position: absolute;
          bottom: -15px;
          left: 0;
        }
      }

    }
  }

  .logo {
    width: 110px;
    height: 40px;
    box-sizing: content-box;
    margin:  0 0 0 30px;
  }

}

</style>
