<template>
  <h1>F1 Saison</h1>
  <p v-if="loading" role="status">Saison wird geladen …</p>
  <p v-else-if="error" role="alert">{{ error }}</p>
  <div v-else-if="saison">
    <strong>{{ saison.year }} – {{ saison.races.length }} Rennen</strong>
    <ul>
      <li v-for="rennen in saison.races" :key="rennen.session_key">
        <router-link :to="{ name: 'Race', params: { jahr, runde: rennen.round } }">
          {{ rennen.round }} – {{ rennen.meeting_name }} ({{ rennen.circuit_short_name }})
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { getF1 } from '@/services/f1'
export default {
  props: { jahr: { type: [Number, String], required: true } },
  data: () => ({ saison: null, loading: false, error: null, requestId: 0 }),
  watch: { jahr: { immediate: true, handler: 'laden' } },
  methods: {
    async laden() {
      const id = ++this.requestId
      this.loading = true
      this.error = null
      try {
        const data = await getF1(`/seasons/${this.jahr}`)
        if (id === this.requestId) this.saison = data
      } catch (error) { if (id === this.requestId) this.error = error.message }
      finally { if (id === this.requestId) this.loading = false }
    }
  }
}
</script>
