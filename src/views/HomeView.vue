<template>
  <div class="home">
    <h1>Formel 1 Daten</h1>

    <router-link to="/SaisonData" class="season-box">
      <span>Saisons</span>
    </router-link>
    <div class="season-box">
      <span>Fahrer</span>
    </div>
    <div class="season-box">
      <span>Teams</span>
    </div>
  </div>
</template>

<style scoped>
.season-box {
  display: inline-table;
  flex-direction:column;
  gap: 4px;
  padding: 30px 30px;
  border: 2px solid #42b983;
  border-radius: 15px;
  background: #f0faf5;
  margin: 10px;
  color: inherit;
  text-decoration: none;
  cursor: pointer;
}

.season-box span {
  color: #666;
  font-size: 1.3rem;
}
</style>
