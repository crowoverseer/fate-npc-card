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

interface Serialized {
  name: string;
  aspects: string[];
  stunts: Stunt[];
  skills: Skill[];
  stress: Stress;
  PP: number;
}

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private nameSubject = new BehaviorSubject<string>('');
  private aspectsSubject = new BehaviorSubject<string[]>(
    new Array<string>(5).fill('')
  );
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

  name = this.nameSubject.asObservable();
  aspects = this.aspectsSubject.asObservable();
  stunts = this.stuntsSubject.asObservable();
  skills = this.skillSubject.asObservable();
  stress = this.stressSubject.asObservable();
  PP = this.PPSubject.asObservable();

  constructor() {
    const data: Serialized = JSON.parse(
      window.localStorage.getItem('json') || ''
    );
    if (data) {
      this.loadFromData(data);
    }
  }

  setName(message: string) {
    this.nameSubject.next(message);
  }

  setAspect(idx: number, value: string) {
    const currentAspects = this.aspectsSubject.value;
    currentAspects[idx] = value;
    this.aspectsSubject.next(currentAspects);
  }

  setStuntDescr(idx: number, value: string) {
    const currentStunts = this.stuntsSubject.value;
    currentStunts[idx].description = value;
    this.stuntsSubject.next(currentStunts);
  }

  setStuntName(idx: number, value: string) {
    const currentStunts = this.stuntsSubject.value;
    currentStunts[idx].name = value;
    console.log(idx, currentStunts);
    this.stuntsSubject.next(currentStunts);
  }

  setSkillName(idx: number, value: string) {
    const currentSkills = this.skillSubject.value;
    currentSkills[idx].name = value;
    this.skillSubject.next(currentSkills);
  }

  setSkillValue(idx: number, value: number) {
    const currentSkills = this.skillSubject.value;
    currentSkills[idx].value = value;
    this.skillSubject.next(currentSkills);
  }

  setStressValue(type: 'universal' | 'physical' | 'mental', value: string) {
    const currentStress = this.stressSubject.value;
    currentStress[type] = value;
    this.stressSubject.next(currentStress);
  }

  setPP(value: number) {
    this.PPSubject.next(value);
  }

  save() {
    const json = {
      name: this.nameSubject.value,
      aspects: this.aspectsSubject.value,
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

  loadFromData({ name, aspects, stress, skills, stunts, PP }: Serialized) {
    this.nameSubject.next(name);
    this.aspectsSubject.next(aspects);
    this.stressSubject.next(stress);
    this.skillSubject.next(skills);
    this.stuntsSubject.next(stunts);
    this.PPSubject.next(PP);
  }

  clear() {
    if (window.confirm('Или потеряешь!')) {
      this.loadFromData({
        name: '',
        aspects: new Array<string>(5).fill(''),
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
