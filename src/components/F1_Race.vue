<template>
    <section class="race-detail">
        <header class="race-hero">
            <p class="panel-label">Grand Prix / {{ race.date }}</p>
            <h1>{{ race.raceName }}</h1>
            <p>{{ race.circuit.circuitName }} · {{ race.circuit.country }}</p>
        </header>

        <div class="race-facts">
            <article class="fact-card">
                <span class="fact-label">Strecke</span>
                <h2>{{ race.circuit.location }}</h2>
                <p>{{ race.circuit.country }}</p>
                <small>{{ race.circuit.lat }} / {{ race.circuit.lng }}</small>
            </article>
            <article class="fact-card winner-card">
                <span class="fact-label">Sieger</span>
                <h2>{{ race.winner.givenName }} {{ race.winner.familyName }}</h2>
                <p>{{ race.winner.constructor.name }}</p>
                <small>{{ race.winner.nationality }}</small>
            </article>
        </div>

        <section class="standings">
            <div class="standings-heading">
                <div>
                    <span class="fact-label">Ergebnis</span>
                    <h2>Top 10</h2>
                </div>
                <span class="points-label">Punkte</span>
            </div>
            <ol>
                <li v-for="standing in race.standings" :key="standing.position">
                    <span class="position">{{ String(standing.position).padStart(2, '0') }}</span>
                    <span class="driver-name">{{ standing.Driver.givenName }} {{ standing.Driver.familyName }}<small>{{ standing.Constructor.name }}</small></span>
                    <strong>{{ standing.points }}</strong>
                </li>
            </ol>
        </section>
    </section>
</template>


<script>
export default {
    props: {
        race: {
            type: [Object, String],
            required: true
        }
    },
}
</script>

<style scoped>
.race-detail {
    background: #fff;
}

.race-hero {
    padding: 38px clamp(24px, 5vw, 48px) 42px;
    background: #17202d;
    color: #fff;
}

.panel-label,
.fact-label {
    color: #ffdf57;
    font-size: 0.72rem;
    font-weight: bold;
    letter-spacing: 0.14em;
    text-transform: uppercase;
}

.panel-label {
    margin: 0 0 16px;
}

.race-hero h1 {
    margin: 0;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: clamp(2.4rem, 6vw, 5rem);
    font-weight: normal;
    line-height: 1;
}

.race-hero p:last-child {
    margin: 18px 0 0;
    color: #aeb8c4;
}

.race-facts {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1px;
    background: #d7d6d1;
}

.fact-card {
    min-height: 180px;
    padding: 26px 30px;
    background: #f4f3ef;
}

.winner-card {
    background: #ffdf57;
}

.winner-card .fact-label {
    color: #a52e2b;
}

.fact-card h2 {
    margin: 22px 0 8px;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 1.8rem;
    font-weight: normal;
}

.fact-card p,
.fact-card small {
    margin: 0;
    color: #68717b;
}

.fact-card small {
    display: block;
    margin-top: 16px;
    font-size: 0.75rem;
}

.standings {
    padding: 34px 30px 12px;
}

.standings-heading {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 14px;
}

.standings-heading h2 {
    margin: 8px 0 0;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 2rem;
    font-weight: normal;
}

.standings-heading .fact-label {
    color: #e53935;
}

.points-label {
    color: #68717b;
    font-size: 0.72rem;
    font-weight: bold;
    text-transform: uppercase;
}

.standings ol {
    margin: 0;
    padding: 0;
    list-style: none;
}

.standings li {
    display: grid;
    grid-template-columns: 48px 1fr auto;
    align-items: center;
    gap: 14px;
    padding: 15px 0;
    border-top: 1px solid #e1e0db;
}

.position {
    color: #e53935;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 1.2rem;
}

.driver-name {
    font-weight: bold;
}

.driver-name small {
    display: block;
    margin-top: 3px;
    color: #68717b;
    font-size: 0.76rem;
    font-weight: normal;
}

.standings li > strong {
    font-size: 1.1rem;
}

@media (max-width: 600px) {
    .race-facts {
        grid-template-columns: 1fr;
    }

    .fact-card,
    .standings {
        padding-right: 20px;
        padding-left: 20px;
    }
}
</style>