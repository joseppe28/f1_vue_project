<template>
  <main class="quiz-page">
    <div class="race-stripe" aria-hidden="true"></div>
    <div class="quiz">
      <header class="quiz-header">
        <div class="header-copy">
          <router-link to="/" class="back-link">← Zur Übersicht</router-link>
          <p class="eyebrow">Formel-1-Wissen / 2026</p>
          <h1>F1 <span>Quiz</span></h1>
          <p class="intro">Wie gut kennst du die Königsklasse des Motorsports?</p>
        </div>
        <div class="score" aria-live="polite">
          <span>Punktestand</span>
          <strong>{{ punkte }}</strong>
          <small>Runde {{ fragenNummer }}</small>
        </div>
      </header>

      <section class="quiz-card" aria-labelledby="frage">
        <div class="frage-meta">
          <span class="question-number">{{ String(fragenNummer).padStart(2, '0') }}</span>
          <div class="question-info">
            <span>Frage von {{ gesamtFragen }}</span>
            <span class="dot">•</span>
            <span>4 Antworten</span>
          </div>
        </div>
        <div class="progress-track" aria-hidden="true">
          <span :style="{ width: `${fortschritt}%` }"></span>
        </div>

        <div class="question-content">
          <p class="question-label">Deine nächste Herausforderung</p>
          <h2 id="frage">{{ aktuelleFrage.frage }}</h2>
        </div>

        <div class="antworten">
          <button
            v-for="antwort in aktuelleFrage.antworten"
            :key="antwort"
            class="antwort"
            :class="antwortKlasse(antwort)"
            type="button"
            :disabled="beantwortet"
            @click="antwortAuswaehlen(antwort)"
          >
            <span class="antwort-buchstabe">{{ buchstabe(antwort) }}</span>
            <span class="antwort-text">{{ antwort }}</span>
            <span v-if="beantwortet && antwort === aktuelleFrage.richtigeAntwort" class="status-icon">✓</span>
            <span v-else-if="beantwortet && antwort === ausgewaehlteAntwort" class="status-icon">×</span>
          </button>
        </div>

        <div v-if="beantwortet" class="feedback" :class="feedbackKlasse" role="status">
          <span class="feedback-mark">{{ feedbackKlasse === 'richtig' ? '✓' : '!' }}</span>
          <div>
            <strong>{{ feedbackKlasse === 'richtig' ? 'Volltreffer' : 'Knapp daneben' }}</strong>
            <p>{{ feedbackText }}</p>
          </div>
        </div>

        <button v-if="beantwortet" class="weiter-button" type="button" @click="naechsteFrage">
          Nächste Frage <span>→</span>
        </button>
      </section>

      <footer class="quiz-footer">
        <span class="flag-icon" aria-hidden="true"></span>
        <span>Bereit für die nächste Runde?</span>
      </footer>
    </div>
  </main>
</template>

<script>
const fragen = [
  {
    frage: 'Welcher Fahrer hält den Rekord für die meisten Formel-1-Weltmeistertitel?',
    richtigeAntwort: 'Lewis Hamilton und Michael Schumacher',
    antworten: ['Ayrton Senna', 'Lewis Hamilton und Michael Schumacher', 'Sebastian Vettel', 'Alain Prost']
  },
  {
    frage: 'Wie viele Räder hat ein Formel-1-Auto?',
    richtigeAntwort: 'Vier',
    antworten: ['Zwei', 'Drei', 'Vier', 'Sechs']
  },
  {
    frage: 'Wie wird der erste Startplatz in einem Rennen genannt?',
    richtigeAntwort: 'Pole-Position',
    antworten: ['Boxengasse', 'Pole-Position', 'Safety-Car-Position', 'Grid-Pass']
  },
  {
    frage: 'Welche Flagge beendet ein Formel-1-Rennen?',
    richtigeAntwort: 'Die karierte Flagge',
    antworten: ['Die rote Flagge', 'Die blaue Flagge', 'Die karierte Flagge', 'Die grüne Flagge']
  },
  {
    frage: 'Wie viele Punkte erhält der Sieger eines Grand Prix aktuell?',
    richtigeAntwort: '25',
    antworten: ['10', '18', '25', '30']
  },
  {
    frage: 'Was bedeutet die Abkürzung DRS?',
    richtigeAntwort: 'Drag Reduction System',
    antworten: ['Driver Racing System', 'Drag Reduction System', 'Dynamic Rear Steering', 'Downforce Regulation Setup']
  },
  {
    frage: 'In welchem Land findet der Grand Prix von Monza statt?',
    richtigeAntwort: 'Italien',
    antworten: ['Spanien', 'Italien', 'Monaco', 'Frankreich']
  },
  {
    frage: 'Welche Reifenmischung ist normalerweise die weichste?',
    richtigeAntwort: 'Soft',
    antworten: ['Hard', 'Medium', 'Soft', 'Intermediate']
  }
]

export default {
  name: 'Quiz',
  data() {
    return {
      aktuelleFrage: null,
      vorherigeFrage: null,
      ausgewaehlteAntwort: null,
      punkte: 0,
      fragenNummer: 1,
      gesamtFragen: fragen.length
    }
  },
  computed: {
    beantwortet() {
      return this.ausgewaehlteAntwort !== null
    },
    feedbackKlasse() {
      return this.ausgewaehlteAntwort === this.aktuelleFrage.richtigeAntwort ? 'richtig' : 'falsch'
    },
    feedbackText() {
      if (this.feedbackKlasse === 'richtig') {
        return 'Richtig! Du bekommst einen Punkt.'
      }

      return `Leider falsch. Die richtige Antwort ist: ${this.aktuelleFrage.richtigeAntwort}`
    },
    fortschritt() {
      return ((this.fragenNummer - 1) % this.gesamtFragen + 1) / this.gesamtFragen * 100
    }
  },
  methods: {
    gemischteAntworten(antworten) {
      return [...antworten].sort(() => Math.random() - 0.5)
    },
    zufaelligeFrage() {
      const verfuegbareFragen = fragen.filter((frage) => frage.frage !== this.vorherigeFrage?.frage)
      const frage = verfuegbareFragen[Math.floor(Math.random() * verfuegbareFragen.length)]

      return {
        ...frage,
        antworten: this.gemischteAntworten(frage.antworten)
      }
    },
    neueFrage() {
      this.vorherigeFrage = this.aktuelleFrage
      this.aktuelleFrage = this.zufaelligeFrage()
      this.ausgewaehlteAntwort = null
    },
    antwortAuswaehlen(antwort) {
      this.ausgewaehlteAntwort = antwort
      if (antwort === this.aktuelleFrage.richtigeAntwort) {
        this.punkte += 1
      }
    },
    naechsteFrage() {
      this.fragenNummer += 1
      this.neueFrage()
    },
    antwortKlasse(antwort) {
      if (!this.beantwortet) {
        return ''
      }

      if (antwort === this.aktuelleFrage.richtigeAntwort) {
        return 'richtig'
      }

      return antwort === this.ausgewaehlteAntwort ? 'falsch' : ''
    },
    buchstabe(antwort) {
      return String.fromCharCode(65 + this.aktuelleFrage.antworten.indexOf(antwort))
    }
  },
  created() {
    this.aktuelleFrage = this.zufaelligeFrage()
  }
}
</script>

<style scoped>
.quiz-page {
  --ink: #17202d;
  --muted: #78818d;
  --paper: #f9f8f4;
  --line: #deded9;
  --red: #e53935;
  min-height: calc(100vh - 100px);
  overflow: hidden;
  background: #17202d;
  color: var(--ink);
}

.quiz-page::before {
  position: absolute;
  inset: 100px 0 0;
  z-index: 0;
  background: radial-gradient(circle at 75% 15%, rgba(229, 57, 53, 0.22), transparent 30%), linear-gradient(135deg, #17202d 0%, #222c3b 65%, #303b48 100%);
  content: '';
}

.race-stripe {
  position: absolute;
  top: 100px;
  right: 12%;
  z-index: 1;
  width: 90px;
  height: 420px;
  background: repeating-linear-gradient(135deg, transparent 0 14px, rgba(255, 255, 255, 0.08) 14px 28px);
  transform: skewX(-23deg);
}

.quiz {
  position: relative;
  z-index: 2;
  width: min(100% - 48px, 920px);
  margin: 0 auto;
  padding: 52px 0 32px;
}

.quiz-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
  margin-bottom: 34px;
  color: #fff;
}

.header-copy {
  min-width: 0;
}

.back-link {
  display: inline-block;
  margin-bottom: 36px;
  color: #aeb8c4;
  font-size: 0.82rem;
  font-weight: bold;
  letter-spacing: 0.04em;
  text-decoration: none;
  transition: color 0.2s;
}

.back-link:hover {
  color: #fff;
}

.eyebrow {
  margin: 0 0 8px;
  color: #ff756f;
  font-size: 0.76rem;
  font-weight: bold;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

h1,
h2 {
  margin: 0;
}

h1 {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(2.8rem, 7vw, 5.2rem);
  letter-spacing: 0;
  line-height: 0.95;
}

h1 span {
  color: #ffdf57;
}

.intro {
  margin: 16px 0 0;
  color: #b8c0ca;
  font-size: 1rem;
}

.score {
  flex: 0 0 142px;
  padding: 18px 18px 16px;
  border-top: 3px solid #ffdf57;
  background: rgba(255, 255, 255, 0.09);
  text-align: left;
}

.score span,
.score small {
  display: block;
  color: #b8c0ca;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.score strong {
  display: block;
  margin: 4px 0 8px;
  color: #fff;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 2.7rem;
  line-height: 1;
}

.quiz-card {
  position: relative;
  padding: clamp(24px, 5vw, 54px);
  background: var(--paper);
  box-shadow: 18px 18px 0 rgba(0, 0, 0, 0.16);
  animation: card-in 0.6s ease both;
}

.frage-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--line);
}

.question-number {
  color: var(--red);
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 2rem;
  font-weight: bold;
  line-height: 1;
}

.question-info {
  display: flex;
  gap: 9px;
  color: var(--muted);
  font-size: 0.78rem;
  font-weight: bold;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.dot {
  color: var(--red);
}

.progress-track {
  height: 4px;
  margin-top: -1px;
  background: #e7e5df;
}

.progress-track span {
  display: block;
  height: 100%;
  background: var(--red);
  transition: width 0.4s ease;
}

.question-content {
  padding: 42px 0 30px;
}

.question-label {
  margin: 0 0 12px;
  color: var(--muted);
  font-size: 0.8rem;
  font-weight: bold;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

h2 {
  max-width: 700px;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(1.7rem, 4vw, 2.8rem);
  line-height: 1.14;
}

.antworten {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.antwort {
  display: flex;
  align-items: center;
  gap: 13px;
  min-height: 70px;
  padding: 12px 16px;
  border: 1px solid var(--line);
  background: #fff;
  color: var(--ink);
  font: inherit;
  font-size: 0.96rem;
  text-align: left;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
}

.antwort:hover:not(:disabled) {
  border-color: var(--ink);
  box-shadow: 4px 4px 0 var(--ink);
  transform: translate(-2px, -2px);
}

.antwort:focus-visible,
.weiter-button:focus-visible,
.back-link:focus-visible {
  outline: 3px solid #ffdf57;
  outline-offset: 3px;
}

.antwort:disabled {
  cursor: default;
}

.antwort-buchstabe {
  display: grid;
  flex: 0 0 32px;
  height: 32px;
  place-items: center;
  border: 1px solid #c9c9c4;
  color: var(--muted);
  font-size: 0.82rem;
  font-weight: bold;
}

.antwort-text {
  flex: 1;
}

.status-icon {
  display: grid;
  flex: 0 0 24px;
  height: 24px;
  place-items: center;
  border-radius: 50%;
  color: #fff;
  font-weight: bold;
}

.antwort.richtig {
  border-color: #279460;
  background: #e7f5eb;
}

.antwort.richtig .antwort-buchstabe,
.antwort.richtig .status-icon {
  border-color: #279460;
  background: #279460;
  color: #fff;
}

.antwort.falsch {
  border-color: var(--red);
  background: #fff0ee;
}

.antwort.falsch .antwort-buchstabe,
.antwort.falsch .status-icon {
  border-color: var(--red);
  background: var(--red);
  color: #fff;
}

.feedback {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 24px;
  padding: 16px;
  border-left: 4px solid;
}

.feedback.richtig {
  border-color: #279460;
  background: #e7f5eb;
  color: #186c46;
}

.feedback.falsch {
  border-color: var(--red);
  background: #fff0ee;
  color: #a52e2b;
}

.feedback-mark {
  display: grid;
  flex: 0 0 28px;
  height: 28px;
  place-items: center;
  border: 2px solid currentColor;
  border-radius: 50%;
  font-weight: bold;
}

.feedback strong {
  display: block;
  font-size: 0.9rem;
}

.feedback p {
  margin: 4px 0 0;
  font-size: 0.88rem;
}

.weiter-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 16px;
  padding: 15px 18px;
  border: 0;
  background: var(--ink);
  color: #fff;
  font: inherit;
  font-weight: bold;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s, padding 0.2s;
}

.weiter-button:hover {
  padding-right: 14px;
  background: var(--red);
}

.weiter-button span {
  color: #ffdf57;
  font-size: 1.3rem;
}

.quiz-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 24px 0 0;
  color: #85909d;
  font-size: 0.8rem;
}

.flag-icon {
  width: 16px;
  height: 16px;
  background: conic-gradient(#fff 25%, #222 0 50%, #fff 0 75%, #222 0);
  background-size: 8px 8px;
}

@keyframes card-in {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 620px) {
  .quiz {
    width: min(100% - 28px, 920px);
    padding-top: 30px;
  }

  .quiz-header {
    align-items: flex-start;
    flex-direction: column;
    gap: 24px;
  }

  .back-link {
    margin-bottom: 24px;
  }

  .score {
    align-self: stretch;
    display: grid;
    grid-template-columns: 1fr auto auto;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
  }

  .score strong {
    margin: 0;
  }

  .antworten {
    grid-template-columns: 1fr;
  }

  .quiz-card {
    box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.16);
  }
}

@media (prefers-reduced-motion: reduce) {
  .quiz-card,
  .antwort,
  .weiter-button {
    animation: none;
    transition: none;
  }
}
</style>