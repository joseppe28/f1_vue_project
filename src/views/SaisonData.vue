<template>
    <main class="saison-data">
        <p class="eyebrow">01 / Archiv</p>
        <h1>Saison <span>Daten</span></h1>
        <p class="intro">Wähle ein Jahr und erkunde jedes Rennen dieser Saison.</p>

        <div class="season-controls">
            <label for="jahr">Saison auswählen</label>
            <div class="control-row">
                <input id="jahr" v-model.number="jahr" type="number" min="1950" max="2026">
                <button type="button" @click="ausgewaehltesJahr = jahr">Saison laden <span>→</span></button>
            </div>
        </div>

        <F1_Saison :jahr="ausgewaehltesJahr" />
    </main>
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
.saison-data {
    width: min(100% - 48px, 980px);
    margin: 0 auto;
    padding: 60px 0 80px;
}

.eyebrow {
    margin: 0 0 12px;
    color: #e53935;
    font-size: 0.75rem;
    font-weight: bold;
    letter-spacing: 0.15em;
    text-transform: uppercase;
}

h1 {
    margin: 0;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: clamp(2.8rem, 7vw, 5rem);
    font-weight: normal;
}

h1 span {
    color: #e53935;
}

.intro {
    margin: 14px 0 36px;
    color: #68717b;
}

.season-controls {
    margin-bottom: 42px;
    padding: 22px 24px;
    border-left: 4px solid #e53935;
    background: #fff;
}

label {
    display: block;
    margin-bottom: 10px;
    color: #68717b;
    font-size: 0.78rem;
    font-weight: bold;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

.control-row {
    display: flex;
    gap: 10px;
}

input {
    width: 80px;
    padding: 12px;
    border: 1px solid #d7d6d1;
    background: #f8f7f3;
    color: #17202d;
    font: inherit;
    font-weight: bold;
}

button {
    padding: 12px 18px;
    border: 0;
    background: #17202d;
    color: #fff;
    font: inherit;
    font-weight: bold;
    cursor: pointer;
}

button span {
    margin-left: 12px;
    color: #ffdf57;
}

@media (max-width: 500px) {
    .saison-data {
        width: min(100% - 28px, 980px);
        padding-top: 40px;
    }

    .control-row {
        flex-direction: column;
    }

    input,
    button {
        width: 100%;
    }
}
</style>