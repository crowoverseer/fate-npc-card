import { Component } from '@angular/core';
import { CardFrontComponent } from './card-front/card-front.component';
import { CardformComponent } from './cardform/cardform.component';
import { CardBackComponent } from './card-back/card-back.component';

@Component({
  selector: 'root',
  standalone: true,
  imports: [CardFrontComponent, CardformComponent, CardBackComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  title = 'fate-npc-card';
}
