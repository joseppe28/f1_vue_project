<template>
  <nav class="app-nav">
    <router-link to="/" class="brand-mark">
      <span class="brand-flag" aria-hidden="true"></span>
      <span>F1 ARCHIVE</span>
    </router-link>
    <div class="nav-links">
      <router-link to="/SaisonData">Saisons</router-link>
      <router-link to="/FahrerData">Fahrer</router-link>
      <router-link to="/TeamData">Teams</router-link>
      <router-link to="/Quiz" class="nav-quiz">Quiz</router-link>
    </div>
  </nav>
  <router-view />
</template>

<style>
* {
  box-sizing: border-box;
}

html,
body {
  min-width: 320px;
  margin: 0;
  background: #f4f3ef;
}

#app {
  min-height: 100vh;
  font-family: 'Trebuchet MS', Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #17202d;
}

.app-nav {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  min-height: 72px;
  padding: 0 clamp(20px, 5vw, 64px);
  background: #17202d;
  color: #fff;
}

.brand-mark,
.nav-links a {
  color: inherit;
  text-decoration: none;
}

.brand-mark {
  display: flex;
  align-items: center;
  gap: 11px;
  font-size: 0.78rem;
  font-weight: bold;
  letter-spacing: 0.12em;
}

.brand-flag {
  width: 18px;
  height: 18px;
  background: conic-gradient(#fff 25%, #e53935 0 50%, #fff 0 75%, #e53935 0);
  background-size: 9px 9px;
  transform: rotate(45deg);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: clamp(14px, 3vw, 30px);
  color: #aeb8c4;
  font-size: 0.78rem;
  font-weight: bold;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.nav-links a {
  transition: color 0.2s;
}

.nav-links a:hover,
.nav-links a.router-link-exact-active {
  color: #ffdf57;
}

.nav-links .nav-quiz {
  padding: 9px 14px;
  background: #e53935;
  color: #fff;
}

@media (max-width: 600px) {
  .app-nav {
    min-height: 64px;
  }

  .nav-links {
    gap: 10px;
    font-size: 0.68rem;
  }

  .nav-links a:nth-child(1),
  .nav-links a:nth-child(3) {
    display: none;
  }
}
</style>
