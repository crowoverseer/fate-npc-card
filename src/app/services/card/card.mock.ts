import { AbilityScoreAbr, AlchemyCharacter } from './card.service';

export const gallus: AlchemyCharacter = {
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
  senses: [],
  skills: [
    {
      name: 'Acrobatics',
      abilityName: 'dex' as AbilityScoreAbr,
      proficient: false,
      doubleProficiency: null,
    },
    {
      name: 'Animal Handling',
      abilityName: 'wis' as AbilityScoreAbr,
      proficient: false,
      doubleProficiency: null,
    },
    {
      name: 'Arcana',
      abilityName: 'int' as AbilityScoreAbr,
      proficient: false,
      doubleProficiency: null,
    },
    {
      name: 'Athletics',
      abilityName: 'str' as AbilityScoreAbr,
      proficient: false,
      doubleProficiency: null,
    },
    {
      name: 'Deception',
      abilityName: 'cha' as AbilityScoreAbr,
      proficient: false,
      doubleProficiency: null,
    },
    {
      name: 'History',
      abilityName: 'int' as AbilityScoreAbr,
      proficient: false,
      doubleProficiency: null,
    },
    {
      name: 'Insight',
      abilityName: 'wis' as AbilityScoreAbr,
      proficient: true,
      doubleProficiency: null,
    },
    {
      name: 'Intimidation',
      abilityName: 'cha' as AbilityScoreAbr,
      proficient: false,
      doubleProficiency: null,
    },
    {
      name: 'Investigation',
      abilityName: 'int' as AbilityScoreAbr,
      proficient: false,
      doubleProficiency: null,
    },
    {
      name: 'Medicine',
      abilityName: 'wis' as AbilityScoreAbr,
      proficient: true,
      doubleProficiency: null,
    },
    {
      name: 'Nature',
      abilityName: 'int' as AbilityScoreAbr,
      proficient: true,
      doubleProficiency: null,
    },
    {
      name: 'Perception',
      abilityName: 'wis' as AbilityScoreAbr,
      proficient: true,
      doubleProficiency: null,
    },
    {
      name: 'Performance',
      abilityName: 'cha' as AbilityScoreAbr,
      proficient: false,
      doubleProficiency: null,
    },
    {
      name: 'Persuasion',
      abilityName: 'cha' as AbilityScoreAbr,
      proficient: false,
      doubleProficiency: null,
    },
    {
      name: 'Religion',
      abilityName: 'int' as AbilityScoreAbr,
      proficient: false,
      doubleProficiency: null,
    },
    {
      name: 'Sleight of Hand',
      abilityName: 'dex' as AbilityScoreAbr,
      proficient: false,
      doubleProficiency: null,
    },
    {
      name: 'Stealth',
      abilityName: 'dex' as AbilityScoreAbr,
      proficient: false,
      doubleProficiency: null,
    },
    {
      name: 'Survival',
      abilityName: 'wis' as AbilityScoreAbr,
      proficient: false,
      doubleProficiency: null,
    },
  ],
  proficiencyBonus: 2,
  proficiencies: [
    {
      name: 'Wisdom',
      type: 'save',
    },
    {
      name: 'Ignan',
      type: 'language',
    },
  ],
};
