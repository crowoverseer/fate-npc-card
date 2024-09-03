import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from './card/card.component';
import { CardformComponent } from './cardform/cardform.component';

@Component({
  selector: 'root',
  standalone: true,
  imports: [RouterOutlet, CardComponent, CardformComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  title = 'fate-npc-card';
}
