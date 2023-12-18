function newProblem() {
  const randNum = (ceil, floor=1) => floor + Math.trunc(Math.random()*(ceil-floor+1))
  const newNum = () => randNum(10, -10)
  const ops = ["++", "--", "×*", "÷/"].map(s => ({math: s[1], friendly: s[0]}))
  const ret = {
    a: newNum(),
    b: newNum(),
    op: ops[randNum(ops.length)-1]
  }
  if (ret.op === ops[3]) {
    while (ret.b === 0) ret.b = newNum()
    ret.a = ret.b * ret.a
  }
  ret.answer = eval(`${ret.a} ${ret.op.math} ${ret.b}`)
  return ret
}

function sound(src) {
  const el = new Audio(src)
  return () => { el.currentTime = 0; el.play() }
}
const sounds = {
  correct: sound("https://cdn.jsdelivr.net/npm/ion-sound@3.0.7/sounds/beer_can_opening.mp3"),
  incorrect: sound("https://cdn.jsdelivr.net/npm/ion-sound@3.0.7/sounds/metal_plate.mp3"),
  lightBulbBreaking: sound("https://cdn.jsdelivr.net/npm/ion-sound@3.0.7/sounds/light_bulb_breaking.mp3"),
}


new Vue({
  el: "#app",
  data: {
    problem: null,
    guess: "",
    startTime: null,
  },
  methods: {
    newRound() {
      this.problem = newProblem()
      this.startTime = Date.now()
      this.guess = ""
    },
    onGuessEnter() {
      const ans = Number(this.guess)
      if (ans === this.problem.answer) {        
        this.newRound()
        sounds.correct()
      } else {
        sounds.incorrect()
      }
    },
    onOutOfTime() {
      sounds.lightBulbBreaking()
    }
  },
  mounted() {
    this.newRound()
  },
})


Vue.component("simple-timer", {
  props: ['startTime', 'endTime'],
  methods: {
    getWidth() {
      const now = Date.now()
      if (!this.startTime || !this.endTime) return 0
      if (now >= this.endTime) return 100
      if (now < this.startTime) return 0
      return (now - this.startTime) / (this.endTime - this.startTime) * 100
    },
  },
  mounted() {
    setInterval(() => {
      this.$forceUpdate()
      if (this.getWidth()===100) {
        this.$emit('done')
        this.$emit('input', null)        
      }
    }, 50)
  },
  template: `
    <div class="progress">
      <div class="progress-bar" role="progressbar" style="transition-duration: 0.1s" :style="{width: getWidth()+'%'}"></div>
    </div>`,
	})