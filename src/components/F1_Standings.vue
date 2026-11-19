<template>
  <section>
    <h1>{{ teams ? 'Team-Wertung' : 'Fahrer und WM-Wertung' }}</h1>
    <form @submit.prevent="laden">
      <label>Jahr <input v-model.number="year" type="number" min="2023" :max="new Date().getFullYear()" required></label>
      <button>Laden</button>
    </form>
    <p v-if="loading" role="status">Daten werden geladen …</p>
    <p v-else-if="error" role="alert">{{ error }}</p>
    <template v-else-if="data">
      <p v-if="data.standings_session">Letztes gespeichertes Rennergebnis: {{ data.standings_session.meeting_name }} ({{ data.year }})</p>
      <p v-if="!standings.length">Für dieses Rennen ist keine WM-Wertung gespeichert.</p>
      <table v-else>
        <thead><tr><th>Position</th><th>{{ teams ? 'Team' : 'Fahrer' }}</th><th>Punkte</th></tr></thead>
        <tbody><tr v-for="row in standings" :key="row.team_name || row.driver_number">
          <td>{{ row.position_current ?? '–' }}</td>
          <td>{{ teams ? row.team_name : driverName(row.driver_number) }}</td>
          <td>{{ row.points_current ?? '–' }}</td>
        </tr></tbody>
      </table>
      <template v-if="!teams">
        <h2>Fahrer des letzten Rennens</h2>
        <ul><li v-for="driver in data.drivers" :key="driver.driver_number">#{{ driver.driver_number }} {{ driver.full_name }} – {{ driver.team_name }}</li></ul>
        <p v-if="!data.drivers.length">Keine Fahrer verfügbar.</p>
      </template>
    </template>
  </section>
</template>
<script>
import { getStandings } from '@/services/f1'
export default {
  props: { teams: Boolean },
  data: () => ({ year: 2024, data: null, loading: false, error: null, requestId: 0 }),
  computed: { standings() { return [...(this.teams ? this.data.team_standings : this.data.driver_standings)].sort((a, b) => (a.position_current ?? 999) - (b.position_current ?? 999)) } },
  mounted() { this.laden() },
  methods: {
    driverName(number) { return this.data.drivers.find(d => d.driver_number === number)?.full_name || `#${number}` },
    async laden() {
      const id = ++this.requestId
      this.loading = true
      this.error = null
      try { const data = await getStandings(this.year); if (id === this.requestId) this.data = data }
      catch (error) { if (id === this.requestId) this.error = error.message }
      finally { if (id === this.requestId) this.loading = false }
    }
  }
}
</script>
<style scoped>
th, td { padding: 8px; text-align: left; }
</style>
