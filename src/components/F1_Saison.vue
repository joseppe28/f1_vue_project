<template>
	<h1>F1 Saison</h1>
    <div v-if="loading" class="loading-spinner" role="status" aria-label="Saison wird geladen"></div>

    <p v-else-if="saison">
        <strong>{{ saison.season }}</strong> - {{ saison.races.length }} Rennen

        <ul>
            <li v-for="rennen in saison.races" :key="rennen.raceId">
                <router-link
                    :to="{ name: 'Race', params: { jahr: jahr, runde: rennen.round } }"
                    class="race-link"
                >
                    {{ rennen.round }} - {{ rennen.raceName }} ({{ rennen.circuit.circuitName }})
                </router-link>
            </li>
        </ul>

    </p>

</template>
<script>
export default {
    props: {
        jahr: {
            type: [Number, String],
            required: true
        }
    },
    data() {
        return {
            saison: null,
            loading: false
        }
    },
    methods: {
        async ladeSaison() {
            this.loading = true
            this.saison = null

            try{
                const response = await fetch(`https://f1api.dev/api/${this.jahr}`)
                if (!response.ok) {
                    throw new Error('Die Daten konnten nicht geladen werden.')
            }

                this.saison = await response.json()
            }
            catch (error) {
                console.error(error)
            }
            finally {
                this.loading = false
            }
        }
    },
    async mounted() {
        await this.ladeSaison()
    },
    watch: {
        async jahr() {
            await this.ladeSaison()
        }
    },
    name: 'F1_Saison'
}
</script>

<style scoped>
.loading-spinner {
    width: 36px;
    height: 36px;
    margin: 20px 0;
    border: 5px solid #d7eee3;
    border-top-color: #42b983;
    border-radius: 50%;
    animation: drehen 0.8s linear infinite;
}

.race-link {
    color: #2c3e50;
}

@keyframes drehen {
    to {
        transform: rotate(360deg);
    }
}
</style>