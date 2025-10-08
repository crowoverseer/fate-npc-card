import { AbilityScoreAbr, AlchemyCharacter } from './card.service';

export const gallus: AlchemyCharacter = {
  _id: '6227f6b541524f9720020336',
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
    {
      name: 'Birdfolk',
      type: 'language',
    },
    {
      name: 'Druidic',
      type: 'language',
    },
    {
      name: 'Sylvan',
      type: 'language',
    },
    {
      name: 'Can also understand Auran, but cannot speak it',
      type: 'language',
    },
  ],
  textBlocks: [
    {
      textBlocks: [],
      title: 'Class Features',
    },
    {
      textBlocks: [],
      title: 'Racial Traits',
    },
    {
      textBlocks: [],
      title: 'Feats',
    },
    {
      textBlocks: [
        {
          body: 'When falling at least 10 feet, the druid can spend a reaction to fly up to their speed in one direction as they descend. They land in an unoccupied space at the end of their movement, and take no falling damage. They cannot glide while carrying heavy objects, heavy weapons, or shields (though they can drop any held items as part of their reaction).',
          title: 'Glide',
        },
        {
          body: 'As a bonus action, the druid can use their powerful feathered arms to propel themselves upward up to half their movement speed. The druid can use it in conjunction with a regular jump, but not while gliding.  ',
          title: 'Wing Flap',
        },
        {
          body: 'The druid can communicate simple ideas to living plants, and is able to interpret their responses in simple language.',
          title: 'Seedspeech',
        },
        {
          body: 'The druid is a 6th-level spellcaster. Their spellcasting ability is Wisdom (spell save DC 14, +6 to hit with spell attacks). The druid has the following spells prepared:\n\nCantrips (at will): druidcraft, produce flame, shillelagh\n\n1st level (4 slots): animal friendship, cure wounds, entangle, fog cloud \n\n2nd level (3 slots): barkskin, gust of wind, moonbeam\n\n3rd level (3 slots): conjure animals, dispel magic, wind wall',
          title: 'Spellcasting',
        },
        {
          body: 'As a bonus action, the druid calls forth a nature spirit. The spirit appears at a point the druid can see within 60 feet. The spirit creates a 30-foot-radius aura. The spirit is neither an object nor a creature, but is a spectral beast. As a bonus action, the druid can move the spirit to another location within 60 feet. The spirit lasts for 1 minute.\n\nBear Spirit. The druid and allies within the aura gain 9 temporary hit points and have advantage on Strength checks and saving throws.\n\nHawk Spirit. The druid can use their reaction to grant advantage to an ally’s attack roll against a target in the aura. The druid and allies within the aura have advantage on Wisdom (Perception) checks.\n\nUnicorn Spirit. If a spell that requires a spell slot heals the druid or allies in the aura, each creature of the druid’s choice also gains 4 hit points.',
          title: 'Spirit Totem (Recharges after a Short or Long Rest.)',
        },
      ],
      title: 'Abilities',
    },
  ],
};
