<template>
  <div class="chessboard">
    <div class="row">
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
    </div>
    <div class="row-reversed">
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
    </div>
    <div class="row">
      <div class="square">
        <div
          class="heatmap-indicator"
          v-bind:style="{ opacity: squares.a6 ? 0.25 + (0.75 * squares.a6) / played.w : 0 }"
        >
          {{ squares.a6 }}
        </div>
      </div>
      <div class="square">
        <div
          class="heatmap-indicator"
          v-bind:style="{ opacity: squares.b6 ? 0.25 + (0.75 * squares.b6) / played.w : 0 }"
        >
          {{ squares.b6 }}
        </div>
      </div>
      <div class="square">
        <div
          class="heatmap-indicator"
          v-bind:style="{ opacity: squares.c6 ? 0.25 + (0.75 * squares.c6) / played.w : 0 }"
        >
          {{ squares.c6 }}
        </div>
      </div>
      <div class="square">
        <div
          class="heatmap-indicator"
          v-bind:style="{ opacity: squares.d6 ? 0.25 + (0.75 * squares.d6) / played.w : 0 }"
        >
          {{ squares.d6 }}
        </div>
      </div>
      <div class="square">
        <div
          class="heatmap-indicator"
          v-bind:style="{ opacity: squares.e6 ? 0.25 + (0.75 * squares.e6) / played.w : 0 }"
        >
          {{ squares.e6 }}
        </div>
      </div>
      <div class="square">
        <div
          class="heatmap-indicator"
          v-bind:style="{ opacity: squares.f6 ? 0.25 + (0.75 * squares.f6) / played.w : 0 }"
        >
          {{ squares.f6 }}
        </div>
      </div>
      <div class="square">
        <div
          class="heatmap-indicator"
          v-bind:style="{ opacity: squares.g6 ? 0.25 + (0.75 * squares.g6) / played.w : 0 }"
        >
          {{ squares.g6 }}
        </div>
      </div>
      <div class="square">
        <div
          class="heatmap-indicator"
          v-bind:style="{ opacity: squares.h6 ? 0.25 + (0.75 * squares.h6) / played.w : 0 }"
        >
          {{ squares.h6 }}
        </div>
      </div>
    </div>
    <div class="row-reversed">
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
    </div>
    <div class="row">
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
    </div>
    <div class="row-reversed">
      <div class="square">
        <div
          class="heatmap-indicator"
          v-bind:style="{ opacity: squares.a3 ? 0.25 + (0.75 * squares.a3) / played.b : 0 }"
        >
          {{ squares.a3 }}
        </div>
      </div>
      <div class="square">
        <div
          class="heatmap-indicator"
          v-bind:style="{ opacity: squares.b3 ? 0.25 + (0.75 * squares.b3) / played.b : 0 }"
        >
          {{ squares.b3 }}
        </div>
      </div>
      <div class="square">
        <div
          class="heatmap-indicator"
          v-bind:style="{ opacity: squares.c3 ? 0.25 + (0.75 * squares.c3) / played.b : 0 }"
        >
          {{ squares.c3 }}
        </div>
      </div>
      <div class="square">
        <div
          class="heatmap-indicator"
          v-bind:style="{ opacity: squares.d3 ? 0.25 + (0.75 * squares.d3) / played.b : 0 }"
        >
          {{ squares.d3 }}
        </div>
      </div>
      <div class="square">
        <div
          class="heatmap-indicator"
          v-bind:style="{ opacity: squares.e3 ? 0.25 + (0.75 * squares.e3) / played.b : 0 }"
        >
          {{ squares.e3 }}
        </div>
      </div>
      <div class="square">
        <div
          class="heatmap-indicator"
          v-bind:style="{ opacity: squares.f3 ? 0.25 + (0.75 * squares.f3) / played.b : 0 }"
        >
          {{ squares.f3 }}
        </div>
      </div>
      <div class="square">
        <div
          class="heatmap-indicator"
          v-bind:style="{ opacity: squares.g3 ? 0.25 + (0.75 * squares.g3) / played.b : 0 }"
        >
          {{ squares.g3 }}
        </div>
      </div>
      <div class="square">
        <div
          class="heatmap-indicator"
          v-bind:style="{ opacity: squares.h3 ? 0.25 + (0.75 * squares.h3) / played.b : 0 }"
        >
          {{ squares.h3 }}
        </div>
      </div>
    </div>
    <div class="row">
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
    </div>
    <div class="row-reversed">
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
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
  background-color: var(--secondary-color-light);
}

.row .square:nth-child(even),
.row-reversed .square:nth-child(odd) {
  background-color:var(--secondary-color);
}

.square::before,
.square::after {
  display: flex;
  place-content: end;

  padding-inline: 0.2em;

  font-size: var(--fs--2);
  color: var(--primary-color-dark);

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

  color: var(--primary-color-light);

  background-color: var(--primary-color-dark);
}
</style>
