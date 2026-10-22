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
  padding: 20px;
}

label,
input {
  display: block;
}

input {
  width: min(100%, 360px);
  margin: 8px 0 20px;
  padding: 8px;
}

select {
  margin: 8px 0 20px;
  padding: 8px;
}

.fahrer-liste {
  padding: 0;
  list-style: none;
}

.fahrer-liste li {
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}

.fahrer-button {
  display: flex;
  gap: 12px;
  width: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  text-align: left;
  cursor: pointer;
}

.fahrer-button span {
  color: #666;
}

.fahrer-details {
  display: grid;
  gap: 6px;
  margin: 12px 0 4px;
  padding: 12px;
  background: #f4f8f6;
}

.fahrer-details div {
  display: flex;
  gap: 12px;
}

.fahrer-details dt {
  min-width: 130px;
  font-weight: bold;
}

.fahrer-details dd {
  margin: 0;
}

.loading-spinner {
  width: 36px;
  height: 36px;
  border: 5px solid #d7eee3;
  border-top-color: #42b983;
  border-radius: 50%;
  animation: drehen 0.8s linear infinite;
}

@keyframes drehen {
  to {
    transform: rotate(360deg);
  }
}
</style>
