export enum Direction {
  Stop,
  Right,
  Left,
}
export enum Intersection {
  None,
  Left,
  Up,
  Right,
  Down,
} // 0,1,2,3,4
export enum Color {
  Black,
  Red,
  Yellow,
  Green,
  Blue,
  Purple,
}
export enum Information {
  BlockIsDestroyed = "BlockIsDestroyed",
  BallIsLost = "BallIsLost",
  HitOnBlock = "HitOnBlock",
  Clear = "Clear",
}
export type InformationKey = keyof typeof Information;
