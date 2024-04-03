<template>
  <header>
    <h1>
      <v-icon name="bi-arrow-down-square-fill" />
      Stats
      <v-icon name="bi-arrow-up-left-square-fill" />
      Passant
    </h1>
    <div class="quote">
      <span>He left it en prise and I took it <b>en passant</b>.</span>
      <span>J. H. Blackburne</span>
    </div>
  </header>
  <main>
    <section class="initial-form">
      <div class="form-group hideable" :class="{ hidden: loading || loaded }">
        <label> Username </label>
        <input type="text" v-model="user" placeholder="username" />
        <label> Site </label>
        <div class="site-select" :class="{ 'login-show': site == 'Lichess' }">
          <div class="button-group">
            <button :class="{ selected: site === 'Lichess' }" @click="site = 'Lichess'">
              Lichess
            </button>
            <button :class="{ selected: site === 'Chess.com' }" @click="site = 'Chess.com'">
              Chess.com
            </button>
          </div>
          <div class="lichess-login">
            <template v-if="!accessContent">
              <a href="#" @click="loginLichess()">Login to Lichess</a>
              <span class="log-info">
                <v-icon name="md-info" fill="var(--text-accent-color)" />
                Speeds up game loading
              </span>
            </template>
            <div v-else class="log-info"><v-icon name="md-info" fill="var(--text-accent-color)" /> Logged in</div>
          </div>
        </div>
      </div>
      <div class="form-footer hideable" :class="{ hidden: !user || !site }">
        <button
          @click="loadGames()"
          class="load-button"
          :class="{ loading: loading, loaded: loaded }"
          :disabled="loading || loaded"
        >
          {{ loadButtonText }}
        </button>
        <button v-if="loaded" class="reset-button" @click="reset()">
          <v-icon name="hi-solid-backspace" />
        </button>
      </div>
    </section>
    <section class="stats hideable" :class="{ hidden: totalPlayed == 0 }">
      <h2>Stats</h2>
      <div class="pawns">
        <v-icon
          name="fa-chess-pawn"
          fill="var(--text-accent-color)"
          v-for="n in totalPlayed"
          :key="n"
        />
      </div>
      <div class="basic-stats">
        <p>
          <v-icon name="bi-arrow-right-square-fill" fill="var(--text-accent-color)" />
          <b>{{ user }}</b> has played en passant <b>{{ totalPlayed }}</b> times out of a possible
          <b>{{ totalOpp }}</b> ({{ ((100 * totalPlayed) / totalOpp).toFixed(2) }}%), or once every
          <b>{{ (processedGames / totalPlayed).toFixed(0) }}</b> games.
        </p>
        <p v-if="opportunities.w">
          <v-icon name="bi-arrow-right-square-fill" fill="var(--text-accent-color)" />
          <b>{{ played.w }}</b> out of <b>{{ opportunities.w }}</b> ({{
            ((100 * played.w) / opportunities.w).toFixed(2)
          }}%) with white.
        </p>
        <p v-if="opportunities.b">
          <v-icon name="bi-arrow-right-square-fill" fill="var(--text-accent-color)" />
          <b>{{ played.b }}</b> out of <b>{{ opportunities.b }}</b> ({{
            ((100 * played.b) / opportunities.b).toFixed(2)
          }}%) with black.
        </p>
        <p>
          <v-icon name="bi-arrow-right-square-fill" fill="var(--text-accent-color)" />
          Earliest en passant:
          <a :href="earliest.link" target="_blank"
            >move {{ earliest.move }}<v-icon name="fa-external-link-square-alt"
          /></a>
        </p>
        <p>
          <v-icon name="bi-arrow-right-square-fill" fill="var(--text-accent-color)" />
          Latest en passant:
          <a :href="latest.link" target="_blank"
            >move {{ latest.move }}<v-icon name="fa-external-link-square-alt"
          /></a>
        </p>
        <p v-if="checkmates.length > 0">
          <v-icon name="bi-arrow-right-square-fill" fill="var(--text-accent-color)" />
          <b>{{ checkmates.length }} en passant checkmates! </b
          ><a v-for="(link, index) in checkmates" :key="index" :href="link" target="_blank"
            >[{{ index + 1 }}<v-icon name="fa-external-link-square-alt" />]</a
          >
        </p>
      </div>
    </section>
    <section class="result-charts hideable" :class="{ hidden: totalPlayed == 0 }">
      <h2>Game Results</h2>
      <p>
        <v-icon name="bi-arrow-right-square-fill" fill="var(--text-accent-color)" />Games where
        <b>{{ user }}</b> played en passant at least once ({{
          results.enPassant.w.total + results.enPassant.b.total
        }}).
      </p>
      <div class="chart-container">
        <Bar :data="chartData('enPassant')" :options="chartOptions" />
      </div>
      <p>
        <v-icon name="bi-arrow-right-square-fill" fill="var(--text-accent-color)" />Games where
        <b>{{ user }}</b> never played en passant ({{
          results.noEnPassant.w.total + results.noEnPassant.b.total
        }}).
      </p>
      <div class="chart-container">
        <Bar :data="chartData('noEnPassant')" :options="chartOptions" />
      </div>
    </section>
    <section class="heatmap-container hideable" :class="{ hidden: totalPlayed == 0 }">
      <h2>Heatmap</h2>
      <ChessboardHeatmap :squares="squares" :played="played"></ChessboardHeatmap>
    </section>
    <section class="hideable" :class="{ hidden: totalPlayed != 0 || !loaded }">
      <b>Holy hell!</b> It looks like <b>{{ user }}</b> has never played en passant!!
    </section>
  </main>
  <aside class="links">
    <div class="links-title">
      <span
        ><v-icon name="bi-arrow-right-square-fill" fill="var(--text-accent-color)" />Made by
        <b>Lyqst</b></span
      >
    </div>
    <ul class="links-list">
      <li><a href="https://github.com/Lyqst">Github</a></li>
      <li><a href="https://lichess.org/@/lyqst">Lichess</a></li>
      <li><a href="https://www.chess.com/member/lyqst">Chess.com</a></li>
      <li><a href="https://www.twitch.com/lyqst/">Twitch.tv</a></li>
    </ul>
  </aside>
</template>

<script>
import { Chess } from 'chess.js'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import ChessboardHeatmap from '../components/ChessboardHeatmap.vue'
import ChessWebAPI from 'chess-web-api'
import { parse as parsePgn } from '@mliebelt/pgn-parser'
import { OAuth2AuthCodePKCE } from '@bity/oauth2-auth-code-pkce'

const chessAPI = new ChessWebAPI({ queue: true })

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ChartDataLabels)

ChartJS.defaults.font.family = 'Lato'

export default {
  components: {
    Bar,
    ChessboardHeatmap
  },
  data() {
    return {
      user: '',
      site: '',
      loading: false,
      loaded: false,
      chessComArchives: 0,
      chessComArchivesDone: 0,
      processedGames: 0,
      opportunities: { w: 0, b: 0 },
      played: { w: 0, b: 0 },
      checkmates: [],
      earliest: { move: 0, link: '' },
      latest: { move: 0, link: '' },
      results: {
        enPassant: { w: { w: 0, d: 0, l: 0, total: 0 }, b: { w: 0, d: 0, l: 0, total: 0 } },
        noEnPassant: { w: { w: 0, d: 0, l: 0, total: 0 }, b: { w: 0, d: 0, l: 0, total: 0 } }
      },
      squares: {
        a6: 0,
        b6: 0,
        c6: 0,
        d6: 0,
        e6: 0,
        f6: 0,
        g6: 0,
        h6: 0,
        a3: 0,
        b3: 0,
        c3: 0,
        d3: 0,
        e3: 0,
        f3: 0,
        g3: 0,
        h3: 0
      },
      chartOptions: {
        indexAxis: 'y',
        scales: {
          x: { stacked: true, min: 0, max: 100, display: false },
          y: { stacked: true }
        },
        responsive: true,
        mantainAspectRatio: false,
        animation: { duration: 150 },
        plugins: {
          datalabels: {
            diplay: 'auto',
            formatter: function (value) {
              if (!value || value < 5) return ''
              return value.toFixed(0) + '%'
            }
          },
          tooltip: {
            enabled: false
          },
          legend: {
            onClick: null
          }
        }
      },
      oauth: new OAuth2AuthCodePKCE({
        authorizationUrl: 'https://lichess.org/oauth',
        tokenUrl: 'https://lichess.org/api/token',
        clientId: 'stats-passant',
        scopes: [],
        redirectUrl: (() => {
          const url = new URL(location.href)
          url.search = ''
          return url.href
        })(),
        onAccessTokenExpiry: (refreshAccessToken) => refreshAccessToken()
      }),
      accessContent: ''
    }
  },
  computed: {
    loadButtonText() {
      if (!this.loading && !this.loaded) return 'Go!'
      else if (this.loading) return `Loading games for ${this.user}... (${this.processedGames})`
      else return `Loaded ${this.processedGames} games for ${this.user}!`
    },
    totalOpp() {
      return this.opportunities.w + this.opportunities.b
    },
    totalPlayed() {
      return this.played.w + this.played.b
    },
    resultsAsPercentages() {
      return {
        enPassant: {
          w: {}
        }
      }
    }
  },
  methods: {
    async loginLichess() {
      sessionStorage.setItem('username', this.user)
      await this.oauth.fetchAuthorizationCode()
    },

    loadGames() {
      this.loading = true
      if (this.site === 'Lichess') this.loadLichessGames()
      else if (this.site === 'Chess.com') this.loadChessComGames()
    },

    loadLichessGames() {
      let fetch = window.fetch

      if (this.accessContent) {
        fetch = this.oauth.decorateFetchHTTPClient(window.fetch)
      }

      const stream = fetch(`https://lichess.org/api/games/user/${this.user}`, {
        headers: { Accept: 'application/x-ndjson' }
      })

      stream
        .then((response) => {
          const stream = response.body.getReader()
          const matcher = /\r?\n/
          const decoder = new TextDecoder()
          let buf = ''

          const loop = () =>
            stream.read().then(({ done, value }) => {
              if (!done) {
                const chunk = decoder.decode(value, {
                  stream: true
                })
                buf += chunk

                const parts = buf.split(matcher)
                buf = parts.pop()
                for (const i of parts.filter((p) => p)) this.processLichessGame(JSON.parse(i))
                return loop()
              }
            })

          return loop()
        })
        .then(() => {
          this.loading = false
          this.loaded = true
        })
    },

    loadChessComGames() {
      chessAPI.getPlayerMonthlyArchives(this.user).then((response) => {
        let archives = response.body.archives
        this.chessComArchives = archives.length
        archives.forEach((url) => {
          const urlParts = url.split('/')
          const month = urlParts.pop()
          const year = urlParts.pop()

          chessAPI.dispatch(chessAPI.getPlayerCompleteMonthlyArchives, this.processChessComGames, [
            this.user,
            year,
            month
          ])
        })
      })
    },

    processChessComGames(response) {
      response.body.games.forEach((game) => {
        if (
          game.rules != 'chess' ||
          game.initial_setup != 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
        )
          return
        const [parsedPgn] = parsePgn(game.pgn)
        const moves = parsedPgn.moves.map((move) => move.notation.notation)
        const side = game.white.username.toLowerCase() === this.user.toLowerCase() ? 'w' : 'b'
        const result =
          parsedPgn.tags.Result === '1/2-1/2'
            ? 'd'
            : (parsedPgn.tags.Result === '1-0' && side === 'w') ||
              (parsedPgn.tags.Result === '0-1' && side === 'b')
            ? 'w'
            : 'l'
        const url = game.url
        this.processGame(moves, side, result, url)
      })
      this.chessComArchivesDone++
      if (this.chessComArchivesDone == this.chessComArchives) {
        this.loading = false
        this.loaded = true
      }
    },

    processLichessGame(game) {
      if (
        game.status === 'noStart' ||
        !game.moves ||
        game.variant != 'standard' ||
        !game.players.white.user ||
        !game.players.black.user
      )
        return

      const moves = game.moves.split(' ')
      const side =
        game.players.white.user.name.toLowerCase() === this.user.toLowerCase() ? 'w' : 'b'
      const result = !game.winner ? 'd' : game.winner.charAt(0) === side ? 'w' : 'l'
      const url = 'https://lichess.org/' + game.id
      this.processGame(moves, side, result, url)
    },

    processGame(moves, side, result, url) {
      const chess = new Chess()

      const oppRegex = new RegExp('^[a-h]' + (side === 'w' ? '5' : '4'))

      let enPassantSquare = ''
      let opp = 0
      let played = 0
      let moveNumber = 0

      moves.forEach((move) => {
        let enPassant = false
        moveNumber++

        if (chess.turn() === side && enPassantSquare) {
          const regex = new RegExp('^[a-h][x]' + enPassantSquare)
          if (move.match(regex)) {
            played++
            this.squares[enPassantSquare]++
            enPassant = true
          }

          enPassantSquare = ''
        }

        chess.move(move)

        if (enPassant) {
          if (chess.isCheckmate())
            this.checkmates.push(this.site === 'Lichess' ? url + '/#' + move.length : url)
          if (!this.earliest.move || Math.floor((moveNumber + 1) / 2) < this.earliest.move) {
            this.earliest.move = Math.floor((moveNumber + 1) / 2)
            this.earliest.link = this.site === 'Lichess' ? url + '/#' + moveNumber : url
          }
          if (!this.latest.move || Math.floor((moveNumber + 1) / 2) > this.latest.move) {
            this.latest.move = Math.floor((moveNumber + 1) / 2)
            this.latest.link = this.site === 'Lichess' ? url + '/#' + moveNumber : url
          }
        }

        if (chess.turn() === side && move.match(oppRegex)) {
          const fen = chess.fen()
          const fenParts = fen.split(' ')
          const enPassant = fenParts[3]

          if (enPassant != '-') {
            opp++
            enPassantSquare = enPassant
          }
        }
      })

      this.opportunities[side] += opp
      this.played[side] += played

      this.results[played > 0 ? 'enPassant' : 'noEnPassant'][side][result]++
      this.results[played > 0 ? 'enPassant' : 'noEnPassant'][side].total++

      this.processedGames++
    },
    reset() {
      ;(this.loading = false),
        (this.loaded = false),
        (this.user = ''),
        (this.site = ''),
        (this.processedGames = 0),
        (this.opportunities = { w: 0, b: 0 }),
        (this.played = { w: 0, b: 0 }),
        (this.checkmates = []),
        (this.results = {
          enPassant: { w: { w: 0, d: 0, l: 0, total: 0 }, b: { w: 0, d: 0, l: 0, total: 0 } },
          noEnPassant: { w: { w: 0, d: 0, l: 0, total: 0 }, b: { w: 0, d: 0, l: 0, total: 0 } }
        }),
        (this.squares = {
          a6: 0,
          b6: 0,
          c6: 0,
          d6: 0,
          e6: 0,
          f6: 0,
          g6: 0,
          h6: 0,
          a3: 0,
          b3: 0,
          c3: 0,
          d3: 0,
          e3: 0,
          f3: 0,
          g3: 0,
          h3: 0
        })
    },
    chartData(subset) {
      const resultsWhite = this.results[subset].w
      const resultsBlack = this.results[subset].b
      var style = getComputedStyle(document.body)
      const winClr = style.getPropertyValue('--win-color')
      const winClrLight = style.getPropertyValue('--win-color-light')
      const drawClr = style.getPropertyValue('--draw-color')
      const drawClrLight = style.getPropertyValue('--draw-color-light')
      const lossClr = style.getPropertyValue('--loss-color')
      const lossClrLight = style.getPropertyValue('--loss-color-light')

      return {
        labels: ['As white', 'As black', 'Overall'],
        datasets: [
          {
            label: 'Win',
            backgroundColor: winClrLight,
            datalabels: { color: winClr },
            data: [
              (100 * resultsWhite.w) / resultsWhite.total,
              (100 * resultsBlack.w) / resultsBlack.total,
              (100 * (resultsWhite.w + resultsBlack.w)) / (resultsWhite.total + resultsBlack.total)
            ]
          },
          {
            label: 'Draw',
            backgroundColor: drawClrLight,
            datalabels: { color: drawClr },
            data: [
              (100 * resultsWhite.d) / resultsWhite.total,
              (100 * resultsBlack.d) / resultsBlack.total,
              (100 * (resultsWhite.d + resultsBlack.d)) / (resultsWhite.total + resultsBlack.total)
            ]
          },
          {
            label: 'Loss',
            backgroundColor: lossClrLight,
            datalabels: { color: lossClr },
            data: [
              (100 * resultsWhite.l) / resultsWhite.total,
              (100 * resultsBlack.l) / resultsBlack.total,
              (100 * (resultsWhite.l + resultsBlack.l)) / (resultsWhite.total + resultsBlack.total)
            ]
          }
        ]
      }
    }
  },
  beforeMount() {
    this.oauth.isReturningFromAuthServer().then((hasAuthCode) => {
      this.site = 'Lichess'
      this.user = sessionStorage.getItem('username')
      sessionStorage.removeItem('username')
      if (!hasAuthCode) return
      this.oauth.getAccessToken().then((token) => {
        this.accessContent = token
      })
    })
  }
}
</script>
