<template>
  <div class="home">
    <h1>Formel 1 Saison 2024</h1>

    <p v-if="loading">Daten werden geladen ...</p>
    <p v-else-if="error" class="error">{{ error }}</p>

    <div v-else class="master-detail">
      <section class="race-list">
        <h2>Rennen</h2>
        <button
          v-for="race in races"
          :key="race.raceId"
          class="race-item"
          :class="{ active: selectedRace && selectedRace.raceId === race.raceId }"
          @click="selectedRace = race"
        >
          <span>Runde {{ race.round }}</span>
          <strong>{{ race.raceName }}</strong>
        </button>
      </section>

      <section v-if="selectedRace" class="race-detail">
        <h2>{{ selectedRace.raceName }}</h2>
        <dl>
          <dt>Datum</dt>
          <dd>{{ formatDate(selectedRace.schedule.race.date) }}</dd>

          <dt>Strecke</dt>
          <dd>{{ selectedRace.circuit.circuitName }}</dd>

          <dt>Ort</dt>
          <dd>{{ selectedRace.circuit.city }}, {{ selectedRace.circuit.country }}</dd>

          <dt>Sieger</dt>
          <dd>{{ selectedRace.winner.name }} {{ selectedRace.winner.surname }}</dd>

          <dt>Siegerteam</dt>
          <dd>{{ selectedRace.teamWinner.teamName }}</dd>
        </dl>
      </section>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'HomeView',
  data() {
    return {
      races: [],
      selectedRace: null,
      loading: true,
      error: ''
    }
  },
  async mounted() {
    try {
      const response = await fetch('https://f1api.dev/api/2026')

      if (!response.ok) {
        throw new Error('Die Daten konnten nicht geladen werden.')
      }

      const data = await response.json()
      this.races = data.races
      this.selectedRace = this.races[0]
    } catch (error) {
      this.error = error.message
    } finally {
      this.loading = false
    }
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString('de-DE')
    }
  }
}
</script>

<style scoped>
.home {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  text-align: left;
}

h1 {
  margin-bottom: 24px;
}

.master-detail {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 24px;
  align-items: start;
}

.race-list,
.race-detail {
  border: 1px solid #ddd;
  padding: 16px;
}

.race-list h2,
.race-detail h2 {
  margin-top: 0;
}

.race-item {
  display: block;
  width: 100%;
  margin-bottom: 8px;
  padding: 10px;
  border: 1px solid #ddd;
  background: white;
  text-align: left;
  cursor: pointer;
}

.race-item span,
.race-item strong {
  display: block;
}

.race-item span {
  margin-bottom: 4px;
  color: #666;
  font-size: 0.85rem;
}

.race-item.active {
  border-color: #42b983;
  background: #f0faf5;
}

dl {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 10px;
}

dt {
  font-weight: bold;
}

dd {
  margin: 0;
}

.error {
  color: #b00020;
}

@media (max-width: 700px) {
  .master-detail {
    grid-template-columns: 1fr;
  }
}
</style>
