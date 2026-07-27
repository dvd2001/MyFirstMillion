import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { GamePage } from './game-page';
import { Field } from '../../models/Field';

describe('GamePage', () => {
  let component: GamePage;
  let fixture: ComponentFixture<GamePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamePage],
    }).compileComponents();

    fixture = TestBed.createComponent(GamePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate the gold modal prices after the modal is rendered', fakeAsync(() => {
    const modal1 = document.createElement('h3');
    const modal2 = document.createElement('h3');
    const modal3 = document.createElement('h3');
    const modal4 = document.createElement('h3');
    const modal5 = document.createElement('h3');
    const modal6 = document.createElement('h3');

    const originalQuerySelector = document.querySelector.bind(document);
    Object.defineProperty(document, 'querySelector', {
      configurable: true,
      writable: true,
      value: ((selector: string) => {
        if (selector === '#modalGoldPrice1') return modal1;
        if (selector === '#modalGoldPrice2') return modal2;
        if (selector === '#modalGoldPrice3') return modal3;
        if (selector === '#modalGoldPrice4') return modal4;
        if (selector === '#modalGoldPrice5') return modal5;
        if (selector === '#modalGoldPrice6') return modal6;
        if (selector === 'body') return document.body;
        return originalQuerySelector(selector);
      }) as typeof document.querySelector,
    });

    (component as unknown as { fields: Field[] }).fields = [
      { gold: 1 } as Field,
      { gold: 2 } as Field,
      { gold: 3 } as Field,
      { gold: 4 } as Field,
      { gold: 5 } as Field,
      { gold: 6 } as Field,
      { gold: 7 } as Field,
    ];
    (component as unknown as { field: number }).field = 0;

    component.goldInfo();
    tick();

    expect(modal1.innerText).toContain('$ 2,000');
    expect(modal2.innerText).toContain('$ 3,000');
    expect(modal3.innerText).toContain('$ 4,000');
    expect(modal4.innerText).toContain('$ 5,000');
    expect(modal5.innerText).toContain('$ 6,000');
    expect(modal6.innerText).toContain('$ 7,000');
  }));
});
