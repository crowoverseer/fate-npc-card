import { Injectable, signal } from '@angular/core';

interface AlchemyCharacter {
  imageUri: string;
  name: string;
  challengeRating: string;
}

interface AlchemyData {
  characterById: AlchemyCharacter;
}

interface AlchemyObject {
  data: AlchemyData;
}

@Injectable({
  providedIn: 'root',
})
export class CardService {
  character = signal<AlchemyCharacter>({
    imageUri:
      'https://cdn.alchemyrpg.com/users/6003d6b6708dcf0008912a72/characters/08086a8d-aad1-4e86-849a-2f9eeb9ec31d/l1irviki.jpg',
    name: 'Gallus Druid',
    challengeRating: '4',
  });

  loadFromAlchemyJSON(json: AlchemyObject) {
    const {
      data: { characterById: character },
    } = json;

    this.character.set(character);
  }
}
