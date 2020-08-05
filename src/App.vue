<template>
  <div id="app">
    <header>
        <div class="container full grid">
            <div class="logo">
                <span>Sidermit</span>
            </div>
            <div class="menu">
                <router-link :to="{name: 'Dashboard'}" class="btn">Dashboard</router-link>
                <router-link :to="{name: 'MyCities'}" class="btn">My Cities</router-link>
            </div>
        </div>
    </header>
    <div class="container full main">
      <Breadcrumbs></Breadcrumbs>
      <router-view/>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
@import "./assets/css/base.css";
@import "./assets/css/style.css";
</style>