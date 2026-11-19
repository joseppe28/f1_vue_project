<template>
  <div class="fahrer-data">
    <h1>Fahrer Daten</h1>
    <label for="fahrer-jahr">Saison auswählen</label>
    <select id="fahrer-jahr" v-model.number="jahr">
      <option v-for="year in jahre" :key="year" :value="year">{{ year }}</option>
    </select>
    <label for="fahrer-suche">Fahrer suchen (gewählte Saison)</label>
    <input id="fahrer-suche" v-model.trim="suche" type="search" placeholder="Name oder Startnummer">
    <div v-if="loading" class="loading-spinner" role="status" aria-label="Fahrer werden geladen"></div>
    <p v-else-if="error" role="alert">{{ error }}</p>
    <p v-else-if="!gefiltert.length">Keine Fahrer gespeichert.</p>
    <ul v-else class="fahrer-liste">
      <li v-for="driver in gefiltert" :key="driver.driver_number">
        <button class="fahrer-button" @click="offen = offen === driver.driver_number ? null : driver.driver_number">
          <strong>{{ driver.full_name }}</strong><span>Nr. {{ driver.driver_number }}</span>
        </button>
        <dl v-if="offen === driver.driver_number" class="fahrer-details">
          <div><dt>Team</dt><dd>{{ driver.team_name || 'Nicht vorhanden' }}</dd></div>
        </dl>
      </li>
    </ul>
    <p>Teamzuordnung aus dem letzten gespeicherten Einsatz des Fahrers in dieser Saison.</p>
  </div>
</template>
<script>
import { getF1 } from '@/services/f1'
export default {
  data: () => ({ jahr: 2024, suche: '', fahrer: [], offen: null, loading: false, error: null, requestId: 0 }),
  computed: {
    jahre() { return Array.from({ length: new Date().getFullYear() - 2022 }, (_, i) => new Date().getFullYear() - i) },
    gefiltert() { return this.fahrer.filter(d => (d.full_name + ' ' + d.driver_number).toLowerCase().includes(this.suche.toLowerCase())) }
  },
  watch: { jahr: { immediate: true, handler: 'laden' } },
  methods: {
    async laden() {
      const id = ++this.requestId
      this.loading = true
      this.error = null
      this.offen = null
      try {
        const season = await getF1('/seasons/' + this.jahr)
        const drivers = new Map()
        for (const race of season.races) {
          if (id !== this.requestId) return
          const entries = await getF1('/drivers/' + race.session_key)
          for (const driver of entries) drivers.set(driver.driver_number, driver)
        }
        if (id === this.requestId) this.fahrer = [...drivers.values()]
      } catch (error) { if (id === this.requestId) this.error = error.message }
      finally { if (id === this.requestId) this.loading = false }
    }
  }
}
</script>
<style scoped>
.fahrer-data {
  width: min(100% - 48px, 980px);
  margin: 0 auto;
  padding: 60px 0 80px;
}

h1 {
  margin: 0 0 34px;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(2.8rem, 7vw, 5rem);
  font-weight: normal;
}

.fahrer-data > label {
  display: inline-block;
  margin-right: 12px;
  color: #68717b;
  font-size: 0.78rem;
  font-weight: bold;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

input,
select {
  padding: 12px;
  border: 1px solid #d7d6d1;
  background: #fff;
  color: #17202d;
  font: inherit;
}

select {
  width: 110px;
  margin: 0 0 24px;
}

input {
  display: block;
  width: min(100%, 420px);
  margin: 0 0 32px;
}

.fahrer-liste {
  overflow: hidden;
  padding: 0;
  border-top: 4px solid #17202d;
  background: #fff;
  list-style: none;
}

.fahrer-liste li {
  border-bottom: 1px solid #e1e0db;
}

.fahrer-button {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 18px;
  width: 100%;
  padding: 18px 22px;
  border: 0;
  background: transparent;
  color: #17202d;
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s, padding 0.2s;
}

.fahrer-button:hover {
  padding-left: 28px;
  background: #f4f3ef;
}

.fahrer-button strong {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 1.15rem;
  font-weight: normal;
}

.fahrer-button span {
  color: #68717b;
  font-size: 0.85rem;
}

.fahrer-details {
  display: grid;
  gap: 9px;
  margin: 0 22px 18px;
  padding: 18px;
  border-left: 3px solid #e53935;
  background: #f4f3ef;
}

.fahrer-details div {
  display: flex;
  gap: 16px;
}

.fahrer-details dt {
  min-width: 130px;
  color: #68717b;
  font-size: 0.78rem;
  font-weight: bold;
  text-transform: uppercase;
}

.fahrer-details dd {
  margin: 0;
}

.fahrer-details a {
  color: #e53935;
  font-weight: bold;
}

.loading-spinner {
  width: 36px;
  height: 36px;
  border: 4px solid #d7d6d1;
  border-top-color: #e53935;
  border-radius: 50%;
  animation: drehen 0.8s linear infinite;
}

@keyframes drehen {
  to { transform: rotate(360deg); }
}

@media (max-width: 600px) {
  .fahrer-data {
    width: min(100% - 28px, 980px);
    padding-top: 40px;
  }

  .fahrer-button {
    grid-template-columns: 1fr auto;
    gap: 5px 12px;
  }

  .fahrer-button span:last-child {
    grid-column: 1 / -1;
  }

  .fahrer-details div {
    flex-direction: column;
    gap: 3px;
  }
}
</style>
