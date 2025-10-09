import { Component, computed, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxRerenderModule } from 'ngx-rerender';
import truncate from 'lodash-es/truncate';

import { DragDirective, FileHandle } from './dragDrop.directive';

import { AbilityScoreAbr, CardService } from '../services/card/card.service';

@Component({
  selector: 'card-back',
  imports: [CommonModule, DragDirective, NgxRerenderModule],
  templateUrl: './card-back.component.html',
  styleUrl: './card-back.component.sass',
})
export class CardBackComponent {
  cardService = inject(CardService);
  AbilityScoreAbr = Object.values(AbilityScoreAbr);

  skillString = computed(() =>
    this.cardService
      .character()
      .skills.filter((skill) => skill.proficient || skill.doubleProficiency)
      .map(
        ({ name, proficient, doubleProficiency, abilityName, bonus }) =>
          `${name} +${
            Number(
              this.cardService.getAbilityBonusByScoreString(
                abilityName as AbilityScoreAbr
              )
            ) +
            this.cardService.character().proficiencyBonus *
              (proficient || doubleProficiency
                ? doubleProficiency
                  ? 2
                  : 1
                : 0) +
            (bonus ?? 0)
          }`
      )
      .join(', ')
  );

  xp = computed(
    () =>
      this.cardService
        .character()
        .trackers.find((tracker) => tracker.category === 'experience')?.value ??
      '- -'
  );

  languages = computed(
    () =>
      truncate(
        this.cardService
          .character()
          .proficiencies.filter((prof) => prof.type === 'language')
          .map(({ name }) => `${name}`)
          .join(', '),
        { length: 62 }
      ) || '--'
  );

  abilities = computed(
    () =>
      this.cardService
        .character()
        .textBlocks.find((tb) => tb.title === 'Abilities')?.textBlocks ?? []
  );

  immunities = computed(() =>
    [
      ...this.cardService.character().conditionImmunities,
      ...this.cardService
        .character()
        .damageImmunities.map(
          ({ damageType, condition }) =>
            `${damageType}${condition ? ' '.concat(condition) : ''}`
        ),
    ].join(', ')
  );

  resistances = computed(() =>
    this.cardService
      .character()
      .damageResistances.map(
        ({ damageType, condition }) =>
          `${damageType}${condition ? ' '.concat(condition) : ''}`
      )
      .join(', ')
  );

  vulnerabilities = computed(() =>
    [...this.cardService.character().damageVulnerabilities].join(', ')
  );

  filesDropped(files: any): void {
    if (files.length > 0) {
      const file = files[0] as FileHandle;
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const json = JSON.parse(event.target.result);
        this.cardService.loadFromAlchemyJSON(json);
      };
      reader.readAsText(file.file);
    }
  }
}
