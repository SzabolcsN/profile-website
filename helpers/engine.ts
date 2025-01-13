import { type BoardApi } from 'vue3-chessboard';
import { type SquareKey } from 'vue3-chessboard';

export class Engine {
  private stockfish: Worker | undefined;
  private boardApi: BoardApi | undefined;
  public bestMove: string | null = null;
  public engineName: string | null = null;
  private movePreferences: Record<string, any>;

  constructor(boardApi: BoardApi, movePreferences: Record<string, any>) {
    this.boardApi = boardApi;
    this.movePreferences = movePreferences;

    const wasmSupported =
      typeof WebAssembly === 'object' &&
      WebAssembly.validate(
        Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00),
      );

    this.stockfish = new Worker(
      wasmSupported ? 'stockfish.wasm.js' : 'stockfish.js',
    );

    this.setupListeners();
    this.stockfish.postMessage('uci');
  }

  private setupListeners(): void {
    if (!this.stockfish) return;

    this.stockfish.addEventListener('message', (event: MessageEvent) =>
      this.handleEngineStdout(event),
    );

    this.stockfish.addEventListener('error', (err) => console.error('Stockfish error:', err));

    this.stockfish.addEventListener('messageerror', (err) =>
      console.error('Message error:', err),
    );
  }

  private handleEngineStdout(event: MessageEvent<unknown>): void {
    const message = event.data;
    if (typeof message !== 'string') return;

    const uciStringSplitted = message.split(' ');

    if (uciStringSplitted[0] === 'uciok') {
      this.setOption('UCI_AnalyseMode', 'true');
      this.setOption('Analysis Contempt', 'Off');

      this.stockfish?.postMessage('ucinewgame');
      this.stockfish?.postMessage('isready');
      return;
    }

    if (uciStringSplitted[0] === 'readyok') {
      this.stockfish?.postMessage('go movetime 1500');
      return;
    }

    if (uciStringSplitted[0] === 'bestmove' && uciStringSplitted[1]) {
      const rawMove = uciStringSplitted[1];

      const currentFen = this.boardApi?.getFen() || '';
      const preferredMove = this.getPreferredMove(currentFen, rawMove);

      if (preferredMove !== this.bestMove) {
        this.bestMove = preferredMove;
        if (this.boardApi?.getTurnColor() === 'black') {
          this.boardApi.move({
            from: this.bestMove.slice(0, 2) as SquareKey,
            to: this.bestMove.slice(2, 4) as SquareKey,
          });
        }
      }
    }
  }

  private setOption(name: string, value: string): void {
    if (!this.stockfish) return;
    this.stockfish.postMessage(`setoption name ${name} value ${value}`);
  }

  public sendPosition(position: string): void {
    if (!this.stockfish) return;
    this.stockfish.postMessage(`position startpos moves ${position}`);
    this.stockfish.postMessage('go movetime 2000');
  }

  private getPreferredMove(fen: string, stockfishMove: string): string {
    const habits = this.movePreferences[fen];
    if (habits && habits.frequency > 0) {
      return habits.move || stockfishMove;
    }
    return stockfishMove;
  }
}
