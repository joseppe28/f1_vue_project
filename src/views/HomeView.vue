<template>
  <main class="home">
    <div class="home-intro">
      <p class="eyebrow">Das digitale Rennarchiv</p>
      <h1>Die Saison<br><span>beginnt hier.</span></h1>
      <p class="home-copy">Entdecke Fahrer, Teams und Rennen aus der Geschichte der Formel 1.</p>
    </div>

    <div class="home-grid">
      <router-link to="/SaisonData" class="season-box season-wide">
        <small>01 / ARCHIV</small>
        <strong>Saisons</strong>
        <span>Alle Rennen nach Jahr</span>
        <b>↗</b>
      </router-link>
      <router-link to="/FahrerData" class="season-box">
        <small>02 / GRID</small>
        <strong>Fahrer</strong>
        <span>Die Namen hinter dem Lenkrad</span>
        <b>↗</b>
      </router-link>
      <router-link to="/TeamData" class="season-box">
        <small>03 / PADDOCK</small>
        <strong>Teams</strong>
        <span>Die Konstrukteure der Formel 1</span>
        <b>↗</b>
      </router-link>
      <router-link to="/Quiz" class="season-box quiz-box">
        <small>04 / CHALLENGE</small>
        <strong>F1 Quiz</strong>
        <span>Teste dein Rennsportwissen</span>
        <b>↗</b>
      </router-link>
    </div>
  </main>
</template>

<style scoped>
.home {
  width: min(100% - 48px, 1080px);
  margin: 0 auto;
  padding: clamp(56px, 10vw, 120px) 0 80px;
}

.home::after {
  position: fixed;
  right: 7vw;
  bottom: -100px;
  width: 240px;
  height: 240px;
  border: 1px solid #d5d4ce;
  border-radius: 50%;
  content: '';
}

.eyebrow,
.season-box small {
  color: #e53935;
  font-size: 0.72rem;
  font-weight: bold;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.eyebrow {
  margin: 0 0 16px;
}

h1 {
  margin: 0;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(3rem, 8vw, 6.8rem);
  letter-spacing: 0;
  line-height: 0.94;
}

h1 span {
  color: #e53935;
}

.home-copy {
  max-width: 420px;
  margin: 24px 0 56px;
  color: #68717b;
  font-size: 1.05rem;
  line-height: 1.6;
}

.home-grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.season-box {
  position: relative;
  display: flex;
  min-height: 190px;
  flex-direction: column;
  gap: 10px;
  padding: 28px;
  border: 1px solid #d7d6d1;
  background: #fff;
  color: #17202d;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.25s, box-shadow 0.25s, background 0.25s;
}

.season-box:hover {
  box-shadow: 8px 8px 0 #17202d;
  transform: translate(-3px, -3px);
}

.season-box small {
  color: #8a929a;
}

.season-box strong {
  margin-top: auto;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 2rem;
  font-weight: normal;
}

.season-box span {
  color: #68717b;
  font-size: 0.9rem;
}

.season-box b {
  position: absolute;
  top: 26px;
  right: 26px;
  color: #e53935;
  font-size: 1.5rem;
}

.season-wide {
  background: #17202d;
  color: #fff;
}

.season-wide span {
  color: #aeb8c4;
}

.quiz-box {
  background: #ffdf57;
}

.quiz-box small,
.quiz-box b {
  color: #a52e2b;
}

@media (max-width: 620px) {
  .home {
    width: min(100% - 28px, 1080px);
  }

  .home-grid {
    grid-template-columns: 1fr;
  }
}
</style>
