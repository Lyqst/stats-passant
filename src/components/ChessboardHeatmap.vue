<template>
  <div class="chessboard">
    <div v-for="row in 8" :key="row" :class="row % 2 === 1 ? 'row' : 'row-reversed'">
      <div v-for="col in ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']" :key="col + row" class="square">
        <div
          v-if="(row === 3 || row === 6) && squares[col + row]"
          class="heatmap-indicator"
          v-bind:style="{ opacity: 0.5 + 0.5 * Math.pow((squares[col + row]) / Math.max(...Object.values(squares)), 2)}"
        >
          {{ squares[col + row] }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['squares', 'played']
}
</script>

<style>
.chessboard {
  counter-reset: rank 9 file;

  display: grid;

  aspect-ratio: 1;
  max-height: 70vh;
  margin-inline: auto;

  box-shadow: 0 0.125em 0.3125em rgba(0, 0, 0, 0.1);
}

.row,
.row-reversed {
  counter-increment: rank -1;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
}

.square {
  position: relative;
  display: grid;
  aspect-ratio: 1;
  width: 100%;
}

.row .square:nth-child(odd),
.row-reversed .square:nth-child(even) {
  color: var(--neutral-color-dark);
  background-color: var(--chessboard-light-color);
}

.row .square:nth-child(even),
.row-reversed .square:nth-child(odd) {
  color: var(--neutral-color-light);
  background-color: var(--chessboard-dark-color);
}

.square::before,
.square::after {
  display: flex;
  place-content: end;

  padding-inline: 0.2em;

  font-size: var(--fs--2);
  font-weight: 700;
  color: inherit;

  opacity: 0.3;
}
.square:last-child::before {
  content: counter(rank);
}

.row-reversed:last-child .square {
  counter-increment: file;
}

.row-reversed:last-child .square::after {
  content: counter(file, lower-alpha);
  flex-direction: column;
}

.heatmap-indicator {
  position: absolute;
  inset: 0;

  display: grid;
  place-items: center;

  font-weight: 700;
  color: var(--win-color);

  background-color: var(--win-color-light);
}
</style>
