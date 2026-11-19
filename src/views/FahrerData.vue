<template>
  <div class="fahrer-data">
    <h1>Fahrer Daten</h1>
    <label for="fahrer-jahr">Saison auswählen</label>
    <select id="fahrer-jahr" v-model="ausgewaehltesJahr">
      <option v-for="jahr in jahre" :key="jahr" :value="jahr">{{ jahr }}</option>
    </select>

    <label for="fahrer-suche">Fahrer suchen (alle Saisons)</label>
    <input
      id="fahrer-suche"
      v-model.trim="suchtext"
      type="search"
      placeholder="Name oder Fahrer-ID eingeben"
    />

    <div v-if="loading" class="loading-spinner" role="status" aria-label="Fahrer werden geladen"></div>
    <p v-else-if="fehler">Die Fahrerdaten konnten nicht geladen werden.</p>
    <p v-else-if="angezeigteFahrer.length === 0">Keine Fahrer gefunden.</p>

    <ul v-else class="fahrer-liste">
      <li v-for="fahrer in angezeigteFahrer" :key="fahrer.driverId">
        <button class="fahrer-button" type="button" @click="umschalten(fahrer.driverId)">
          <strong>{{ fahrer.name }} {{ fahrer.surname }}</strong>
          <span v-if="fahrer.number">Nr. {{ fahrer.number }}</span>
          <span v-if="fahrer.nationality">{{ fahrer.nationality }}</span>
        </button>

        <dl v-if="ausgeklappterFahrer === fahrer.driverId" class="fahrer-details">
          <div><dt>Fahrer-ID</dt><dd>{{ fahrer.driverId }}</dd></div>
          <div><dt>Geburtstag</dt><dd>{{ fahrer.birthday || 'Nicht vorhanden' }}</dd></div>
          <div><dt>Nationalität</dt><dd>{{ fahrer.nationality || 'Nicht vorhanden' }}</dd></div>
          <div><dt>Team-ID</dt><dd>{{ fahrer.teamId || 'Nicht vorhanden' }}</dd></div>
          <div v-if="fahrer.url"><dt>Weitere Informationen</dt><dd><a :href="fahrer.url" target="_blank" rel="noopener">Wikipedia</a></dd></div>
        </dl>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'FahrerData',
  data() {
    return {
      fahrer: [],
      saisonFahrer: [],
      ausgewaehltesJahr: 2024,
      suchtext: '',
      ausgeklappterFahrer: null,
      loading: true,
      fehler: false
    }
  },
  computed: {
    jahre() {
      return Array.from({ length: 2025 - 1950 + 1 }, (_, index) => 2025 - index)
    },
    gefilterteFahrer() {
      const suche = this.suchtext.toLowerCase()

      return this.fahrer.filter((fahrer) => {
        const fahrerText = [fahrer.name, fahrer.surname, fahrer.driverId]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()

        return fahrerText.includes(suche)
      })
    },
    angezeigteFahrer() {
      return this.suchtext ? this.gefilterteFahrer : this.saisonFahrer
    }
  },
  methods: {
    async ladeAlleFahrer() {
      const fahrer = []
      const limit = 100
      let offset = 0

      while (true) {
        const response = await fetch(`https://f1api.dev/api/drivers?limit=${limit}&offset=${offset}`)
        if (!response.ok) {
          throw new Error('Die globale Fahrerliste konnte nicht geladen werden.')
        }

        const data = await response.json()
        const seite = data.drivers || []
        fahrer.push(...seite)

        if (seite.length < limit) {
          return fahrer
        }

        offset += limit
      }
    },
    async ladeFahrer() {
      this.loading = true
      this.fehler = false
      this.ausgeklappterFahrer = null

      try {
        const [alleFahrer, saisonAntwort] = await Promise.all([
          this.ladeAlleFahrer(),
          fetch(`https://f1api.dev/api/${this.ausgewaehltesJahr}/drivers`)
        ])
        if (!saisonAntwort.ok) {
          throw new Error('Die Fahrerdaten konnten nicht geladen werden.')
        }

        const saison = await saisonAntwort.json()
        this.fahrer = alleFahrer
        this.saisonFahrer = saison.drivers || []
      } catch (error) {
        console.error(error)
        this.fehler = true
      } finally {
        this.loading = false
      }
    },
    umschalten(driverId) {
      this.ausgeklappterFahrer = this.ausgeklappterFahrer === driverId ? null : driverId
    }
  },
  async mounted() {
    await this.ladeFahrer()
  },
  watch: {
    async ausgewaehltesJahr() {
      await this.ladeFahrer()
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
