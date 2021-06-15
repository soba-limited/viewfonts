<template>
  <!--<div id="nav">
    <router-link to="/">Home</router-link>
  </div>-->
  <header>
    <div class="h_flex">
      <h1>VeiwFonts</h1>
      <section class="toggle_button">
        <button class="toggle">
          <div class="bar"></div>
          <div class="bar"></div>
        </button>
      </section>
    </div>
  </header>

  <router-view></router-view>

  <footer>
    <p class="copy">&copy; ai-web-font-view.</p>
  </footer>
</template>

<style>
@import "./assets/css/style/ress.min.css";
@import "./assets/css/style/common.min.css";
</style>
