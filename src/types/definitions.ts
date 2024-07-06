export interface Position {
  x: number;
  y: number;
  id: string;
}

export interface Segment extends Position {
  isHead: boolean;
}

export interface Score {
  name: string;
  score: number;
  id: string;
}

export enum FoodType {
  SMALL = 1,
  MEDIUM = 5,
  LARGE = 10,
}
