import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeHomeListComponent } from './pe-home-list.component';

describe('PeHomeListComponent', () => {
  let component: PeHomeListComponent;
  let fixture: ComponentFixture<PeHomeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeHomeListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PeHomeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
