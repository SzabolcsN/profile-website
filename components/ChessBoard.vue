<script setup lang="ts">
import { TheChessboard, type BoardApi } from 'vue3-chessboard';
import { Engine } from '~/helpers/engine';
import 'vue3-chessboard/style.css';
import movePreferences from '~/public/move_preferences.json';

let boardAPI: BoardApi | undefined;
let engine: Engine | undefined;

function handleBoardCreated(boardApi: BoardApi) {
  boardAPI = boardApi;

  engine = new Engine(boardApi, movePreferences);
}

function handleMove() {
  const history = boardAPI?.getHistory(true);

  const moves = history?.map((move) => {
    if (typeof move === 'object') {
      return move.lan;
    } else {
      return move;
    }
  });

  if (moves) {
    engine?.sendPosition(moves.join(' '));
  }
}
</script>

<template>
  <Container>
    <div class="flex flex-col gap-3 mx-auto max-w-4xl mt-12">
      <h2 class="font-bold text-3xl text-gray-800 text-center">
        Play a chess game against "me"
      </h2>
      <p class="text-lg leading-relaxed text-slate-500 text-center">
        This bot is trained on data from my previous games, enabling it to play in a style similar to mine
      </p>
    </div>
    <div class="flex flex-col items-center space-y-6">
      <TheChessboard @board-created="handleBoardCreated" @move="handleMove" :player-color="'white'" />
      <div class="flex space-x-4">
        <Button @click="boardAPI?.toggleOrientation()">
          Flip board
        </Button>
        <Button @click="boardAPI?.resetBoard()">Reset</Button>
      </div>
    </div>
  </Container>
</template>