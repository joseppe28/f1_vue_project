<template>
    <h1>F1 Rennen</h1>
    <p v-if="!race">Daten werden geladen ...</p>

    <p v-else>
        <strong>{{ race.raceName }}</strong> - {{ race.date }} ({{ race.circuit.circuitName }})
    </p>

    <h1>Streckeninformationen</h1>
    <h2>Location</h2>
    <ul>
        <li> {{ race.circuit.location }} </li>
        <li> {{ race.circuit.country }} </li>
        <li> {{ race.circuit.lat }} / {{ race.circuit.lng }} </li>
    </ul>
    <h2>Winner</h2>
    <ul>
        <li> {{ race.winner.givenName }} {{ race.winner.familyName }} ({{ race.winner.nationality }}) </li>
        <li> {{ race.winner.constructor.name }} </li>
    </ul>
    <h2>Standings</h2>
    <ul>
        <li v-for="standing in race.standings" :key="standing.position">
            {{ standing.position }} - {{ standing.Driver.givenName }} {{ standing.Driver.familyName }} ({{ standing.Constructor.name }}) - {{ standing.points }} Punkte
        </li>
    </ul>
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