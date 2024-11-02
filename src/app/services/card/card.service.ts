import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Stunt {
  name: string;
  description: string;
}

export interface Skill {
  name: string;
  value: number;
}

export interface Stress {
  universal: string;
  physical: string;
  mental: string;
}

export interface FontSizes {
  name: number;
  stunt: number;
}

interface Serialized {
  name: string;
  fontSizes: FontSizes;
  aspect: string;
  stunts: Stunt[];
  skills: Skill[];
  stress: Stress;
  PP: number;
}

const DICE_ID = '6665f27135f26d265d89272f';

const addDot = (text: string) =>
  text.charAt(text.length - 1) === '.'
    ? text.slice(0, text.length)
    : text && text.concat('.');

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private nameSubject = new BehaviorSubject<string>('');
  private fontSizesSubject = new BehaviorSubject<FontSizes>({
    name: 50,
    stunt: 20,
  });
  private aspectSubject = new BehaviorSubject<string>('');
  private stuntsSubject = new BehaviorSubject<Stunt[]>(
    Array.from({ length: 5 }, () => ({ name: '', description: '' }))
  );
  private skillSubject = new BehaviorSubject<Skill[]>(
    Array.from({ length: 6 }, () => ({ name: '', value: 0 }))
  );
  private stressSubject = new BehaviorSubject<Stress>({
    universal: '1 2',
    physical: '',
    mental: '',
  });
  private PPSubject = new BehaviorSubject<number>(3);
  private alchemyJSON: any = {};

  name = this.nameSubject.asObservable();
  fontSizes = this.fontSizesSubject.asObservable();
  aspect = this.aspectSubject.asObservable();
  stunts = this.stuntsSubject.asObservable();
  skills = this.skillSubject.asObservable();
  stress = this.stressSubject.asObservable();
  PP = this.PPSubject.asObservable();

  constructor() {
    const data: Serialized = JSON.parse(
      window.localStorage.getItem('json') || '{}'
    );
    if (data?.name) {
      this.loadFromData(data);
    }
  }

  setName(message: string) {
    this.nameSubject.next(message);
  }

  setFontSize(type: keyof FontSizes, value: number) {
    if (!value) return;
    const currentFontSizes = this.fontSizesSubject.value;
    currentFontSizes[type] = value;
    this.fontSizesSubject.next(currentFontSizes);
  }

  setAspect(value: string) {
    this.aspectSubject.next(value);
  }

  setStuntDescr(idx: number, value: string) {
    const currentStunts = this.stuntsSubject.value;
    currentStunts[idx].description = addDot(value);
    this.stuntsSubject.next(currentStunts);
  }

  setStuntName(idx: number, value: string) {
    const currentStunts = this.stuntsSubject.value;
    currentStunts[idx].name = addDot(value);
    this.stuntsSubject.next(currentStunts);
  }

  createEmptyStunt() {
    const currentStunts = this.stuntsSubject.value;
    for (let idx = 0; idx < 5; idx++) {
      if (
        !currentStunts[idx] ||
        (currentStunts[idx].name.trim().length < 2 &&
          currentStunts[idx].description.trim().length < 2)
      ) {
        currentStunts[idx] = {
          name: 'Название.',
          description: 'Описание.',
        };
        break;
      }
    }
    this.stuntsSubject.next(currentStunts);
  }

  setSkillName(idx: number, value: string) {
    const currentSkills = this.skillSubject.value;
    currentSkills[idx].name = value.trim();
    this.skillSubject.next(currentSkills);
  }

  setSkillValue(idx: number, value: number) {
    const currentSkills = this.skillSubject.value;
    currentSkills[idx].value = Number((value as unknown as string).trim());
    this.skillSubject.next(currentSkills);
  }

  setStressValue(type: 'universal' | 'physical' | 'mental', value: string) {
    const currentStress = this.stressSubject.value;
    currentStress[type] = value.trim();
    this.stressSubject.next(currentStress);
  }

  setPP(value: number) {
    this.PPSubject.next(value);
  }

  save() {
    const json = {
      name: this.nameSubject.value,
      fontSizes: this.fontSizesSubject.value,
      aspect: this.aspectSubject.value,
      stunts: this.stuntsSubject.value,
      stress: this.stressSubject.value,
      skills: this.skillSubject.value,
      PP: this.PPSubject.value,
    };

    window.localStorage.setItem('json', JSON.stringify(json));

    var a = document.createElement('a');
    var file = new Blob([JSON.stringify(json)], { type: 'text/json' });
    a.href = URL.createObjectURL(file);
    a.download = `${json.name}.json`;
    a.click();
  }

  alchemy() {
    this.alchemyJSON = {
      actions: [],
      isBackstoryPublic: true,
      isNPC: true,
      name: this.nameSubject.value,
      description: '',
      systemKey: 'custom',
      skills: [],
      trackers: [
        {
          category: 'experience',
          color: 'Yellow',
          max: 8,
          name: 'Жетоны',
          type: 'Bar',
          value: 0,
        },
      ],
    };
    this.addAlchemyAspects();
    this.addAlchemyActions();
    this.addAlchemyStress();
    this.addAlchemyPP();

    var a = document.createElement('a');
    var file = new Blob([JSON.stringify(this.alchemyJSON)], {
      type: 'text/json',
    });
    a.href = URL.createObjectURL(file);
    a.download = `${this.nameSubject.value}.alchemy.json`;
    a.click();
  }

  private addAlchemyAspects() {
    this.alchemyJSON.description = this.aspectSubject.value
      .split('\n')
      .map((aspect) => `### ${aspect}\n\n`)
      .join('');
  }

  private addAlchemyActions() {
    let actionIdx = 1;
    this.skillSubject.value.forEach((skill) => {
      this.alchemyJSON.actions.push({
        name: `${skill.name} ${skill.value}`,
        sortOrder: actionIdx++,
        steps: [
          {
            dicePool: {
              __typename: 'ActionStepDicePool',
            },
            segmentedDicePool: [
              {
                __typename: 'ActionStepDicePool',
                bonus: 0,
                canReroll: false,
                customDiceId: DICE_ID,
                explode: false,
                numberOfDice: 0,
                numberOfFaces: 3,
                skill: skill.name,
                successValues: [2, 3],
                useAbilityAndSkill: true,
              },
            ],
            type: 'dice-pool',
          },
        ],
      });
    });
    // stunts
    this.stuntsSubject.value
      .filter((stunt) => stunt.name.length)
      .map((stunt) => ({
        description: stunt.description,
        name: stunt.name,
        sortOrder: actionIdx++,
        steps: [
          {
            journalMessage: `### ${stunt.name}\n${stunt.description}`,
            journalMessageIsMarkdown: true,
            type: 'message',
          },
        ],
      }))
      .forEach((action) => this.alchemyJSON.actions.push(action));
  }

  private addAlchemyPP() {
    this.alchemyJSON.trackers.push({
      category: 'health',
      color: 'Blue',
      max: Number(this.PPSubject.value),
      name: 'Пункты силы',
      type: 'Bar',
      value: Number(this.PPSubject.value),
    });
  }

  private addAlchemyStress() {
    const addStress = (type: string, val: string) => {
      if (!val) return;
      this.alchemyJSON.trackers.push({
        color: 'Green',
        max: 1,
        name: `Стресс ${type} ${val}`,
        type: 'Pip',
        value: 0,
      });
    };
    (this.stressSubject.value.universal || '')
      ?.split(' ')
      .forEach((stressVal) => addStress('У', stressVal));
    (this.stressSubject.value.physical || '')
      ?.split(' ')
      .forEach((stressVal) => addStress('Ф', stressVal));
    (this.stressSubject.value.mental || '')
      ?.split(' ')
      .forEach((stressVal) => addStress('М', stressVal));
  }

  loadFromData({
    name,
    fontSizes = this.fontSizesSubject.value,
    aspect,
    stress,
    skills,
    stunts,
    PP,
  }: Serialized) {
    this.nameSubject.next(name);
    this.fontSizesSubject.next(fontSizes);
    this.aspectSubject.next(aspect);
    this.stressSubject.next(stress);
    this.skillSubject.next(skills);
    this.stuntsSubject.next(
      stunts.map((stunt) => ({
        name: addDot(stunt.name),
        description: addDot(stunt.description),
      }))
    );
    this.PPSubject.next(PP);
  }

  clear() {
    if (window.confirm('Или потеряешь!')) {
      this.loadFromData({
        name: '',
        fontSizes: {
          name: 50,
          stunt: 20,
        },
        aspect: '',
        stunts: Array.from({ length: 5 }, () => ({
          name: '',
          description: '',
        })),
        skills: Array.from({ length: 6 }, () => ({ name: '', value: 0 })),
        stress: {
          universal: '1 2',
          physical: '',
          mental: '',
        },
        PP: 3,
      });
    }
  }
}
