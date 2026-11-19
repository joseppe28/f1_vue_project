<template>
  <h1>F1 Rennen</h1>
  <p v-if="loading" role="status">Daten werden geladen …</p>
  <p v-else-if="error" role="alert">{{ error }}</p>
  <template v-else-if="race">
    <h2>{{ race.meeting_name }}</h2>
    <p>{{ race.date_start ? new Date(race.date_start).toLocaleString('de-AT') : 'Datum nicht verfügbar' }}</p>
    <h2>Streckeninformationen</h2>
    <p>{{ race.circuit_short_name }} – {{ race.country_name }}</p>
    <h2>Rennergebnis</h2>
    <p v-if="!sortedResults.length">Noch kein Ergebnis gespeichert.</p>
    <ul v-else>
      <li v-for="result in sortedResults" :key="result.driver_number">
        {{ result.position ?? '–' }} – {{ driver(result.driver_number).full_name || result.driver_number }}
        ({{ driver(result.driver_number).team_name || 'Team unbekannt' }}) – {{ result.number_of_laps ?? '–' }} Runden
        {{ result.dsq ? 'DSQ' : result.dns ? 'DNS' : result.dnf ? 'DNF' : '' }}
      </li>
    </ul>
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