<template>
    <div class="saison-data">
        <h1>Saison Daten</h1>
        <p>Hier kannst du ein Jahr auswählen:</p>

        <label for="jahr">Jahr</label>
        <input id="jahr" v-model.number="jahr" type="number" min="1950" max="2026">
        <button type="button" @click="ausgewaehltesJahr = jahr">Saison laden</button>

        <F1_Saison :jahr="ausgewaehltesJahr" />
    </div>
</template>

<script>
import F1_Saison from '@/components/F1_Saison.vue'

export default {
    name: 'SaisonData',
    components: {
        F1_Saison
    },
    data() {
        return {
            jahr: 2024,
            ausgewaehltesJahr: 2024
        }
    }
}
</script>

<style scoped>
label,
input,
button {
    margin-right: 8px;
}

input {
    width: 80px;
}
</style>