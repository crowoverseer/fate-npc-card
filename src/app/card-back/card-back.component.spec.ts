import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBackComponent } from './card-back.component';

describe('CardComponent', () => {
  let component: CardBackComponent;
  let fixture: ComponentFixture<CardBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardBackComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
