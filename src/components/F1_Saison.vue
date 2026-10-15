<template>
	<h1>F1 Saison</h1>
    <p v-if="!saison">Daten werden geladen ...</p>

    <p v-else>
        <strong>{{ saison.season }}</strong> - {{ saison.races.length }} Rennen

        <ul>
            <li v-for="rennen in saison.races" :key="rennen.raceId">
                {{ rennen.round }} - {{ rennen.raceName }} ({{ rennen.circuit.circuitName }})
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
            saison: null
        }
    },
    methods: {
        async ladeSaison() {
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