export interface Model {
  show: boolean;
  value: number;
  bufferValue: number;
  mode: LoadingMode;
}

export enum LoadingMode {
  determinate = 'determinate',
  indeterminate = 'indeterminate',
  buffer = 'buffer',
  query = 'query'
}

export interface AppState {
  loadingBar: Model;
}
