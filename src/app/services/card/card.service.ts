import { Injectable, signal } from '@angular/core';

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

interface AlchemyCharacter {
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
}

interface AlchemyData {
  characterById: AlchemyCharacter;
}

interface AlchemyObject {
  data: AlchemyData;
}

@Injectable({
  providedIn: 'root',
})
export class CardService {
  character = signal<AlchemyCharacter>({
    imageUri:
      'https://cdn.alchemyrpg.com/users/6003d6b6708dcf0008912a72/characters/08086a8d-aad1-4e86-849a-2f9eeb9ec31d/l1irviki.jpg',
    name: 'Gallus Druid',
    challengeRating: '4',
    size: 'Medium',
    type: 'Humanoid',
    typeTags: ['Gallus'],
    alignment: 'Any Neutral',
    abilityScores: [
      {
        name: 'str' as AbilityScoreAbr,
        value: 12,
      },
      {
        name: 'dex' as AbilityScoreAbr,
        value: 13,
      },
      {
        name: 'con' as AbilityScoreAbr,
        value: 14,
      },
      {
        name: 'int' as AbilityScoreAbr,
        value: 10,
      },
      {
        name: 'wis' as AbilityScoreAbr,
        value: 18,
      },
      {
        name: 'cha' as AbilityScoreAbr,
        value: 10,
      },
    ],
    trackers: [
      {
        name: 'XP',
        value: 1100,
        category: 'experience',
      },
      {
        name: 'HP',
        value: 65,
        category: 'health',
      },
    ],
    speed: 30,
    armorClass: 11,
    hitDice: '10d8+20',
  });

  getAbilityScore = (scoreName: string): number =>
    this.character().abilityScores.find((score) => score.name === scoreName)
      ?.value ?? 10;

  getAbilityBonusByScore = (score = 10) => Math.floor((score - 10) / 2);

  /*
   * Adds a "+" and "-" symbols
   */
  getAbilityBonusByScoreString = (scoreName: string): string => {
    const score = this.getAbilityBonusByScore(this.getAbilityScore(scoreName));
    return `${score >= 0 ? '+' : '-'}${score}`;
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
