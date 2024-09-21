import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDirective, FileHandle } from './dragDrop.directive';

import {
  CardService,
  FontSizes,
  Skill,
  Stress,
  Stunt,
} from '../services/card/card.service';

@Component({
  selector: 'card',
  standalone: true,
  imports: [CommonModule, DragDirective],
  templateUrl: './card.component.html',
  styleUrl: './card.component.sass',
})
export class CardComponent {
  name!: string;
  fontSizes!: FontSizes;
  aspects!: string[];
  stunts!: Stunt[];
  skills!: Skill[];
  stress!: Stress;
  PP!: number;

  constructor(private cardService: CardService) {
    this.cardService.name.subscribe((name) => {
      this.name = name;
    });
    this.cardService.fontSizes.subscribe((fontSizes) => {
      this.fontSizes = fontSizes;
    });
    this.cardService.aspects.subscribe((aspects) => {
      this.aspects = aspects;
    });
    this.cardService.stunts.subscribe((stunts) => {
      this.stunts = stunts;
    });
    this.cardService.skills.subscribe((skills) => {
      this.skills = skills;
    });
    this.cardService.stress.subscribe((stress) => {
      this.stress = stress;
    });
    this.cardService.PP.subscribe((PP) => {
      this.PP = PP;
    });
  }

  filesDropped(files: any): void {
    if (files.length > 0) {
      const file = files[0] as FileHandle;
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const json = JSON.parse(event.target.result);
        this.cardService.loadFromData(json);
      };
      reader.readAsText(file.file);
    }
  }
}
