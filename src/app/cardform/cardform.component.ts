import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { toPng } from 'html-to-image';

import { CardService } from '../services/card/card.service';

@Component({
  selector: 'cardform',
  imports: [CommonModule, FormsModule],
  templateUrl: './cardform.component.html',
  styleUrl: './cardform.component.sass',
})
export class CardformComponent {
  public cardService = inject(CardService);

  renderElement = (elementId: string, prefix: string = '') => {
    var card = document.getElementById(elementId);
    if (!card) return;
    toPng(card)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `${this.cardService.character().name}${prefix}.png`;
        link.click();
        setTimeout(() => {
          document.removeChild(link);
        }, 200);
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
      });
  };

  render = async () => {
    this.renderElement('card-render-front', '-front');
    await new Promise((res) =>
      setTimeout(() => {
        res(null);
      }, 500)
    );
    this.renderElement('card-render-back', '-back');
  };
}
