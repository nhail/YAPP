export enum PlayerType {
  Pig = 1 << 0,
  Chicken = 1 << 1
}

if (!Object.isFrozen(PlayerType)) {
  Object.freeze(PlayerType);
}
