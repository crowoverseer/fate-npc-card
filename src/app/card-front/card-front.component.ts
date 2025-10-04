import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxRerenderModule } from 'ngx-rerender';

import { DragDirective, FileHandle } from './dragDrop.directive';

import { CardService } from '../services/card/card.service';

@Component({
  selector: 'card-front',
  standalone: true,
  imports: [CommonModule, DragDirective, NgxRerenderModule],
  templateUrl: './card-front.component.html',
  styleUrl: './card-front.component.sass',
})
export class CardFrontComponent {
  cardService = inject(CardService);

  subtitle = computed(() => {
    let subtitle = '';
    subtitle += ` ${this.cardService.character().size || ''}`;
    subtitle += ` ${this.cardService.character().type || ''}`;
    const tags = this.cardService.character().typeTags?.join(', ');
    subtitle += tags ? ` (${tags})` : '';
    subtitle += ` / ${this.cardService.character().alignment || ''}`;
    return subtitle.trim();
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
}
