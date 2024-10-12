import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toPng } from 'html-to-image';

import {
  CardService,
  FontSizes,
  Skill,
  Stress,
  Stunt,
} from '../services/card/card.service';

@Component({
  selector: 'cardform',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cardform.component.html',
  styleUrl: './cardform.component.sass',
})
export class CardformComponent {
  name!: string;
  fontSizes!: FontSizes;
  stunts!: Stunt[];
  skills!: Skill[];
  stress!: Stress;
  PP!: number;

  constructor(public cardService: CardService) {
    this.cardService.name.subscribe((name) => {
      this.name = name;
    });
    this.cardService.fontSizes.subscribe((fontSizes) => {
      this.fontSizes = fontSizes;
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

  render() {
    console.log('Rendering');
    var card = document.getElementById('card-render');
    if (!card) return;
    toPng(card)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `${this.name}.png`;
        link.click();
        setTimeout(() => {
          document.removeChild(link);
        }, 200);
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
      });
  }
}
