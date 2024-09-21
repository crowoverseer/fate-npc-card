import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import html2canvas from 'html2canvas';

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
  aspects!: string[];
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

  render() {
    console.log('Rendering');
    html2canvas(document.getElementById('card-render')!).then((canvas) => {
      const removeObj = document.body.appendChild(canvas);
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `${this.name}.png`;
      link.click();
      setTimeout(() => {
        document.body.removeChild(removeObj);
        document.removeChild(link);
      }, 200);
    });
  }
}
