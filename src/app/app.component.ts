import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardFrontComponent } from './card-front/card-front.component';
import { CardformComponent } from './cardform/cardform.component';

@Component({
  selector: 'root',
  standalone: true,
  imports: [CardFrontComponent, CardformComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  title = 'fate-npc-card';
}
