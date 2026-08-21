import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VictoryPage } from './victory-page';

describe('VictoryPage', () => {
  let component: VictoryPage;
  let fixture: ComponentFixture<VictoryPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VictoryPage],
    }).compileComponents();

    fixture = TestBed.createComponent(VictoryPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
