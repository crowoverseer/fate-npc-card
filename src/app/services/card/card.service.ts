import { Injectable, signal } from '@angular/core';
import { gallus } from './card.mock';

export enum AbilityScoreAbr {
  Str = 'str',
  Dex = 'dex',
  Con = 'con',
  Wis = 'wis',
  Int = 'int',
  Cha = 'cha',
}

interface AbilityScore {
  name: AbilityScoreAbr;
  value: number;
}

interface Tracker {
  name: string;
  value: number;
  category: string;
}

interface Skill {
  name: string;
  abilityName: AbilityScoreAbr;
  proficient: boolean;
  doubleProficiency: boolean | null;
}

interface Proficiency {
  name: string;
  type: 'save' | 'language';
}

export interface AlchemyCharacter {
  imageUri?: string;
  name: string;
  challengeRating: string;
  size?: string;
  type?: string;
  typeTags?: string[];
  alignment?: string;
  abilityScores: AbilityScore[];
  armorClass: number;
  speed: number;
  trackers: Tracker[];
  hitDice?: string;
  senses: string[];
  skills: Skill[];
  proficiencyBonus: number;
  proficiencies: Proficiency[];
}

interface AlchemyData {
  characterById: AlchemyCharacter;
}

export interface AlchemyObject {
  data: AlchemyData;
}

@Injectable({
  providedIn: 'root',
})
export class CardService {
  character = signal<AlchemyCharacter>(gallus);

  getAbilityScore = (scoreName: string): number =>
    this.character().abilityScores.find((score) => score.name === scoreName)
      ?.value ?? 10;

  getAbilityBonusByScore = (score = 10) => Math.floor((score - 10) / 2);

  /*
   * Adds a "+" and "-" symbols
   */
  getAbilityBonusByScoreString = (scoreName: string): string => {
    const score = this.getAbilityBonusByScore(this.getAbilityScore(scoreName));
    return `${score >= 0 ? '+' : ''}${score}`;
  };

  getTracker = (name: string): number =>
    this.character().trackers.find((tracker) => tracker.name === name)?.value ??
    0;

  loadFromAlchemyJSON(json: AlchemyObject) {
    const {
      data: { characterById: character },
    } = json;

    this.character.set(character);
  }
}
