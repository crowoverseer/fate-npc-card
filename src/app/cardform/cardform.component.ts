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
  name: string = 'name';

  public cardService = inject(CardService);

  render() {
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
