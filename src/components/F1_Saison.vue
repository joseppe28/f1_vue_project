<template>
    <section class="season-panel">
        <div v-if="loading" class="loading-spinner" role="status" aria-label="Saison wird geladen"></div>

        <p v-else-if="error" role="alert">{{ error }}</p>
        <template v-else-if="saison">
            <header class="season-summary">
                <div>
                    <p class="panel-label">Saisonübersicht</p>
                    <h2>{{ saison.year }}</h2>
                </div>
                <div class="race-count"><strong>{{ saison.races.length }}</strong><span>Rennen</span></div>
            </header>

            <ul class="race-list">
                <li v-for="rennen in saison.races" :key="rennen.session_key">
                    <router-link :to="{ name: 'Race', params: { jahr: jahr, runde: rennen.round } }" class="race-link">
                        <span class="race-round">{{ String(rennen.round).padStart(2, '0') }}</span>
                        <span class="race-name"><strong>{{ rennen.meeting_name }}</strong><small>{{ rennen.circuit_short_name }}</small></span>
                        <span class="race-arrow">→</span>
                    </router-link>
                </li>
            </ul>
        </template>
    </section>

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

<style scoped>
.season-panel {
    background: #fff;
}

.season-summary {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 28px 30px;
    border-top: 4px solid #17202d;
    border-bottom: 1px solid #e1e0db;
}

.panel-label {
    margin: 0 0 8px;
    color: #e53935;
    font-size: 0.72rem;
    font-weight: bold;
    letter-spacing: 0.14em;
    text-transform: uppercase;
}

h2 {
    margin: 0;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 2.4rem;
    font-weight: normal;
}

.race-count {
    text-align: right;
}

.race-count strong {
    display: block;
    color: #e53935;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 2.2rem;
    line-height: 1;
}

.race-count span {
    color: #68717b;
    font-size: 0.75rem;
    text-transform: uppercase;
}

.race-list {
    margin: 0;
    padding: 0;
    list-style: none;
}

.race-list li {
    border-bottom: 1px solid #e1e0db;
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

.race-link {
    display: grid;
    grid-template-columns: 54px 1fr auto;
    align-items: center;
    gap: 18px;
    padding: 18px 30px;
    color: #17202d;
    text-decoration: none;
    transition: background 0.2s, padding 0.2s;
}

.race-link:hover {
    padding-left: 36px;
    background: #f4f3ef;
}

.race-round {
    color: #e53935;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 1.3rem;
}

.race-name strong,
.race-name small {
    display: block;
}

.race-name small {
    margin-top: 4px;
    color: #68717b;
    font-size: 0.8rem;
}

.race-arrow {
    color: #e53935;
    font-size: 1.3rem;
}

@keyframes drehen {
    to {
        transform: rotate(360deg);
    }
}

@media (max-width: 500px) {
    .season-summary {
        padding: 22px 18px;
    }

    .race-link {
        grid-template-columns: 40px 1fr auto;
        gap: 10px;
        padding: 16px 18px;
    }

    .race-link:hover {
        padding-left: 22px;
    }
}
</style>