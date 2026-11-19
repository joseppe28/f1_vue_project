<template>
  <main class="team-data">
    <p class="eyebrow">03 / Paddock</p>
    <h1>Team <span>Daten</span></h1>
    <section class="empty-state">
      <span class="empty-number">03</span>
      <div>
        <h2>Das Fahrerlager wartet.</h2>
        <p>Die Teamdaten werden als Nächstes ergänzt. Bis dahin kannst du im Saisonarchiv die Rennen und Konstrukteure entdecken.</p>
        <router-link to="/SaisonData">Zum Saisonarchiv <span>→</span></router-link>
      </div>
    </section>
  </main>
</template>

<style scoped>
.team-data {
  width: min(100% - 48px, 980px);
  margin: 0 auto;
  padding: 60px 0 80px;
}

.eyebrow {
  margin: 0 0 12px;
  color: #e53935;
  font-size: 0.75rem;
  font-weight: bold;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

h1 {
  margin: 0 0 44px;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(2.8rem, 7vw, 5rem);
  font-weight: normal;
}

h1 span {
  color: #e53935;
}

.empty-state {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 30px;
  padding: 40px;
  background: #17202d;
  color: #fff;
}

.empty-number {
  color: #ffdf57;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 4rem;
  line-height: 1;
}

h2 {
  margin: 0 0 12px;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 2rem;
  font-weight: normal;
}

.empty-state p {
  max-width: 520px;
  margin: 0 0 24px;
  color: #aeb8c4;
  line-height: 1.6;
}

.empty-state a {
  color: #ffdf57;
  font-weight: bold;
  text-decoration: none;
}

.empty-state a span {
  margin-left: 10px;
}

@media (max-width: 600px) {
  .team-data {
    width: min(100% - 28px, 980px);
    padding-top: 40px;
  }

  .empty-state {
    grid-template-columns: 1fr;
    gap: 18px;
    padding: 28px;
  }
}
</style>
