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
  max?: number;
}

interface Skill {
  name: string;
  abilityName: AbilityScoreAbr;
  proficient: boolean;
  doubleProficiency: boolean | null;
  bonus?: number;
}

interface Proficiency {
  name: string;
  type: 'save' | 'language';
}

interface TextBlock {
  title?: string;
  textBlocks?: TextBlock[];
  body?: string;
}

interface Immunity {
  damageType: string;
  condition: string | null;
}

interface MovementMode {
  mode: string;
  distance: number;
}

export interface AlchemyCharacter {
  _id: string;
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
  textBlocks: TextBlock[];
  conditionImmunities: string[];
  damageImmunities: Immunity[];
  damageResistances: Immunity[];
  damageVulnerabilities: string[];
  movementModes?: MovementMode[];
  actions?: Action[];
  armorType?: string;
}

interface AlchemyData {
  characterById: AlchemyCharacter;
}

export interface AlchemyObject {
  data: AlchemyData;
}

interface Action {
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class CardService {
  character = signal<AlchemyCharacter>(gallus);
  actions = signal<Action[]>([]);

  abilityFontSize = signal<number>(20);
  mainFontSize = signal<number>(28);
  outline = signal<boolean>(false);

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

  loadFromAlchemyJSON(json: AlchemyObject | AlchemyCharacter) {
    let character: AlchemyCharacter;
    if ((json as AlchemyObject)?.data?.characterById) {
      character = (json as AlchemyObject)?.data?.characterById;
    } else {
      character = json as AlchemyCharacter;
    }

    this.character.set(character);
    if (!character.actions) {
      this.loadActions();
    } else {
      this.actions.set(character.actions);
    }
  }

  loadActions = async () => {
    const actionsQuery = {
      operationName: 'GetActionsByCharacterId',
      variables: { characterId: this.character()._id },
      query:
        'query GetActionsByCharacterId($characterId: ID) {\n  actionsByCharacterId(characterId: $characterId) {\n    actions {\n      ...ActionFields\n    }\n  }\n}\n\nfragment DiceRollFields on Damage {\n  __typename\n  customDiceId\n  dice\n  bonus\n  abilityName\n  skillName\n  type\n}\n\nfragment DicePoolActionFields on ActionStepDicePool {\n  __typename\n  customDiceId\n  ability\n  skill\n  bonus\n  numberOfDice\n  numberOfFaces\n  explode\n  successValues\n  failureValues\n  useAbilityAndSkill\n  canReroll\n  rerollValues\n}\n\nfragment SegmentedDicePoolActionFields on ActionStepDicePool {\n  __typename\n  label\n  customDiceId\n  ability\n  skill\n  bonus\n  numberOfDice\n  numberOfFaces\n  explode\n  successValues\n  failureValues\n  useAbilityAndSkill\n  canReroll\n  rerollValues\n  useTargetNumber\n  targetNumberRollOperator\n  targetNumberAttribute\n  targetNumberSkill\n  targetNumberBonus\n}\n\nfragment ActionFields on Action {\n  __typename\n  _id\n  characterId\n  sortOrder\n  name\n  description\n  iconUri\n  steps {\n    type\n    journalMessage\n    journalMessageIsMarkdown\n    journalCommand {\n      command\n      args\n    }\n    hideRollTotal\n    diceRoll {\n      ...DiceRollFields\n    }\n    attack {\n      customDiceId\n      name\n      rollsAttack\n      ability\n      skill\n      bonus\n      isProficient\n      crit\n      damageRolls {\n        ...DiceRollFields\n      }\n      isRanged\n      range\n      longRange\n      ammunitionId\n      savingThrow {\n        difficultyClass\n        abilityName\n      }\n      actionType\n      numberOfDice\n      numberOfFaces\n      omitProficiencyBonus\n    }\n    skillCheck {\n      skillName\n      rollModifier\n    }\n    rollTable {\n      tableEntries {\n        resultMin\n        resultMax\n        effect\n      }\n    }\n    sound {\n      uri\n    }\n    dicePool {\n      ...DicePoolActionFields\n    }\n    segmentedDicePool {\n      ...SegmentedDicePoolActionFields\n    }\n  }\n}',
    };
    let resp = await fetch('https://app.alchemyrpg.com/api/graphql', {
      method: 'POST',
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGViYTZlNThhODE4NTlkZDZlMzRkMWEiLCJyb2xlcyI6W10sInN1YnNjcmlwdGlvbiI6eyJ0eXBlIjoibW9udGhseSIsImVuZERhdGUiOiIyMDIzLTEwLTAxVDIwOjQxOjQ3LjAwMFoiLCJzdGFydERhdGUiOiIyMDIzLTA5LTE3VDIwOjQxOjQ3LjAwMFoiLCJpc0FjdGl2ZSI6dHJ1ZX0sImlhdCI6MTY5NTM3NzM0OH0.3a6zScjmkYUFNliAmoT-klwACTrtXSq0M2DXzJldWj0',
        Cookie:
          '_ga=GA1.2.290497252.1693592693; _ga_8YE62F7T7P=GS1.1.1693592692.1.1.1693592710.0.0.0; __stripe_mid=a3a624d4-3f32-403e-8b65-36063e6c9b09d4df35; __stripe_sid=6dd3a1cb-acd8-494a-8d52-87b243e2683c7b3ba0',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(actionsQuery),
    });
    try {
      const {
        data: {
          actionsByCharacterId: { actions: gotActions },
        },
      } = await resp.json();
      this.actions.set(gotActions ?? []);
    } catch (err) {
      console.error(err);
    }
  };
}
