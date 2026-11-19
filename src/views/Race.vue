<template>
  <div class="race">
    <h1>Rennen {{ runde || 'nicht verfügbar' }}</h1>
    <F1_Race :jahr="jahr" :runde="runde" />
  </div>
</template>

<script>
import F1_Race from '@/components/F1_Race.vue'

export default {
  name: 'Race',
  components: {
    F1_Race
  },
  computed: {
    jahr() { return this.$route.params.jahr },
    runde() { return this.$route.params.runde }
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
