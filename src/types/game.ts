export type Rarity = 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';

export interface CharacterAttributes {
  mind: number;
  speed: number;
  strength: number;
  dribbling: number;
  kick: number;
}

export interface CharacterCard {
  id: string;
  number: string;
  name: string;
  position: string;
  universe: 'Blue Lock';
  rarity: Rarity;
  portrait: string | null;
  assetPath: string;
  power: number;
  attributes: CharacterAttributes;
  signatureWeapon: string;
  description: string;
  specialAbility: string;
}

export type PlayerId = 1 | 2;

export type SlotIndex = 0 | 1 | 2 | 3 | 4;

export type PlayerSlots = [
  CharacterCard | null,
  CharacterCard | null,
  CharacterCard | null,
  CharacterCard | null,
  CharacterCard | null,
];

export type GamePhase =
  | 'TITLE'
  | 'SHUFFLING'
  | 'AWAITING_DRAW'
  | 'DRAWING_REVEAL'
  | 'INSPECT_AND_PLACE'
  | 'MATCH_COMPLETE';

export type CardSide = 'front' | 'back';

export interface MatchResult {
  playerOnePower: number;
  playerTwoPower: number;
  winner: PlayerId | 'DRAW';
  powerDifference: number;
}
