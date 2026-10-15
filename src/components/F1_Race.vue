<template>
    <h1>F1 Rennen</h1>
    <p v-if="!race">Daten werden geladen ...</p>

    <p v-else>
        <strong>{{ race.raceName }}</strong> - {{ race.date }} ({{ race.circuit.circuitName }})
    </p>

    <h1>Streckeninformationen</h1>
    <h2>Location</h2>
    <ul>
        <li> {{ race.circuit.location }} </li>
        <li> {{ race.circuit.country }} </li>
        <li> {{ race.circuit.lat }} / {{ race.circuit.lng }} </li>
    </ul>
    <h2>Winner</h2>
    <ul>
        <li> {{ race.winner.givenName }} {{ race.winner.familyName }} ({{ race.winner.nationality }}) </li>
        <li> {{ race.winner.constructor.name }} </li>
        <li> {{ race.winner.time.time }} </li>
    </ul>
    <h2>Standings</h2>
    <ul>
        <li v-for="standing in race.standings" :key="standing.position">
            {{ standing.position }} - {{ standing.Driver.givenName }} {{ standing.Driver.familyName }} ({{ standing.Constructor.name }}) - {{ standing.points }} Punkte
        </li>
    </ul>
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