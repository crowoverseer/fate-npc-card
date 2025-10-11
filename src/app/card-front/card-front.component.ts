import { Component, computed, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxRerenderModule } from 'ngx-rerender';

import { DragDirective, FileHandle } from './dragDrop.directive';

import {
  AbilityScoreAbr,
  AlchemyCharacter,
  AlchemyObject,
  CardService,
} from '../services/card/card.service';

@Component({
  selector: 'card-front',
  imports: [CommonModule, DragDirective, NgxRerenderModule],
  templateUrl: './card-front.component.html',
  styleUrl: './card-front.component.sass',
})
export class CardFrontComponent {
  cardService = inject(CardService);
  AbilityScoreAbr = Object.values(AbilityScoreAbr);

  subtitle = computed(() => {
    let subtitle = '';
    subtitle += ` ${this.cardService.character().size || ''}`;
    subtitle += ` ${this.cardService.character().type || ''}`;
    const tags = this.cardService.character().typeTags?.join(', ');
    subtitle += tags ? ` (${tags})` : '';
    subtitle += `${
      this.cardService.character().alignment
        ? '/'.concat(this.cardService.character().alignment ?? '')
        : ''
    }`;
    return subtitle.trim();
  });

  speed = computed(() => {
    const modes = this.cardService.character().movementModes?.length
      ? this.cardService
          .character()
          .movementModes?.map((mode) => {
            if (
              mode.mode.toLocaleLowerCase() === 'walking' ||
              mode.mode.toLocaleLowerCase() === 'walk'
            ) {
              return mode.distance;
            }
            return `${mode.mode} ${mode.distance}`;
          })
          .join(', ')
      : '';
    return modes || this.cardService.character().speed;
  });

  hitDice = computed(() =>
    this.cardService.character().hitDice
      ? ' ('.concat(this.cardService.character().hitDice?.concat(')') ?? '')
      : ''
  );

  senses = computed(() => {
    return (
      this.cardService
        .character()
        .skills.filter(({ name }) =>
          ['Insight', 'Investigation', 'Perception'].includes(name)
        )
        .map(
          ({ name, abilityName, proficient, doubleProficiency, bonus }) =>
            `${name} ${
              10 +
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
        .join(', ') || '--'
    );
  });

  savingThrows = computed(() => {
    const savingProfs = this.cardService
      .character()
      .proficiencies.filter((prof) => prof.type === 'save')
      .map(
        ({ name }) =>
          `${name} +${
            Number(
              this.cardService.getAbilityBonusByScoreString(
                name.toLocaleLowerCase().substring(0, 3) as AbilityScoreAbr
              )
            ) + this.cardService.character().proficiencyBonus
          }`
      )
      .join(', ');

    return savingProfs || '--';
  });

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

  @HostListener('window:keydown', ['$event'])
  async handleKeyboardEvent(event: KeyboardEvent) {
    if ((event.metaKey || event.ctrlKey) && event.key === 'v') {
      try {
        if (!navigator.clipboard || !navigator.clipboard.readText) {
          throw new Error('Clipboard API is not supported.');
        }

        const clipboardContent = await navigator.clipboard.readText();

        if (!clipboardContent.trim()) {
          console.error("Can't get clipboard value or it is empty.");
          return;
        }

        let newCharacter: AlchemyObject;
        try {
          newCharacter = JSON.parse(clipboardContent);
        } catch (parseError) {
          console.error('JSON Parse Error:', parseError);
          return;
        }

        this.cardService.loadFromAlchemyJSON(newCharacter);
      } catch (err: any) {
        console.error('Clipboard Access Error:', err);
      }
    }
  }
}
