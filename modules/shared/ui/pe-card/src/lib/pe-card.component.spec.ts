import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeCardComponent } from './pe-card.component';

describe('PeCardComponent', () => {
  let component: PeCardComponent;
  let fixture: ComponentFixture<PeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
