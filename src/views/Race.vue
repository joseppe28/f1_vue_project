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
  width: min(100% - 48px, 980px);
  margin: 0 auto;
  padding: 60px 0 80px;
}

.loading-spinner {
  width: 36px;
  height: 36px;
  margin: 20px 0;
  border: 4px solid #d7d6d1;
  border-top-color: #e53935;
  border-radius: 50%;
  animation: drehen 0.8s linear infinite;
}

@media (max-width: 600px) {
  .race {
    width: min(100% - 28px, 980px);
    padding-top: 40px;
  }
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
