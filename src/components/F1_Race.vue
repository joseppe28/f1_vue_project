<template>
  <h1>F1 Rennen</h1>
  <div v-if="loading" class="loading-spinner" role="status" aria-label="Rennen wird geladen"></div>
  <p v-else-if="error" role="alert">{{ error }}</p>
  <template v-else-if="race">
    <h2>{{ race.meeting_name }}</h2>
    <p>{{ new Date(race.date_start).toLocaleString('de-AT') }}</p>
    <h3>Strecke</h3>
    <p>{{ race.circuit_short_name }} – {{ race.country_name }}</p>
    <p v-if="race.is_cancelled">Rennen abgesagt</p>
    <h3>Rennergebnis</h3>
    <p v-if="!race.results.length">Noch kein Ergebnis verfügbar.</p>
    <table v-else>
      <thead><tr><th>Position</th><th>Fahrer</th><th>Team</th><th>Runden</th><th>Status</th></tr></thead>
      <tbody><tr v-for="result in sortedResults" :key="result.driver_number">
        <td>{{ result.position ?? '–' }}</td>
        <td>{{ driver(result.driver_number).full_name || result.driver_number }}</td>
        <td>{{ driver(result.driver_number).team_name || '–' }}</td>
        <td>{{ result.number_of_laps ?? '–' }}</td>
        <td>{{ result.dsq ? 'DSQ' : result.dns ? 'DNS' : result.dnf ? 'DNF' : 'Im Ziel' }}</td>
      </tr></tbody>
    </table>
  </template>
</template>
<script>
import { getF1 } from '@/services/f1'
export default {
  props: { jahr: { type: [Number, String], required: true }, runde: { type: [Number, String], required: true } },
  data: () => ({ race: null, loading: false, error: null, requestId: 0 }),
  computed: {
    racePath() { return `/seasons/${this.jahr}/races/${this.runde}` },
    sortedResults() { return [...this.race.results].sort((a, b) => (a.position ?? 999) - (b.position ?? 999)) }
  },
  watch: { racePath: { immediate: true, handler: 'laden' } },
  methods: {
    driver(number) { return this.race.drivers.find(d => d.driver_number === number) || {} },
    async laden() {
      const id = ++this.requestId
      this.loading = true
      this.error = null
      try {
        const data = await getF1(this.racePath)
        if (id === this.requestId) this.race = data
      } catch (error) { if (id === this.requestId) this.error = error.message }
      finally { if (id === this.requestId) this.loading = false }
    }
  }
}
</script>
<style scoped>
th, td { padding: 8px; text-align: left; }
.loading-spinner { width: 36px; height: 36px; border: 5px solid #d7eee3; border-top-color: #42b983; border-radius: 50%; animation: drehen .8s linear infinite; }
@keyframes drehen { to { transform: rotate(360deg); } }
</style>
