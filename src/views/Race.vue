<template>
  <div class="race">
    <div v-if="loading" class="loading-spinner" role="status" aria-label="Rennen wird geladen"></div>
    <F1_Race v-else-if="rennen" :race="rennen" />
    <p v-else>Die Renndaten konnten nicht geladen werden.</p>
  </div>
</template>

<script>
import F1_Race from '@/components/F1_Race.vue'

export default {
  name: 'Race',
  components: {
    F1_Race
  },
  data() {
    return {
      jahr: this.$route.params.jahr,
      runde: this.$route.params.runde,
      rennen: null,
      loading: true
    }
  },
  async mounted() {
    try {
      const response = await fetch(`https://f1api.dev/api/${this.jahr}`)
      if (!response.ok) {
        throw new Error('Die Renndaten konnten nicht geladen werden.')
      }

      const data = await response.json()
      this.rennen = data.races.find((race) => String(race.round) === String(this.runde))
    } catch (error) {
      console.error(error)
    } finally {
      this.loading = false
    }
  }
}
</script>

<style scoped>
.race {
  padding: 20px;
}

.loading-spinner {
  width: 36px;
  height: 36px;
  margin: 20px 0;
  border: 5px solid #d7eee3;
  border-top-color: #42b983;
  border-radius: 50%;
  animation: drehen 0.8s linear infinite;
}

dl {
  margin: 0;
}

@keyframes drehen {
  to {
    transform: rotate(360deg);
  }
}
</style>
